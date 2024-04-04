import CardStack from '@/components/stack/learn-card-stack/card-stack';
import { getStack, getStacksByUserId } from '@/db/stacks';
import { notFound } from 'next/navigation';

export default async function LearnStack({
	params: { stackId },
}: {
	params: { stackId: string };
}) {
	return (
		<div className='max-w-4xl w-full mx-auto px-4 grid place-items-center gap-3 pt-6 sm:pt-24'>
			{/* <H3>{t('title')}</H3> */}

			<CardStack stackId={stackId} />
		</div>
	);
}
