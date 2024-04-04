import { getTranslations } from 'next-intl/server';
import CreateCardForm from '../../../../components/card/card-create-form';
import { H3, H4, Large, Lead, Muted } from 'shadcn-typography';
import { notFound } from 'next/navigation';
import { getStack } from '@/db/stacks';

export default async function CreateCards({
	params: { stackId },
}: {
	params: { stackId: string };
}) {
	const t = await getTranslations('CreateCard');
	const stack = await getStack(stackId);

	if (!stack) notFound();

	return (
		<div className='max-w-4xl w-full mx-auto px-4 grid place-items-center gap-3 pt-6 sm:pt-24'>
			<H3>{t('title')}</H3>

			<Lead>{'name' in stack && stack.name}</Lead>

			<CreateCardForm stackId={stackId} />
		</div>
	);
}
