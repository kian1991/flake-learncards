'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

type EditButtonProps = {
	cardId: string;
} & React.ComponentProps<typeof Button>;

export default function DeleteButton({ cardId, ...rest }: EditButtonProps) {
	const locale = useLocale();
	const { push } = useRouter();
	return (
		<Button
			{...rest}
			variant={'ghost'}
			size={'icon'}
			onClick={() => {
				push(`/${locale}/edit/card/${cardId}`);
			}}>
			<IconTrash size={24} />
		</Button>
	);
}
