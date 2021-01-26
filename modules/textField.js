export class TextField {
    constructor(elemenet) {
        this.elemenet = elemenet;

    }
    get text() {return this.elemenet.value;}
    set text(value) {return this.elemenet.value = value;}

    get cursorStart() {return this.elemenet.selectionStart;}
    set cursorStart(value) {
        [this.elemenet.selectionStart, this.elemenet.selectionEnd] = [value, this.cursorEnd].sort(); //Always keep selectionEnd bigger than selectionStart 
    }

    get cursorEnd() {return this.elemenet.selectionEnd;}
    set cursorEnd(value) {
        [this.elemenet.selectionStart, this.elemenet.selectionEnd] = [value, this.cursorStart].sort(); //Always keep selectionEnd bigger than selectionStart
    }

    get selection() {return this.text.slice(this.cursorStart, this.cursorEnd);}
    get preSelection() {return this.text.slice(0, this.cursorStart);}
    get postSelection() {return this.text.slice(this.cursorStart, -1);}
    
    type(text){
        this.text = this.preSelection + text + this.postSelection;
        this.cursorStart = this.cursorEnd;
        return this.text;
    }
    backspace(direction = -1){ // direction = 1 to mimic delete. Or I guess other values work too if you want to live life on the wild side. 
        if(cursorStart = this.cursorEnd) {
            this.cursorStart += direction;
        }
        this.text = this.preSelection + this.postSelection;
        this.cursorEnd = this.cursorStart;
        return this.text;
    }

}