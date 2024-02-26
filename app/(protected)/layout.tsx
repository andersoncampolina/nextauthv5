import Navbar from '@/app/(protected)/_components/Navbar'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default function ProtectedLayout(props: ProtectedLayoutProps) {
    return (
        <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-600 to-black'>
            <Navbar />
            {props.children}
        </div>
    )
}
