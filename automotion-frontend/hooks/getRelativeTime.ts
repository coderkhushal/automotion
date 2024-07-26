export function getRelativeTime(timestamp: string): string {
    // Parse the input timestamp as GMT/UTC
    const past = new Date(timestamp);

    // Get the current time in IST
    const now = new Date();

    // Convert current IST time to GMT
    const nowInGMT = new Date(now.getTime() - (5.5 * 60 * 60 * 1000));

    const deltaMilliseconds = nowInGMT.getTime() - past.getTime();

    // Ensure we don't have negative values in case of future timestamps
    const minutes = Math.max(deltaMilliseconds / 1000 / 60, 0);
    const hours = Math.max(minutes / 60, 0);
    const days = Math.max(hours / 24, 0);
    const months = Math.max(days / 30, 0); // Rough approximation
    const years = Math.max(days / 365, 0); // Rough approximation

    if (years >= 1) {
        return `${Math.floor(years)} year${Math.floor(years) > 1 ? 's' : ''}`;
    } else if (months >= 1) {
        return `${Math.floor(months)} month${Math.floor(months) > 1 ? 's' : ''}`;
    } else if (days >= 1) {
        return `${Math.floor(days)} day${Math.floor(days) > 1 ? 's' : ''}`;
    } else if (hours >= 1) {
        return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? 's' : ''}`;
    } else {
        return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1 ? 's' : ''}`;
    }
}

// Example usage
