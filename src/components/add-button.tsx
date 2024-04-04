'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

type AddButtonProps = React.ComponentProps<typeof Button> & {
	callbackUrl?: string;
};

export default function AddButton({ callbackUrl, ...rest }: AddButtonProps) {
	const locale = useLocale();
	const { push } = useRouter();
	return (
		<Button
			variant={'outline'}
			type={callbackUrl ? 'button' : 'submit'}
			onClick={() => callbackUrl && push(`/${locale}/${callbackUrl}`)}
			{...rest}
			className={cn('md:mx-auto', rest.className)}>
			<IconPlus size={24} />
		</Button>
	);
}
