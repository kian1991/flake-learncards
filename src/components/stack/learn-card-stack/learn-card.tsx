import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { animate, useAnimate } from 'framer-motion';
import { Ban, PartyPopper } from 'lucide-react';
import { type LearnCard } from '@prisma/client';
import { Progress } from '@/components/ui/progress';
import { Small } from 'shadcn-typography';
import { cn } from '@/lib/utils';

type CardProps = {
	card: LearnCard;
	onCorrect: (id: string) => void;
	onIncorrect: (id: string) => void;
};

export default function LearnCard({ card, onCorrect, onIncorrect }: CardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);

	const onFlip = async () => {
		if (cardRef.current === null) return;
		const deg = isFlipped ? '0deg' : '180deg';
		await animate(
			cardRef.current,
			{ transform: `rotateX(${deg})` },
			{ duration: 0.5, ease: 'circInOut', type: 'tween' }
		);
		setIsFlipped((prev) => !prev);
	};

	const onSolve = async (event: React.MouseEvent, cardId: string, isCorrect: boolean) => {
		event.stopPropagation();
		if (cardRef.current === null || !cardRef.current.children[1]) return;
		// reset card rotation
		animate(cardRef.current.children[1], { opacity: 0 }, { duration: 0.1 }).then(() => {
			isCorrect ? onCorrect(card.id) : onIncorrect(card.id);
		});

		await animate(cardRef.current, { transform: `rotateX(0deg)` });
		animate(cardRef.current.children[1], { opacity: 1 }, { duration: 0.1 });
		setIsFlipped(false);
	};

	return (
		<Card
			onClick={() => onFlip()}
			ref={cardRef}
			className='relative h-80 max-w-[50ch] cursor-pointer mx-auto'
			style={{ transformStyle: 'preserve-3d' }}>
			<div
				className='absolute w-full h-full top-0 left-0 '
				style={{
					backfaceVisibility: 'hidden',
				}}>
				<CardHeader>
					<CardDescription>
						{card.tags.map((tag) => (
							<span
								key={tag}
								className='font-mono bg-muted px-3 py-2 mr-3 rounded-lg font-bold'>
								#{tag}
							</span>
						))}
					</CardDescription>
				</CardHeader>
				<CardContent className='text-center mt-5 tracking-tighter font-bold text-xl'>
					{card.front}
				</CardContent>
				<div className='absolute bottom-0 w-full'>
					<Small
						className={cn(
							'font-mono m-1',
							card.progress === 100 ? 'text-green-600 dark:text-green-400' : ''
						)}>
						{card.progress}%
					</Small>
					<Progress value={card.progress} className='rounded-none rounded-b-sm' />
				</div>
			</div>
			<div
				className='absolute w-full h-full flex flex-col'
				style={{
					transform: 'rotateX(180deg)',
					backfaceVisibility: 'hidden',
				}}>
				<CardHeader>
					<CardDescription>
						{card.tags.map((tag) => (
							<span
								key={tag}
								className='font-mono bg-muted px-3 py-2 mr-3 rounded-lg font-bold'>
								#{tag}
							</span>
						))}
					</CardDescription>
				</CardHeader>
				<CardContent className='text-center mt-5 tracking-tighter font-bold text-xl'>
					{card.back}
				</CardContent>
				<CardFooter className='flex items-center justify-center gap-12 mt-auto'>
					<Button
						variant={'ghost'}
						size={'icon'}
						className='p-1 text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-500'
						onClick={(e) => {
							onSolve(e, card.id, true);
						}}>
						<PartyPopper size={48} />
					</Button>
					<Button
						variant={'ghost'}
						size={'icon'}
						className='p-1 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500'
						onClick={(e) => {
							onSolve(e, card.id, false);
						}}>
						<Ban size={48} />
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}
