# Passo a passo para iniciar a aplicacao:
1 - npm install
2 - instalar o docker engine + docker compose na sua maquina
3 - docker compose up -d 
4 - npx prisma generate
5 - npx prisma db push
6 - Pegar API keys necessarias para rodar o app no resend (envio de emails) e cloudinary (data bucket), Github e Google (OAuth).
7 - Colocar api keys no .env de acordo com o .env.example
8 - npm run dev

# Docker Postgres

Execute o docker.app no macos, e crie um docker-compose.yml na raiz do projeto com a seguinte configuracao: 

version: "3.8"
services:
  db-dev:
    image: postgres:latest
    ports:
      - "5432:5432" # porta_servidor:porta_docker
    container_name: "db-dev"
    restart: always # reinicia o DB apos o servidor reiniciar
    volumes:
      - ./db-dev-backup:/var/lib/postgresql/data # cria backup do DB no servidor
    environment:
      POSTGRES_USER: pguser # Usuario do db: mudar no .env
      POSTGRES_PASSWORD: pgpassword
volumes:
  db-dev-backup: # nome da pasta que vai conter o backup do DB no servidor

Depois é so rodar o comando abaixo no terminal:

docker compose up -d 

(caso de este erro: "Cannot connect to the Docker daemon at unix:///Users/andersoncampolina/.docker/run/docker.sock. Is the docker daemon running?", execute o docker.app no mac e deixe rodando, depois é so dar docker compose up -d)

Por fim, no .env, assim que ficara a connection string: DATABASE_URL="postgresql://pguser:pgpassword@localhost:5432/db-dev?schema=public"


docker exec -it CONTAINER_NAME bash (opcional - serve para entrar dentro do container e executar comandos no terminal dele)

OBS: Caso precise reiniciar a imagem, deve-se fazer um novo PRISMA DB PUSH / GENERATE pois obviamente o banco vai comecar vazio: 
  - mudar a porta, e nome do db para nao ter conflito nos arquivos docker-compose.yml e .env e fazer um prisma db push + prisma generate depois

### CorsAnywhere personal proxy
https://web-production-5e1b.up.railway.app/

# Instrucoes para producao

pm2 start server.js
pm2 start "node server.js"
pm2 list
pm2 stop all / pm2 start all / pm2 restart all
pm2 delete 0
pm2 monit
pm2 show 0
pm2 start -i max server.js
pm2 startup
pm2 save

sudo systemctl restart nginx
* Caso de erro ao dar restart no nginx, use os comandos abaixo, onde PROCESS_ID eh o numero do processo que esta rodando na porta 80, geralmente, o Apache:
sudo netstat -tulpn | grep :80
sudo kill PROCESS_ID

--------------------------------------------------------------

INICIAR SERVIDOR EXPRESS:
npm run start:dev

# Dicas avancadas EXPRESS + PRISMA:
Caso de erro na rota, tente os seguintes passos:
    - Verifique se vc colocou 2 rotas com o mesmo endpoint recebendo dados: Se vc ja tem uma rota /user/:wallet, nao pode colocar outra /user/:id
    - Verifique se o parametro que vc esta recebendo foi convertido para o type correspondente no schema.prisma. um ID por exemplo deve ser convertido para inteiro.
    - Update e Delete parecem so funcionar com o ID padrao do prisma
    - Nao se esqueca de mudar o arquivo de rotas caso mude algum tipo (:id) ou o path da rota 

# Configurar Prisma e rotas de API:

0 - Comando para fazer backup do DB (Migration)
npx prisma migrate dev --name init
npx prisma migrate dev --name add_teste_table

1 - Criar uma pasta e arquivo schema padrao. Mudar a URL do banco dentro do schema padrao criado.
    npx prisma init

2 - Para dar um pull no banco de dados em cloud existente passado pela variavel de ambiente URL_DB:
    npx prisma db pull
    *DICA* Para enviar para o Atlas qualquer modificacao do schema, basta dar um "npx prisma db push" e depois um "npx prisma generate"

3 - Gerar client que sera importado no app para ler e escrever no banco:
    npx prisma generate

5 - importar client em um controller:
    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()

4 - Ao adicionar algum campo ou tabela no schema, fazer migrate com o comando abaixo:
    npx prisma migrate dev

# Instrucoes detalhadas para CRUD com Express.js + Mongoose + MongoDB

### Para adicionar uma nova entidade: 

1 - Criar um model no arquivo schema.prisma no diretorio Prisma.

2 - Criar um controller.

3 - Criar um route.

4 - Adicionar a nova rota em index.js dentro de routes

-----------x-----------x-----------x-----------x-----------

5 - Para adicionar referencia/relacionamento, fazer como no schema de livros:
autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},

6 - Fazer o populate do autor dentro dos controladores do livro:
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
                res.status(200).json(livros)
        })
    }

7 - Quando cadastrar um livro, passar o ID do autor na hora de cadastrar o mesmo que o banco ira fazer a referencia.

-----------x-----------x-----------x-----------x-----------

8 - Fazer consulta especifica:
    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora; // O endpoint tera 'editora' ao fazer a consulta no postman.
        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros);
        })
    }

9 - Adicionar na rota de livros a linha antes da consulta de livros por ID:
    .get('/livros/busca', LivroController.listarLivroPorEditora)

10 - Ao fazer a busca pelo postman, usar o seguinte endpoint:
    http://localhost:3000/livros/busca?editora=alura