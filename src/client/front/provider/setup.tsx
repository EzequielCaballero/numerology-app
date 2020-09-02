import React, { useState, useEffect, useContext } from 'react';
import { LocalStorage } from '../../back/services/handler/localstorage';
import { BrowserConfig } from '../../back/services/handler/browserconfig';

enum Theme {
	Dark = 'dark',
	Light = 'light'
}

type ContextProps = {
	theme: Theme | null;
	switchTheme: () => void;
};

const ContextSetup = React.createContext<ContextProps>(undefined!);
export const useContextSetup = () => useContext(ContextSetup);

export const ProviderSetup: React.FunctionComponent = ({ children }) => {
	const [ theme, setTheme ] = useState<Theme | null>(null);

	const switchTheme = () => {
		const newTheme: Theme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
		LocalStorage.saveTheme(newTheme);
		setTheme(newTheme);
	};

	useEffect(
		() => {
			if (theme === null) {
				setTheme((LocalStorage.getTheme() as Theme) || BrowserConfig.getTheme());
			}
		},
		[ theme ]
	);

	return <ContextSetup.Provider value={{ theme, switchTheme }}>{children}</ContextSetup.Provider>;
};
