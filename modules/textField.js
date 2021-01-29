import {minMax} from './miscFunctions.js';
export class TextField {
    constructor(element) {
        this.element = element;
    }
    get selectionDirection(){return this.element.selectionDirection == "backward"}

    get text() {return this.element.value;}
    set text(value) {
        let cursorPos = this.cursor;
        this.element.value = value;
        this.cursor = cursorPos;
        return this.element.value;
    }

    get cursorStart() {return this.element.selectionStart;}
    set cursorStart(value) {this.cursor = [value, this.cursorEnd];}

    get cursorEnd() {return this.element.selectionEnd;}
    set cursorEnd(value) {this.cursor = [this.cursorStart, value];}

    get cursor(){return [this.element.selectionStart, this.element.selectionEnd]}
    set cursor(value) {
        if(value.constructor === Array) {
            let dir = this.selectionDirection ^ (value[0] > value[1]) ? "backward" : "forward"; //Reverse selection direction if cursorStart is after cursorEnd.
            this.element.setSelectionRange(...value.sort((a,b)=>a-b), dir);
        } else if(+value === +value)  { //Best way to check if a value can be turned into a number. :)
            this.element.setSelectionRange(value,value);
        } else {
            throw 'an unhelpful error message';
        }
    }

    setRangeText(text, mode = 'end'){
        return this.element.setRangeText(text, this.cursorStart, this.cursorEnd, mode);
    }

    moveCursor(x, y, select = false) { // I really dont like this fuct
        let newPos = this.selectionDirection ? this.cursorStart : this.cursorEnd;
        newPos = this.offsetPosByLine(newPos, y) + x;
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
        if(dLine==0) return pos;
        let line = 0, lineLengths = this.text.split('\n').map(a=>a.length+1);
        while (pos > lineLengths[line]) pos -= lineLengths[line++];
        line = minMax(line + dLine, 0, lineLengths.length);
        pos = Math.min(pos, lineLengths[line]-1);
        for (let i = 0; i < line; i++) pos += lineLengths[i];
        return pos;
    }
    
    type(text){
        this.setRangeText(text);
    }
    backspace(direction = -1){ // direction = 1 to mimic delete. Or I guess other values work too if you want to live life on the wild side. 
        if(this.cursorStart === this.cursorEnd) {
            this.cursorStart += direction;
        }
        this.setRangeText("");
    }
    get focus(){ //Might not be the best way to do this but the bind() funct is fun. And getters are even more fun.
        return this.element.focus.bind(this.element); 
    }
}