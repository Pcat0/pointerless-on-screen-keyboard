import {Vector2,BoundingBox} from './Vector.js';
import {Color, Style} from './CanvasStyling.js';


const DEFAULT_KEY_STYLE = new Style({
    strokeStyle: Color.GRAY, 
    fillStyle: Color.LIGHT_GRAY,
});

const DEFAULT_KEY_TEXT_STYLE = new Style({
    strokeStyle: Color.BLACK, 
    fillStyle: Color.BLACK,
    textBaseline: Style.TextBaseline.MIDDLE,
    textAlign: Style.TextAlign.CENTER,
    font: "11px sans-serif"
});
const ACTIVE_KEY_STYLE = new Style({
    fillStyle: Color.STEEL_BLUE
}, DEFAULT_KEY_STYLE);


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
    constructor(id, pos, dim, props, style, textStyle) {
        this.id = id;
        this.bounds = new BoundingBox(pos.mult(40), pos.mult(40).add(dim.mult(40)));
        this.style = style;
        this.textStyle = textStyle;


        props = Object.assign({}, {label: null, key: null, upper: null, lower: null}, props);
        if (props.label != null && props.label.constructor === Array) {
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

        if (props.action != null) {
            if(props.action.constructor === Array) this.action = props.label; 
            else this.action = [props.action];
        } else if(props.key != null) {
            this.action = [props.key.toLowerCase(), props.key.toUpperCase()];
        } else if (props.upper != null && props.lower != null) {
            this.action = [props.upper, props.lower];
        } else {
            this.action = [''];
        }
        this.action = [...this.action, ...this.action].slice(0,2);
    }
    getAction(shift) {
        return this.action[shift];
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
        
        this.drawLabel(canvas);
    }
    drawLabel(canvas, style = this.textStyle){
        style.applyTo(canvas);

        if(this.label.length == 1) {
            canvas.fillText(this.label[0], ...this.bounds.center);
        } else {
            canvas.textBaseline = Style.TextBaseline.BOTTOM
            canvas.fillText(this.label[0], ...this.bounds.center);
            canvas.textBaseline = Style.TextBaseline.TOP
            canvas.fillText(this.label[1], ...this.bounds.center);
        }
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
                    DEFAULT_KEY_STYLE,
                    DEFAULT_KEY_TEXT_STYLE));
                x += col;
            }
            y += 1;
        }
        return keys;
    }
    getKeyAtPoint(point) {
        return this.keys.find(key=>key.bounds.contains(point));
    }
    getKeyAtCursor() {
        return this.getKeyAtPoint(this.cursor.pos);
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