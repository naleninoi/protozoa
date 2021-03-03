import { Bacteria } from "./bacteria";
import { Protozoa } from "./protozoa";

export class Canvas {

    public width = 500;
    public height = 500;
    
    protozoa: Array<Protozoa> = [];
    bacteria: Array<Bacteria> = [];
    
    constructor() {
        for (let i = 0; i < 11; i++) {
            this.addProtozoa();
        }
        for (let i = 0; i < 1000; i++) {
            this.addBacteria();
        }
    }

    public addProtozoa() {
        const p = Protozoa.generate();
        p.x = Math.floor(Math.random() * this.width);
        p.y = Math.floor(Math.random() * this.height);      
        this.protozoa.push(p);
    }

    public addBacteria() {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height); 
        const b = new Bacteria(x, y);   
        this.bacteria.push(b);
    }

    public process() {
        let divided = [];
        this.protozoa.forEach( p => {
            p.move();
            if(p.x > this.width) p.x = 0;
            if(p.y > this.height) p.y = 0;
            if(p.x < 0) p.x = this.width;
            if(p.y < 0) p.y = this.height;
            this.bacteria.forEach( b => {
                if (p.covers(b)) {
                    p.eat(b);
                    if (p.isReadyToDivide()) {
                        divided.push( p.divide() );
                    }
                }

            });
        });
        this.protozoa.push( ...divided);
        this.protozoa = this.protozoa.filter( p => p.energy > 0 );
        this.bacteria = this.bacteria.filter( b => !b.isEaten);
    }

    public feed(position) {
        const R = 50;
        for (let i = 0; i < 20; i++) {
            const x = (position.x - 40) + R * (Math.random() - 0.5);
            const y = (position.y - 100) + R * (Math.random() - 0.5);
            const b = new Bacteria(x, y);
            this.bacteria.push(b);
        }
    }

    public render() {
        return {
            protozoa: this.protozoa.map( p => p.render() ),
            bacteria: this.bacteria.map( b => b.render() )
        };
    }

}