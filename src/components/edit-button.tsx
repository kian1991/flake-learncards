'use client';

import { Button } from '@/components/ui/button';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

type EditButtonProps = {
	callbackUrl: string;
} & React.ComponentProps<typeof Button>;

export default function EditButton({ callbackUrl, ...rest }: EditButtonProps) {
	const locale = useLocale();
	const { push } = useRouter();
	return (
		<Button
			variant={'ghost'}
			size={'icon'}
			onClick={(e) => {
				e.stopPropagation();
				push(`/${locale}/${callbackUrl}`);
			}}
			{...rest}>
			<IconPencil size={22} />
		</Button>
	);
}
