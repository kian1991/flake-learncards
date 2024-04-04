import { db } from './primsa-client';
import { Prisma, LearnCard } from '@prisma/client';

// CRUD operations for stacks

const stackWithLeanrCards = Prisma.validator<Prisma.StackDefaultArgs>()({
	include: {
		learnCards: true,
	},
});

export type StackWithLearnCards = Prisma.StackGetPayload<typeof stackWithLeanrCards>;

export async function getStacksByUserId(userId: string) {
	try {
		const stacks = await db.stack.findMany({
			where: {
				UserStack: {
					some: {
						userId,
					},
				},
			},
			include: {
				learnCards: true,
			},
		});

		return stacks;
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function getStack(stackId: string) {
	try {
		return db.stack.findUnique({
			where: {
				id: stackId,
			},
			include: {
				learnCards: true,
			},
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function createStack(userId: string, name: string) {
	try {
		return db.stack.create({
			data: {
				name,
				UserStack: {
					create: {
						userId,
					},
				},
			},
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function createStackWithCards(
	userId: string,
	name: string,
	learnCards: LearnCard[]
) {
	try {
		return db.stack.create({
			data: {
				name,
				UserStack: {
					create: {
						userId,
					},
				},
				learnCards: {
					createMany: {
						data: learnCards,
					},
				},
			},
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return { error: error.message };
	}
}

export function deleteStack(stackId: string) {
	try {
		return db.stack.delete({
			where: { id: stackId },
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}

export function updateStack(stackId: string, name: string) {
	try {
		return db.stack.update({
			where: { id: stackId },
			data: { name },
		});
	} catch (error) {
		if (error instanceof Error) return { error: error.message };
	}
}
