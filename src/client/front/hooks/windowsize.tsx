//SOURCE: https://usehooks.com/useWindowSize/
import { useState, useEffect } from 'react';

export type TSize = {
    width: number | undefined;
    height: number | undefined;
}

export const useWindowSize = (): TSize => {
    const [windowSize, setWindowSize] = useState<TSize>({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
        console.log("Render size!");
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}