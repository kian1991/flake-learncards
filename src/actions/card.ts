'use server';
import { createCard, getCardById, updateCard } from '@/db/cards';
import { db } from '@/db/primsa-client';
import { Prisma, LearnCard } from '@prisma/client';

export async function createCardAction(card: Prisma.LearnCardCreateInput) {
	let createdCard;
	try {
		createdCard = await createCard(card);
		return { data: createdCard };
	} catch (error) {
		console.error(error);
		return { error: 'An error occurred while creating the card.' };
	}
}

export async function updateCardAction(card: Partial<LearnCard>) {
	let updatedCard;
	try {
		updatedCard = await updateCard(card);
		return { data: updatedCard };
	} catch (error) {
		console.error(error);
		return { error: 'An error occurred while updating the card.' };
	}
}

export async function getCardByIdAction(cardId: string) {
	const card = await getCardById(cardId);
	if (!card || 'error' in card) return { error: card?.error };
	return { data: card };
}

export async function levelUpCard(cardId: string, amount: number) {
	try {
		await db.learnCard.update({
			where: {
				id: cardId,
			},
			data: {
				progress: {
					increment: amount,
				},
			},
		});
	} catch (error) {
		console.error(error);
		return { error: 'Error leveling up' };
	}
}

export async function levelDownCard(cardId: string, amount: number) {
	try {
		await db.learnCard.update({
			where: {
				id: cardId,
			},
			data: {
				progress: {
					decrement: amount,
				},
			},
		});
	} catch (error) {
		console.error(error);
		return { error: 'Error leveling down' };
	}
}
