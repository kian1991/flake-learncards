'use client';
import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { locales } from '@/navigation';
import { useLocale } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';

type Props = SelectProps;

export default function LanguageSelect({ ...props }: Props) {
	const currentLocale = useLocale();
	const { replace } = useRouter();
	const pathname = usePathname();
	const params = useParams();

	const onSelectChange = (locale: string) => {
		console.log('value', locale);
		console.log('pathname', pathname);
		replace(pathname.replace(currentLocale, locale), params);
	};

	return (
		<Select {...props} onValueChange={onSelectChange}>
			<SelectTrigger className='w-[64px] border-none'>
				<SelectValue placeholder={currentLocale.toUpperCase()} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{locales.map((locale) => (
						<SelectItem key={locale} value={locale}>
							{locale.toUpperCase()}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
