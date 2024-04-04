import { progress } from 'framer-motion';
import { db } from './primsa-client';
import { createStackWithCards } from './stacks';

const userId = 'clujjclyh0000cxlmx7c6ynvw';

const stacks = [
	{
		name: 'JavaScript',
		cards: [
			{
				front: 'What is JavaScript?',
				back: 'JavaScript is a programming language that is used to make web pages interactive.',
				progress: 20,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is a variable?',
				back: 'A variable is a container for storing data values.',
				progress: 40,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is a function?',
				back: 'A function is a block of code that can be called by name. All functions in JavaScript are objects.',
				progress: 10,
				tags: ['programming', 'web'],
			},
		],
	},
	{
		name: 'React',
		cards: [
			{
				front: 'What is React?',
				back: 'React is a JavaScript library for building user interfaces.',
				progress: 30,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is JSX?',
				back: 'JSX is a syntax extension for JavaScript.',
				progress: 50,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is a component?',
				back: 'A component is a reusable piece of code that can be used to build user interfaces.',
				progress: 20,
				tags: ['programming', 'web'],
			},
		],
	},
	{
		name: 'TypeScript',
		cards: [
			{
				front: 'What is TypeScript?',
				back: 'TypeScript is a superset of JavaScript that adds static typing to the language.',
				progress: 60,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is a type?',
				back: 'A type is a way to describe the shape of an object.',
				progress: 70,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is an interface?',
				back: 'An interface is a way to describe the shape of an object.',
				progress: 80,
				tags: ['programming', 'web'],
			},
		],
	},
	{
		name: 'Next.js',
		cards: [
			{
				front: 'What is Next.js?',
				back: 'Next.js is a React framework for building server-side rendered applications.',
				progress: 90,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is server-side rendering?',
				back: 'Server-side rendering is the process of rendering web pages on the server.',
				progress: 100,
				tags: ['programming', 'web'],
			},
			{
				front: 'What is static site generation?',
				back: 'Static site generation is the process of generating static HTML files at build time.',
				progress: 100,
				tags: ['programming', 'web'],
			},
		],
	},
];

const createData = async (userId: string) => {
	for (const stack of stacks) {
		await db.stack.create({
			data: {
				name: stack.name,
				UserStack: {
					create: {
						userId,
					},
				},
				learnCards: {
					createMany: {
						data: stack.cards,
					},
				},
			},
		});
	}

	db.$disconnect();
};

createData(userId);
