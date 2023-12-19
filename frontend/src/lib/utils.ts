

export function getUUIDFromLowerDir(lowerDir: string) {
    let parts = lowerDir.split("/");
    return parts[parts.length - 2];
}