'use client';

import { Button } from '../ui/button';
import { signIn, signOut } from 'next-auth/react';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';

export function LoginButton() {
	return (
		<div className='flex gap-4'>
			<Button
				onClick={() => signIn('github', { redirect: false })}
				variant={'link'}
				size={'icon'}
				className='text-sky-600 dark:text-sky-300 text-sm border rounded-full'>
				<IconBrandGithub />
			</Button>
			<Button
				onClick={() => signIn('google', { redirect: false })}
				variant={'link'}
				size={'icon'}
				className='text-sky-600 dark:text-sky-300 text-sm border rounded-full'>
				<IconBrandGoogle />
			</Button>
		</div>
	);
}

export function UserButton({
	welcomeText,
	signOutText,
}: {
	welcomeText: string;
	signOutText: string;
}) {
	return (
		<div className='flex flex-col justify-center items-center'>
			<span className='tracking-tighter font-bold' onClick={() => signOut()}>
				{welcomeText}
			</span>
			<Button
				onClick={() => signOut()}
				variant={'link'}
				className='text-sky-600 dark:text-sky-300'>
				{signOutText}
			</Button>
		</div>
	);
}
