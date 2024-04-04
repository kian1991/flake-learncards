import AddButton from '@/components/add-button';
import EditButton from '@/components/edit-button';
import Main from '@/components/ui/main';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getStack } from '@/db/stacks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { H3 } from 'shadcn-typography';

export default async function StackEdit({
	params: { stackId },
}: {
	params: { stackId: string };
}) {
	const stack = await getStack(stackId);

	if (!stack) notFound();
	if ('error' in stack) return <Main>{stack.error}</Main>;

	return (
		<Main className='grid place-items-center'>
			<H3 className='pb-5'>{stack.name}</H3>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Front</TableHead>
						<TableHead>Back</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{stack.learnCards.map((card) => (
						<TableRow key={card.id}>
							<TableCell>{card.front}</TableCell>
							<TableCell>{card.back}</TableCell>
							<TableCell className='flex justify-end items-center'>
								<EditButton callbackUrl={`edit/card/${card.id}`} />
								{/* <DeleteButton id={card.id} /> */}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<AddButton
				callbackUrl={`/create/${stackId}`}
				className='w-full lg:w-fit mx-auto mt-5'
			/>
		</Main>
	);
}
