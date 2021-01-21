import {Vector2} from './Vector.js';
import {Color, Style} from './CanvasStyling.js';


const DEFAULT_KEY_STYLE = new Style({
    foreground: Color.GRAY, 
    background: Color.LIGHT_GRAY,
    lineWidth: .025
});


export class Cursor {
    constructor (pos, style){
        this.pos = pos;
        this.style = style;
    }
    draw(canvas){
        this.style.applyTo(canvas);
        canvas.beginPath();
        canvas.arc(...this.pos, .1, 0, Math.PI * 2, true);
        canvas.fill();
    }
}

export class Key {
    constructor(id, pos, dim, style) {
        this.id = id;
        this.pos = pos;
        this.dim = dim;
        this.style = style;
        console.log(style);
    }
    get pos2() {
        return this.pos.add(this.dim)
    }
    draw(canvas){
        this.style.applyTo(canvas);
        canvas.beginPath();

        canvas.rect(...this.pos, ...this.dim);
        canvas.fill();
        canvas.stroke();
    }
}
export class KeyboardUI {
    constructor(keyboardDef, canvas){
        this.canvas = canvas;
        this.keys = KeyboardUI.parseKeyboardDef(keyboardDef);   
        this.cursor = new Cursor(Vector2.ZERO, new Style({
            background: Color.RED
        }));
        console.log(this.cursor.style)
    }
    static parseKeyboardDef(keyboardDef){
        let keys = [];
        let y = 0, keyID;
        for (const row of keyboardDef) {
            let x = 0;
            for(const col of row) {
                keys.push(new Key(keyID++, new Vector2(x, y), new Vector2(col, 1), DEFAULT_KEY_STYLE));
                x += col;
            }
            y += 1;
        }
        return keys;
    }
    draw() {
        this.canvas.save();
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
        this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        this.canvas.restore();
        for (const key of this.keys) {
           key.draw(this.canvas);
        }
        this.cursor.draw(this.canvas);
    }

}