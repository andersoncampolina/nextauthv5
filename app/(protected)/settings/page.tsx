'use client'

import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export default function SettingsPage() {

    const user = useCurrentUser()

    const onClick = () => {
        logout()    
    }

    return (
        <div className='bg-white p-10 rounded-xl'>
            <form>
                <button onClick={onClick} type='submit'>Sign Out</button>            
            </form>
        </div>

    )
}
