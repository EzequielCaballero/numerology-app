import { useState, useEffect } from 'react';

const useImgLoader = (src: string[]) => {
	const [ srcLoaded, setSrcLoaded ] = useState<string | null>(null);

	useEffect(
		() => {
			const sizes: string[] = [ '1500w', '800w', '600w', '400w' ];
			const img: HTMLImageElement = new Image();
			const srcCustomset: string = src.map((s, i) => `${s} ${sizes[i]}`).join(',');
			img.srcset = srcCustomset;
			img.src = src[1];
			img.onload = () => setSrcLoaded(img.currentSrc);
		},
		[ src ]
	);

	return srcLoaded;
};

export default useImgLoader;
