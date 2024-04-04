'use client';
import { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { getCardByIdAction, updateCardAction } from '@/actions/card';
import { createCardFormSchema } from '@/schemas';
import { toast } from 'sonner';
import { type LearnCard } from '@prisma/client';
import { useRouter } from 'next/navigation';
import CardForm from './card-form';

export default function CardEditForm({ cardId }: { cardId: string }) {
	const [pending, startTransition] = useTransition();
	const [card, setCard] = useState<LearnCard | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (cardId) {
			startTransition(() => {
				getCardByIdAction(cardId).then((result) => {
					if (result.error) {
						toast.error(result.error);
						return;
					}
					if (result.data) {
						setCard(result.data);
					}
				});
			});
		}
	}, [cardId]);

	function onSubmit(values: z.infer<typeof createCardFormSchema>) {
		if (!card) return;
		startTransition(() => {
			const cardWithStackId = { ...values, stackId: card.stackId };
			updateCardAction(cardWithStackId).then((result) => {
				if (result.error) toast.error(result.error);
				if (result.data) toast.success('Card updated successfully');
			});
		});
	}

	if (!card) return null;

	return (
		<CardForm
			card={card}
			onSubmit={onSubmit}
			isPending={pending}
			onBackClick={() => {
				router.refresh();
				router.back();
			}}
		/>
	);
}
