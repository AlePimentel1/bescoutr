import { useTranslations } from 'next-intl';
import { CompleteProfileFormType } from './utils/constants';

interface Props {
    form: CompleteProfileFormType
}

export default function Welcome({ form }: Props) {
    const dict = useTranslations('CompleteProfile.Welcome')
    return (
        <div>
            <div className="flex flex-col">
                <h1 className="text-white">{dict('title')}</h1>
            </div>
        </div>
    )
}