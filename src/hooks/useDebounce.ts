import React from "react";

// https://dev.to/arnonate/debouncing-react-query-with-hooks-2ek6

export default function useDebounce(value: string | number | null | undefined | boolean | Date, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler: NodeJS.Timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancel the timeout if value changes (also on delay change or unmount)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}