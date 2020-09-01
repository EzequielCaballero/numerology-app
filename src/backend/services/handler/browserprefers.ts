class HandlerBrowserPrefers {
	public static getBrowserTheme() {
		const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
		return mql && mql.matches ? 'dark' : 'light';
	}
}

export default HandlerBrowserPrefers;
