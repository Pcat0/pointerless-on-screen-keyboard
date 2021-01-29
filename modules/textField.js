import {minMax} from './miscFunctions.js';
export class TextField {
    constructor(elemenet) {
        this.elemenet = elemenet;
    }
    get selectionDirection(){return this.elemenet.selectionDirection == "backward"}
    set selectionDirection(value){this.elemenet.selectionDirection = value ? "forward": "backward"}

    get text() {return this.elemenet.value;}
    set text(value) {
        let cursorPos = this.cursor;
        this.elemenet.value = value;
        this.cursor = cursorPos;
        return this.elemenet.value;
    }

    get cursorStart() {return this.elemenet.selectionStart;}
    set cursorStart(value) {this.cursor = [value, this.cursorEnd];}

    get cursorEnd() {return this.elemenet.selectionEnd;}
    set cursorEnd(value) {this.cursor = [this.cursorStart, value];}

    get cursor(){return [this.elemenet.selectionStart, this.elemenet.selectionEnd]}
    set cursor(value) {
        if(value.constructor === Array) {
            if(value[0] > value[1]) {
                this.selectionDirection = !this.selectionDirection;
                console.log(this.selectionDirection);
            }
            return [this.elemenet.selectionStart, this.elemenet.selectionEnd] = value.sort(); //Always keep selectionEnd bigger than selectionStart 
        }
        return this.elemenet.selectionStart = this.elemenet.selectionEnd = value;
    }

    get selection() {return this.text.slice(this.cursorStart, this.cursorEnd);}
    get preSelection() {return this.text.slice(0, this.cursorStart);}
    get postSelection() {return this.text.slice(this.cursorEnd);}
    
    moveCursor(x, y, select = false) {
        let newPos = this.selectionDirection ? this.cursorStart : this.cursorEnd;
        if(y != 0)
            newPos = this.offsetPosByLine(newPos, y);
        newPos += x;
        if(select) {
            if(this.selectionDirection) {
                this.cursorStart = newPos;
            } else {
                this.cursorEnd = newPos;
            }
        } else {
            this.cursor = newPos;
        }
    }
    offsetPosByLine(pos, dLine) { //May reimplement this at some point
        let line = 0, lineLengths = this.text.split('\n').map(a=>a.length+1);
        while (pos > lineLengths[line]) pos -= lineLengths[line++];
        line = minMax(line + dLine, 0, lineLengths.length);
        pos = Math.min(pos, lineLengths[line]-1);
        for (let i = 0; i < line; i++) pos += lineLengths[i];
        return pos;
    }
    
    type(text){
        let endpos = this.preSelection.length + text.length;

        this.text = this.preSelection + text + this.postSelection;
        this.cursor = endpos;
        return this.text;
    }
    backspace(direction = -1){ // direction = 1 to mimic delete. Or I guess other values work too if you want to live life on the wild side. 
        if(this.cursorStart = this.cursorEnd) {
            this.cursorStart += direction;
        }
        this.text = this.preSelection + this.postSelection;
        this.cursorEnd = this.cursorStart;
        return this.text;
    }
    get focus(){ //Might not be the best way to do this but the bind() funct is fun. And getters are even more fun.
        return this.elemenet.focus.bind(this.elemenet); 
    }
}