export class PhpHelpers {
    // PHP rand() is inclusive [min, max]. JS Math.random() is exclusive of max.
    static rand(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // PHP time() returns seconds. JS Date.now() returns ms.
    static time(): number {
        return Math.floor(Date.now() / 1000);
    }

    // Emulate PHP json_encode behavior if needed (mostly identical for simple objects)
    static json_encode(value: any): string {
        return JSON.stringify(value);
    }

    // PHP shuffle() - in-place shuffle
    static shuffle(array: any[]): boolean {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return true;
    }
}
