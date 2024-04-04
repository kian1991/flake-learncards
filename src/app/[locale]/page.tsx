import { auth } from '@/auth';
import { LoginButton, UserButton } from '@/components/auth/auth-button';
import { IconSnowflake } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
	const t = await getTranslations();
	const session = await auth();

	return (
		<main className='flex flex-col items-center justify-between p-24 text-center'>
			<div>
				<IconSnowflake size={90} />
			</div>
			<div className='text-7xl font-bold tracking-tighter mt-12'>FLAKE LEARN</div>
			<div className='text-xl font-bold text-muted-foreground tracking-tighter'>
				BE BETTER
			</div>
			<div className='mt-12'>
				{session?.user?.name ? (
					<UserButton
						welcomeText={t('Auth.welcome', { name: session.user.name.split(' ')[0] })}
						signOutText={t('Auth.signout')}
					/>
				) : (
					<LoginButton />
				)}
			</div>
		</main>
	);
}
