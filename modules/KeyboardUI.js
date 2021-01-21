import {Vector2} from './Vector.js';
import {Color, Style} from './CanvasStyling.js';


const DEFAULT_KEY_STYLE = new Style({
    strokeStyle: Color.GRAY, 
    fillStyle: Color.LIGHT_GRAY,
    textBaseline: Style.TextBaseline.MIDDLE,
    textAlign: Style.TextAlign.CENTER
});
const ACTIVE_KEY_STYLE = new Style({
    fillStyle: Color.STEEL_BLUE
}, DEFAULT_KEY_STYLE);


export class BoundingBox {
    constructor(p1, p2) {
        this.p1 = new Vector2(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        this.p2 = new Vector2(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
    }
    contains(vector2) {
        return this.p1.x <= vector2.x && vector2.x <= this.p2.x &&
               this.p1.y <= vector2.y && vector2.y <= this.p2.y;
    }
    get rect(){
        return [
            ...this.p1,
            ...this.p2.sub(this.p1)
        ];
    }
    get center() {
        return this.p1.add(this.p2).div(2);
    }
}

export class Cursor {
    constructor (pos, style){
        this.pos = pos;
        this.style = style;
    }
    draw(canvas){
        this.style.applyTo(canvas);
        canvas.beginPath();
        canvas.arc(...this.pos, 4, 0, Math.PI * 2, true);
        canvas.fill();
    }

}

export class Key {
    constructor(id, pos, dim, props, style) {
        this.id = id;
        this.bounds = new BoundingBox(pos.mult(40), pos.mult(40).add(dim.mult(40)));
        this.style = style;
        props = Object.assign({}, {label: null, key: null, upper: null, lower: null}, props);
        if (props.label != null && props.label.constructor === Array) {
            console.log( props.label.constructor)
            this.label = props.label.slice(0,2);
        } else if (props.label != null && props.label.constructor === String) {
            this.label = [props.label];
        } else if (props.key != null) {
            this.label = [props.key.toUpperCase()];
        } else if (props.upper != null && props.lower != null) {
            this.label = [props.upper, props.lower];
        }else {
            this.label = [''];
        }
    }
    get pos2() {
        return this.pos.add(this.dim);
    }
    draw(canvas, style = this.style){
        style.applyTo(canvas);
        canvas.beginPath();
        canvas.rect(...this.bounds.rect);
        canvas.fill();
        canvas.stroke();
        
        this.drawLabel(canvas, style);
        
        // canvas.beginPath();
        // canvas.arc(...this.bounds.center, 4, 0, Math.PI * 2, true);
        // canvas.fill();
        //
    }
    drawLabel(canvas, style = this.style){
        style.applyTo_text(canvas);


        canvas.fillText(this.label[0], ...this.bounds.center);
    }
}
export class KeyboardUI {
    constructor(keyboardDef, canvas){
        this.canvas = canvas;
        this.keys = KeyboardUI.parseKeyboardDef(keyboardDef);   
        this.cursor = new Cursor(Vector2.ZERO, new Style({
            fillStyle: Color.RED
        }));
    }
    static parseKeyboardDef(keyboardDef){
        let keys = [];
        let y = 0, keyID = 0;
        for (const row of keyboardDef.grid) {
            let x = 0;
            for(const col of row) {
                keys.push(new Key(keyID,
                    new Vector2(x, y),
                    new Vector2(col, 1),
                    keyboardDef.keyProps[keyID++],
                    DEFAULT_KEY_STYLE));
                x += col;
            }
            y += 1;
        }
        return keys;
    }
    getKeyAtPoint(point) {
        return this.keys.find(key=>key.bounds.contains(point));
    }
    draw() {
        this.canvas.save();
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
        this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        this.canvas.restore();
        for (const key of this.keys) {
            let style = key.bounds.contains(this.cursor.pos)? ACTIVE_KEY_STYLE : DEFAULT_KEY_STYLE;
            key.draw(this.canvas, style);
        }
        this.cursor.draw(this.canvas);
    }

}