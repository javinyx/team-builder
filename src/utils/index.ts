export function capitalize(str: string) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function removeDashes(str: string) {
    return str.replace(/-/g, ' ');
}

export function debounce<T extends (...args: any[]) => void>(func: T, timeout = 300): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(null, args), timeout);
    };
}