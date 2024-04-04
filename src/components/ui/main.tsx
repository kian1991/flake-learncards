import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const Main = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
	({ children, ...rest }, ref) => {
		return (
			<main
				ref={ref}
				{...rest}
				className={cn('max-w-4xl w-full mx-auto px-4 md:p-11', rest.className)}>
				{children}
			</main>
		);
	}
);

Main.displayName = 'Main';

export default Main;
