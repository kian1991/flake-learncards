import { useTranslations } from 'next-intl';
import { H3 } from 'shadcn-typography';
import CreateStackForm from '../../../components/stack/stack-form';
import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/main';
import Main from '@/components/ui/main';

export default async function CreateStack() {
	const t = await getTranslations('CreateStack');
	const session = await auth();

	if (!session?.user?.id) throw new Error('Unauthorized');

	return (
		<Main className='grid place-items-center gap-3 pt-6 sm:pt-24'>
			<H3>{t('title')}</H3>
			<CreateStackForm userId={session.user.id} />
		</Main>
	);
}
