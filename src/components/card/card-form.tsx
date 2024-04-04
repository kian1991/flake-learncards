import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { useEffect, useState, useTransition } from 'react';
import { createCardAction, getCardByIdAction } from '@/actions/card';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import TagInput from './tag-input';
import { createCardFormSchema } from '@/schemas';
import CardInput from './card-input';
import { toast } from 'sonner';
import AddButton from '../add-button';
import { type LearnCard } from '@prisma/client';
import Stack from '../stack/stack';
import { Button } from '../ui/button';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CardFormProps = {
	onSubmit: (values: z.infer<typeof createCardFormSchema>) => void;
	onBackClick?: () => void;
	isPending: boolean;
	resetOnSubmit?: boolean;
	card?: LearnCard;
};

export default function CardForm({
	onSubmit,
	onBackClick,
	card,
	isPending,
	resetOnSubmit,
}: CardFormProps) {
	const [tags, setTags] = useState<string[]>([]);

	const form = useForm<z.infer<typeof createCardFormSchema>>({
		resolver: zodResolver(createCardFormSchema),
		defaultValues: {
			id: card?.id ?? undefined,
			front: card?.front ?? '',
			back: card?.back ?? '',
			tags: card?.tags ?? [],
		},
	});

	useEffect(() => {
		// set the tags if the tag state changes
		form.setValue('tags', tags);
	}, [tags, form]);

	const handleSubmit = (values: z.infer<typeof createCardFormSchema>) => {
		onSubmit(values);
		if (resetOnSubmit) {
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='w-full grid space-y-8'>
				<Card className='max-w-[50ch] w-full mx-auto'>
					<CardHeader>
						<TagInput tags={tags} onSetTags={setTags} />
					</CardHeader>
					<CardContent className='text-center mt-5 tracking-tighter font-bold text-xl'>
						<FormField
							control={form.control}
							name='front'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<CardInput
											{...field}
											pending={isPending}
											currentLength={field.value.length}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
				<Card className='max-w-[50ch] w-full mx-auto'>
					<CardContent className='text-center mt-5 tracking-tighter font-bold text-xl'>
						<FormField
							control={form.control}
							name='back'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<CardInput
											{...field}
											pending={isPending}
											currentLength={field.value.length}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
				<div className='mx-auto flex gap-3'>
					{onBackClick && (
						<Button type='button' variant={'outline'} onClick={onBackClick}>
							<ArrowLeftCircle />
						</Button>
					)}
					<AddButton disabled={isPending} />
				</div>
			</form>
		</Form>
	);
}
