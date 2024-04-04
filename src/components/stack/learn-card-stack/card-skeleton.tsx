import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';

export default function CardSkeleton() {
	return (
		<div className='px-2 mx-auto w-full'>
			<Card className='relative h-80 max-w-[50ch]  mx-auto'>
				<div className='absolute w-full h-full top-0 left-0 '>
					<CardHeader>
						<div className='flex gap-3'>
							<div className='bg-muted rounded-lg animate-pulse w-[100px] h-8'></div>
							<div className='bg-muted rounded-lg animate-pulse w-[70px] h-8'></div>
							<div className='bg-muted rounded-lg animate-pulse w-[120px] h-8'></div>
						</div>
					</CardHeader>
					<CardContent className='mt-4 flex-col flex gap-2'>
						<div className='bg-muted rounded-lg animate-pulse md:w-[350px] w-[200px] h-6 mx-auto'></div>
						<div className='bg-muted rounded-lg animate-pulse w-[190px] h-6 mx-auto'></div>
						<div className='bg-muted rounded-lg animate-pulse w-[250px] h-6 mx-auto'></div>
					</CardContent>
					<div className='absolute bottom-0 w-full'>
						<div className='bg-muted rounded-lg animate-pulse w-[30px] h-4 m-1'></div>
						<div className='bg-muted rounded-b-lg animate-pulse w-full h-4 mx-auto'></div>
					</div>
				</div>
			</Card>
		</div>
	);
}
