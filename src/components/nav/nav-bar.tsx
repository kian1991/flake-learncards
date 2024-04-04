import React from 'react';
import LanguageSelect from './language-select';
import { Link } from '@/navigation';
import { IconSnowflake } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';

export default async function NavBar() {
	const session = await auth();
	const t = await getTranslations('NavBar');
	return (
		<nav className='w-full h-14 md md:px-20 px-4 flex justify-start items-center gap-5'>
			<IconSnowflake className='w-6 h-6 hidden sm:block' />
			<Link
				className='tracking-tighter hover:text-sky-600 dark:hover:text-sky-300'
				href={'/'}>
				{t('home')}
			</Link>
			{session?.user && (
				<>
					<Link
						className='tracking-tighter hover:text-sky-600 dark:hover:text-sky-300'
						href={'/learn'}>
						{t('learn')}
					</Link>
					<Link
						className='tracking-tighter hover:text-sky-600 dark:hover:text-sky-300'
						href={'/create'}>
						{t('create')}
					</Link>
				</>
			)}
			<div className='ms-auto flex items-center gap-2'>
				<LanguageSelect />
			</div>
		</nav>
	);
}
