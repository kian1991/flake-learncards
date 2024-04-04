'use client';
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
import CardForm from './card-form';

export default function CardCreateForm({ stackId }: { stackId: string }) {
	const [isPending, startTransition] = useTransition();
	const [tags, setTags] = useState<string[]>([]);
	const router = useRouter();

	function onSubmit(values: z.infer<typeof createCardFormSchema>) {
		startTransition(() => {
			console.log('values', values);
			createCardAction({
				...values,
				Stack: { connect: { id: stackId } },
			}).then((result) => {
				if (result.error) toast.error(result.error);
				if (result.data) {
					toast.success('Card created successfully');
				}
			});
		});
	}

	return <CardForm onSubmit={onSubmit} isPending={isPending} resetOnSubmit />;
}
