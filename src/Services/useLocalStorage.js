import { useEffect, useState } from "react";

function useLocalState(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue !== 'undefined'
            ? JSON.parse(localStorageValue)
            : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export { useLocalState };
