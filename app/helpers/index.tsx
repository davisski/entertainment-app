// Helper class

export class Helpers {

    static truncateText(text: string, maxLength: number): string {
        if(!text) return '';
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    static isMonday(): boolean {
        const today = new Date();
        return today.getDay() === 1;
    }

    static isCurrentWeek(timestamp: number): boolean {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const dateToCheck = new Date(timestamp);
        return dateToCheck >= oneWeekAgo && dateToCheck <= now;
    }
}

