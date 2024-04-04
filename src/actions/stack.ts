'use server';

import { createStack, getStack } from '@/db/stacks';
import { redirect } from 'next/navigation';

export async function createStackAction(
	userId: string,
	name: string,
	currentPathname: string
) {
	const createdStack = await createStack(userId, name);

	if (!createdStack || 'error' in createdStack)
		return { error: 'An error occurred while creating the stack.' };

	redirect(`${currentPathname}/${createdStack.id}`);
}

export async function getStackByIdAction(stackId: string) {
	const stack = await getStack(stackId);

	if (!stack || 'error' in stack) return { error: 'Stack not found.' };

	return { data: stack };
}
