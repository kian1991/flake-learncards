import createMiddleware from 'next-intl/middleware';
import { localePrefix, defaultLocale, locales } from './navigation';

export default createMiddleware({
	// A list of all locales that are supported
	locales,
	// Used when no locale matches
	defaultLocale,
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(de|en)/:path*'],
};
