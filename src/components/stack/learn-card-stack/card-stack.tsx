'use client';
import { useEffect, useState } from 'react';
import { LearnCard, Stack } from '@prisma/client';
import Card from './learn-card';
import { getStackByIdAction } from '@/actions/stack';
import { levelDownCard, levelUpCard } from '@/actions/card';
import { MAX_CARD_PERCENTAGE, MIN_CARD_PERCENTAGE } from '@/constants';
import DoneCard from './done-card';
import { Muted, P } from 'shadcn-typography';
import { Button } from '@/components/ui/button';
import NoCards from './no-cards';
import { StackWithLearnCards } from '@/db/stacks';
import CardSkeleton from './card-skeleton';

export default function CardStack({ stackId }: { stackId: string }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [cards, setCards] = useState<LearnCard[] | null>(null);
	const [stack, setStack] = useState<StackWithLearnCards | null>(null);

	// Fetch cards by stackId
	useEffect(() => {
		getStackByIdAction(stackId).then((result) => {
			if (result.error) {
				console.error(result.error);
				return;
			}
			if (result.data) {
				setStack(result.data);
				if (result.data.learnCards) setCards(result.data.learnCards);
			}
		});
	}, [stackId]);

	// Card Stack completed: no more cards to show
	if (!cards && stack && stack.learnCards.length)
		return (
			<DoneCard
				stackName={stack.name}
				onRedo={() => {
					setCards(stack.learnCards);
					setCurrentIndex(0);
				}}
			/>
		);

	// Cards are loading
	if (!cards) return <CardSkeleton />;

	function setCardProgress(progress: number, id: string) {
		// Set progress on local state
		setStack((prev) => {
			if (!prev) return null;
			const updatedStack = { ...prev };
			const updatedCards = updatedStack.learnCards.map((card) => {
				if (card.id === id) {
					return { ...card, progress: card.progress + 10 };
				}
				return card;
			});
			updatedStack.learnCards = updatedCards;
			return updatedStack;
		});
	}

	const currentCard = cards[currentIndex];

	const onCorrect = (id: string) => {
		if (!cards) return;
		const nextIndex = currentIndex + 1;
		if (nextIndex >= cards.length) {
			console.log('Stack completed');
			setCards(null);
			return;
		}
		console.log('Correct:', currentCard);
		if (currentCard.progress < MAX_CARD_PERCENTAGE) {
			setCardProgress(10, id);
			levelUpCard(currentCard.id, 10);
		}

		setCurrentIndex(nextIndex);
	};

	const onIncorrect = (id: string) => {
		if (!cards) return;

		const nextIndex = currentIndex + 1;
		if (nextIndex >= cards.length) {
			console.log('Stack completed');
			setCards(null);
			return;
		}
		if (currentCard.progress > MIN_CARD_PERCENTAGE) {
			setCardProgress(-10, id);
			levelDownCard(currentCard.id, 10);
		}
		setCurrentIndex(nextIndex);
	};

	return (
		<div className='px-2 mx-auto w-full'>
			{currentCard ? (
				<Card card={currentCard} onCorrect={onCorrect} onIncorrect={onIncorrect} />
			) : (
				<NoCards stack={stack!} />
			)}
		</div>
	);
}
