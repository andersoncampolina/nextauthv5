import CardWrapper from './CardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function ErrorCard() {
    return (
        <CardWrapper 
            headerLabel='Ops, algo deu errado!'
            backButtonHref='/auth/login'
            backButtonLabel='Voltar para o login'
            showSocial={false}
        >
            <div className='flex justify-center'>
                <ExclamationTriangleIcon color='red' />
            </div>
        </CardWrapper>
    )
}
