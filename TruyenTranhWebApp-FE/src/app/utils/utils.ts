export class Utils {
    public static IsNullOrEmpty(arr: any[]): boolean {
        if (arr != null && arr.length > 0)
            return false;

        return true;
    }

    static padTo2Digits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    static formatDate(date: Date): string {
        let values = date.toString().slice(0, 10).split('-');
        values.reverse();

        return [...values].join('/');
    }

    static getTimeDiff(time: Date): string {
        let now = new Date();
        let date = new Date(time.valueOf());
        let diff = Math.round((now.getTime() - date.getTime()) / 60000);

        if (diff < 1) {
            return 'Just now';
        } else if (diff < 60) {
            return diff + ' minutes ago';
        } else if (diff < 1440) {
            let hour = diff < 120 ? 'hour' : 'hours';
            return Math.floor(diff / 60) + ' ' + hour + ' ago';
        }
        else if (diff < 10080) {
            let day = diff < 2880 ? 'day' : 'days';
            return Math.floor(diff / 1440) + ' ' + day + ' ago';
        }
        else {
            return Utils.formatDate(date);
        }
    }
}