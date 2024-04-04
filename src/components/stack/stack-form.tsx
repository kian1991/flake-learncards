'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef, useTransition } from 'react';
import { createStackAction } from '@/actions/stack';
import { usePathname } from 'next/navigation';
import { createStackFormSchema } from '@/schemas';
import AddButton from '../add-button';
import { InlineCode } from 'shadcn-typography';

export default function StackForm({ userId }: { userId: string }) {
	const [pending, startTransition] = useTransition();
	const pathname = usePathname();
	const ref = useRef<HTMLSpanElement>(null);

	const form = useForm<z.infer<typeof createStackFormSchema>>({
		resolver: zodResolver(createStackFormSchema),
		defaultValues: {
			name: '',
		},
	});

	function onSubmit(values: z.infer<typeof createStackFormSchema>) {
		startTransition(() => {
			createStackAction(userId, values.name, pathname);
		});
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full flex flex-col justify-stretch items-center space-y-8'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<Input
										placeholder='Stackname'
										{...field}
										disabled={pending}
										className=''
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<AddButton disabled={pending} />
				</form>
			</Form>
		</div>
	);
}
