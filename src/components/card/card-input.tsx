import { CARD_MAX_CHARS } from '@/schemas';
import React from 'react';
import { ControllerRenderProps, Field } from 'react-hook-form';
import { Muted } from 'shadcn-typography';

type Props = {
	pending: boolean;
	currentLength: number;
} & ControllerRenderProps;

export default function CardInput({ pending, currentLength, ...rest }: Props) {
	return (
		<div className='relative'>
			<textarea
				placeholder={rest.name === 'front' ? 'Front...' : 'Back...'}
				{...rest}
				disabled={pending}
				rows={5}
				maxLength={CARD_MAX_CHARS}
				className='border-none focus-visible:outline-none bg-transparent w-full text-center resize-none'
			/>
			<Muted className='text-xs right-0 -bottom-[10px] absolute'>
				{currentLength}/{CARD_MAX_CHARS}
			</Muted>
		</div>
	);
}
