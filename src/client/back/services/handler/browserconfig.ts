export class BrowserConfig {
	public static getTheme(): string {
		const mql: MediaQueryList = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
		return mql && mql.matches ? 'dark' : 'light';
	}

	public static getLang(): string {
		const lang: string = window.navigator.language;
		return lang && lang.match('^es') ? 'es' : 'en';
	}
}
