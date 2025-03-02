export function capitalize(str: string) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function removeDashes(str: string) {
    return str.replace(/-/g, ' ');
}