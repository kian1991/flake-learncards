import { auth } from '@/auth';
import { getStacksByUserId } from '@/db/stacks';
import { getTranslations } from 'next-intl/server';
import { H1, Muted } from 'shadcn-typography';
import Stack from '../../../components/stack/stack';
import { notFound } from 'next/navigation';
import Main from '@/components/ui/main';

export default async function Learn() {
	const t = await getTranslations('Learn');
	const session = await auth();

	if (!session) return { redirect: '/' };
	if (!session.user?.id) return { redirect: '/' };

	const stacks = await getStacksByUserId(session.user.id);
	console.log(stacks);

	if (!stacks || 'error' in stacks) notFound();

	return (
		<Main className='flex flex-col mt-7 gap-12'>
			<div className=''>
				<H1>{t('title')}</H1>
				<Muted>{t('selectStack')}</Muted>
			</div>
			<div className='flex gap-6 max-w-4xl mx-auto flex-wrap'>
				{stacks.map((stack) => (
					<Stack key={stack.id} stack={stack} />
				))}
			</div>
		</Main>
	);
}
