import { useState, useEffect } from 'react';

const ImgLoader = (src: string) => {
	const [ srcLoaded, setSrcLoaded ] = useState<string | null>(null);

	useEffect(
		() => {
			const img: HTMLImageElement = new Image();
			img.src = src;
			img.onload = () => setSrcLoaded(src);
		},
		[ src ]
	);

	return srcLoaded;
};

export default ImgLoader;
