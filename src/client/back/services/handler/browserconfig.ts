export class BrowserConfig {
	public static getTheme() {
		const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
		return mql && mql.matches ? 'dark' : 'light';
	}
}
