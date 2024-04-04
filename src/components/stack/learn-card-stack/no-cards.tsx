import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { H3, Lead, Muted, P } from 'shadcn-typography';
import { Stack } from '@prisma/client';

export default function NoCards({ stack }: { stack: Stack }) {
	const router = useRouter();
	const t = useTranslations('NoCards');
	return (
		<div className='mx-auto text-center w-full flex items-center flex-col gap-3'>
			<H3>{stack.name}</H3>
			<Lead>{t('title')}</Lead>
			<div>
				<Muted>{t('subtitle')}</Muted>
			</div>
			<Button onClick={() => router.push(`/create/${stack.id}`)}>{t('btn')}</Button>
		</div>
	);
}
