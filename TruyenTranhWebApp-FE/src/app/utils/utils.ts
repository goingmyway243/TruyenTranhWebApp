export class Utils {
    public static IsNullOrEmpty(arr: any[]): boolean {
        if (arr != null && arr.length > 0)
            return false;

        return true;
    }
}