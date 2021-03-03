import { Bacteria } from "./bacteria";

export class Protozoa {

    public x: number;
    public y: number;
    public energy: number;
    public size: number;

    private direction: number;
    private speed: number;

    private genom: Genom;

    constructor() {}

    public static generate() {
        const p = new Protozoa();
        p.genom = Genom.generate();
        p.direction = Math.random();
        p.speed = 1 + Math.random() * 5;
        p.energy = 200 + Math.random() * 500;
        p.size = Math.floor (p.energy / 100) + 4;
        // p.size = Math.floor(Math.random() * (sizeMax - sizeMin + 1)) + sizeMin;     
        return p;
    }

    public move() {
        this.x += this.speed * Math.cos(this.direction * Math.PI / 360);
        this.y += this.speed * Math.sin(this.direction * Math.PI / 360);
        this.changeBehaviour();
        this.energy -= this.speed * 0.5;
        this.size = Math.floor (this.energy / 100) + 4;
    }

    public changeBehaviour() {
        if (Math.random() > this.genom.turnRightProb) {
            this.direction += this.genom.turnRightStep;
        }
        if (Math.random() > this.genom.turnLeftProb) {
            this.direction -= this.genom.turnLeftStep;
        }
        if (Math.random() > this.genom.speedIncProb) {
            this.speed += this.genom.speedIncStep;
        }
        if (Math.random() > this.genom.speedDecProb) {
            this.speed -= this.genom.speedDecStep;
        }
        if (this.speed > this.genom.speedMax) {
            this.speed = this.genom.speedMax;
        }
        if (this.speed < 0.5) {
            this.speed = 0.5;
        }
    }

    public covers(bacteria: Bacteria) {
        return bacteria.x >= this.x - this.size
            && bacteria.y >= this.y - this.size
            && bacteria.x <= this.x + this.size
            && bacteria.y <= this.y + this.size;
    }

    public eat(bacteria: Bacteria) {
        if (bacteria.isEaten) { return; }
        bacteria.isEaten = true;
        this.energy += 50;
    }

    public isReadyToDivide() {
        return this.energy >= 2000;
    }

    public divide(): Protozoa {
        const p = new Protozoa();
        p.x = this.x;
        p.y = this.y;
        p.energy = this.energy / 2;
        this.energy = this.energy / 2;
        p.direction = this.direction - 120;
        this.direction = this.direction + 120;
        p.speed = this.speed;
        p.genom = this.genom;
        return p;
    }

    public render() {
        return { 
            x: Math.round(this.x), 
            y: Math.round(this.y),
            color: this.genom.color,
            size: this.size
        };
    }
}

class Genom {

    public turnRightProb: number;
    public turnLeftProb: number;
    public turnRightStep: number;
    public turnLeftStep: number;

    public speedIncProb: number;
    public speedDecProb: number;
    public speedIncStep: number;
    public speedDecStep: number;
    public speedMax: number;

    public color: string;

    constructor () {}

    public static generate() {        
        const g = new Genom();
        const colors = ["aqua", "fuchsia", 
                        "lime", "red",
                        "silver", "yellow"]

        var colorNum = function() {
            let min = 0;
            let max = colors.length - 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        g.turnRightProb = Math.random();
        g.turnLeftProb = Math.random();
        g.turnRightStep = Math.random() * 20;
        g.turnLeftStep = Math.random() * 20;
        g.speedIncProb = Math.random();
        g.speedDecProb = Math.random();
        g.speedIncStep = Math.random() * 2;
        g.speedDecStep = Math.random() * 2;
        g.speedMax = 3;
        g.color = colors[colorNum()];

        return g;
    }
    
}