'use client';
import { Card } from '@/components/ui/card';
import { StackWithLearnCards } from '@/db/stacks';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { H2, H3, Muted, Small } from 'shadcn-typography';
import { Button } from '../ui/button';
import { IconPencil } from '@tabler/icons-react';
import EditButton from '../edit-button';
import { Separator } from '../ui/separator';

type Props = {
	stack: StackWithLearnCards;
};

export default function Stack({ stack }: Props) {
	const { push } = useRouter();
	const locale = useLocale();
	const t = useTranslations();

	const progress = useMemo(() => {
		if (!stack.learnCards.length) return 0;
		return (
			stack.learnCards.reduce((acc: number, card) => acc + card.progress, 0) /
			stack.learnCards.length
		);
	}, [stack.learnCards]);

	return (
		<Card
			onClick={() => {
				push(`/${locale}/learn/${stack.id}`);
			}}
			className='cursor-pointer flex-grow max-w-md hover:bg-foreground/5 text-end p-4 relative'>
			<div className='w-full flex items-center gap-5 mb-3 border-b-2'>
				<Small className='text-muted-foreground italic'>
					Progress: {Math.round(progress)}%
				</Small>
				<EditButton
					callbackUrl={`edit/stack/${stack.id}`}
					className='ml-auto text-muted-foreground'
				/>
			</div>
			<H3>{stack.name}</H3>
			<Muted>{stack.learnCards.length} cards</Muted>
		</Card>
	);
}
