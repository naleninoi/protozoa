export class Bacteria {
    public x: number;
    public y: number;
    public isEaten: boolean = false;

    constructor(
        x: number,
        y: number
    ) {
        this.x = x;
        this.y = y;
    }

    public render() {
        return { 
            x: Math.round(this.x), 
            y: Math.round(this.y),
        };
    }
    
}