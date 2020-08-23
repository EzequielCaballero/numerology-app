import { useState, useEffect } from 'react';

const useImgLoader = (src: string[]) => {
	const [ srcLoaded, setSrcLoaded ] = useState<string | null>(null);

	useEffect(
		() => {
			const img: HTMLImageElement = new Image();
			if (src.length > 1 && src.length <= 4) {
				const sizes: string[] = [ '1500w', '800w', '600w', '400w' ];
				const srcCustomset: string = src.map((s, i) => `${s} ${sizes[i]}`).join(',');
				img.srcset = srcCustomset;
			}
			img.src = src[0];
			img.onload = () => setSrcLoaded(img.currentSrc);
		},
		[ src ]
	);

	return srcLoaded;
};

export default useImgLoader;
