import React, { useState, useEffect, useContext } from 'react';

enum Theme {
	Dark = 'dark',
	Light = 'light'
}

type ContextProps = {
	theme: Theme;
	switchTheme: () => void;
};

const ContextSetup = React.createContext<ContextProps>(undefined!);
export const useContextSetup = () => useContext(ContextSetup);

export const ProviderSetup: React.FunctionComponent = ({ children }) => {
	const [ theme, setTheme ] = useState<Theme>(Theme.Dark);

	const switchTheme = () => {
		setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
	};

	useEffect(
		() => {
			if (theme === undefined) {
				setTheme(Theme.Dark);
			}
		},
		[ theme ]
	);

	return <ContextSetup.Provider value={{ theme, switchTheme }}>{children}</ContextSetup.Provider>;
};
