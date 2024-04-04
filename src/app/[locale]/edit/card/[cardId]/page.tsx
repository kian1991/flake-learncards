import CreateCardForm from '@/components/card/card-create-form';
import Main from '@/components/ui/main';
import { getCardById } from '@/db/cards';
import { notFound } from 'next/navigation';
import { unstable_noStore } from 'next/cache';
import CardEditForm from '@/components/card/card-edit-form';

export default async function CardEdit({
	params: { cardId },
}: {
	params: { cardId: string };
}) {
	return (
		<Main>
			<CardEditForm cardId={cardId} />
		</Main>
	);
}
