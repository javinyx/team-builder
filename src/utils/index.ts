export function capitalize(str: string) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function removeDashes(str: string) {
    return str.replace(/-/g, ' ');
}

export async function isImagePresentLocally(url: string) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch {
        return false;
    }
}