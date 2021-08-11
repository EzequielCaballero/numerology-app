import React, { useState, useContext } from 'react';
import Polyglot from 'node-polyglot';
import { LanguageText } from '../../back/lang/source';
import { LocalStorage } from '../../back/services/handler/localstorage';
import { BrowserConfig } from '../../back/services/handler/browserconfig';

enum Lang {
	English = 'en',
	Spanish = 'es'
}

enum Theme {
	Dark = 'dark',
	Light = 'light'
}

type ContextProps = {
	lang: Lang;
	translate: Polyglot;
	switchLang: () => void;
	theme: Theme;
	switchTheme: () => void;
};

const ContextSetup = React.createContext<ContextProps>(undefined!);

export const useContextSetup = () => useContext(ContextSetup);

export const ConsumerSetup = ContextSetup.Consumer;

export const ProviderSetup: React.FunctionComponent = ({ children }) => {
	const [lang, setLang] = useState<Lang>((LocalStorage.getLang() as Lang) || BrowserConfig.getLang());
	const [theme, setTheme] = useState<Theme>((LocalStorage.getTheme() as Theme) || Theme.Dark);

	const translate = new Polyglot({
		locale: lang,
		phrases: LanguageText[lang]
	});

	const switchLang = () => {
		const newLang: Lang = lang === Lang.English ? Lang.Spanish : Lang.English;
		LocalStorage.saveLang(newLang);
		setLang(newLang);
	};

	const switchTheme = () => {
		const newTheme: Theme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
		LocalStorage.saveTheme(newTheme);
		setTheme(newTheme);
	};

	return (
		<ContextSetup.Provider value={{ lang, translate, switchLang, theme, switchTheme }}>
			{children}
		</ContextSetup.Provider>
	);
};
