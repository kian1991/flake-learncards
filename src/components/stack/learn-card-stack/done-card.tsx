import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { IconRefresh, IconRefreshDot } from '@tabler/icons-react';
import { Redo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Small } from 'shadcn-typography';

export default function DoneCard({
	stackName,
	onRedo,
}: {
	stackName: string;
	onRedo: () => void;
}) {
	const t = useTranslations('DoneCard');
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Card>
			<CardHeader>
				<CardTitle>{stackName}</CardTitle>
				<CardDescription>{t('subtitle')}</CardDescription>
			</CardHeader>
			<CardContent className='flex-col flex gap2'>
				<p>{t('yay')}</p>
			</CardContent>
			<CardFooter>
				<Button variant={'default'} size={'icon'} onClick={() => onRedo()}>
					<IconRefresh />
				</Button>
			</CardFooter>
		</Card>
	);
}
