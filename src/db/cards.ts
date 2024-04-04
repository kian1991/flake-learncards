import { db } from './primsa-client';
import { LearnCard } from '@prisma/client';
import { Prisma } from '@prisma/client';

// CRUD operations for cards

export function getCardsByStackId(stackId: string) {
	try {
		return db.learnCard.findMany({
			where: {
				stackId,
			},
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function getCardById(cardId: string) {
	try {
		return db.learnCard.findUnique({
			where: {
				id: cardId,
			},
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function createCard(card: Prisma.LearnCardCreateInput) {
	try {
		return db.learnCard.create({
			data: card,
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function updateCard(card: Partial<LearnCard>) {
	try {
		return db.learnCard.update({
			where: { id: card.id },
			data: card,
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function deleteCard(cardId: string) {
	try {
		return db.learnCard.delete({
			where: { id: cardId },
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}
