import React, { useState, useEffect, useContext } from 'react';
import HandlerStorage from '../../backend/services/handler/storage';
import HandlerBrowserPrefers from '../../backend/services/handler/browserprefers';

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
		HandlerStorage.saveTheme(newTheme);
		setTheme(newTheme);
	};

	useEffect(
		() => {
			if (theme === null) {
				setTheme((HandlerStorage.getTheme() as Theme) || HandlerBrowserPrefers.getBrowserTheme());
			}
		},
		[ theme ]
	);

	return <ContextSetup.Provider value={{ theme, switchTheme }}>{children}</ContextSetup.Provider>;
};
