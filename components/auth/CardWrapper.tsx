import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Header from '@/components/auth/Header';
import Social from '@/components/auth/Social';
import BackButton from '@/components/auth/BackButton';

interface CardWrapperProps {
    children?: React.ReactNode;
    headerLabel: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    showSocial?: boolean;
}

export default function CardWrapper(props: CardWrapperProps) {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={props.headerLabel}/>
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
            {props.showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={props.backButtonLabel!}
                    href={props.backButtonHref!}
                />
            </CardFooter>
        </Card>
    )
}
