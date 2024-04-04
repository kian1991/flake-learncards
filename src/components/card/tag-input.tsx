import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { InlineCode } from 'shadcn-typography';
import { motion } from 'framer-motion';

type Props = {
	tags: string[];
	onSetTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagInput({ tags, onSetTags }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			const value = inputRef.current?.value;
			if (value) {
				onSetTags([...tags, value]);
				inputRef.current!.value = '';
			}
		}
	}

	return (
		<>
			<div className='flex gap-1 flex-wrap'>
				{tags.length < 3 && (
					<InlineCode>
						<input
							ref={inputRef}
							onKeyDown={handleKeyDown}
							type='text'
							placeholder='tags...'
							className='bg-transparent border-none focus:outline-none text-sm'
						/>
					</InlineCode>
				)}
				<AnimatePresence>
					{tags &&
						tags.map((tag, index) => (
							<motion.div layout key={tag}>
								<InlineCode className='flex gap-2 items-center w-fit'>
									<span>#{tag}</span>
									<button
										onClick={() => {
											onSetTags(tags.filter((_, i) => i !== index));
										}}
										className=''>
										<X size={16} />
									</button>
								</InlineCode>
							</motion.div>
						))}
				</AnimatePresence>
			</div>
		</>
	);
}
