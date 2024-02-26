import { logout } from '@/actions/logout'

interface LogoutButtonProps {
    children: React.ReactNode
}

export default function LogoutButton(props: LogoutButtonProps) {

    const onClick = () => {
        logout()
    }

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {props.children}
        </span>
    )
}
