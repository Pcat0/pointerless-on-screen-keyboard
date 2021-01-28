export class TextField {
    constructor(elemenet) {
        this.elemenet = elemenet;
    }
    get text() {return this.elemenet.value;}
    set text(value) {
        let cursorPos = [this.cursorStart, this.cursorEnd]
        this.elemenet.value = value;
        [this.cursorStart, this.cursorEnd] = cursorPos;
        return this.elemenet.value;
    }

    get cursorStart() {return this.elemenet.selectionStart;}
    set cursorStart(value) {
        [this.elemenet.selectionStart, this.elemenet.selectionEnd] = [value, this.cursorEnd].sort(); //Always keep selectionEnd bigger than selectionStart 
    
    }
    get cursorEnd() {return this.elemenet.selectionEnd;}
    set cursorEnd(value) {
        [this.elemenet.selectionStart, this.elemenet.selectionEnd] = [value, this.cursorStart].sort(); //Always keep selectionEnd bigger than selectionStart
    }
    get cursor(){return [this.elemenet.selectionStart, this.elemenet.selectionEnd]}
    set cursor(value) {
        if(value.constructor === Array) {
            return [this.elemenet.selectionStart, this.elemenet.selectionEnd] = value.sort();
        }
        return this.elemenet.selectionStart = this.elemenet.selectionEnd = value;
    }

    get selection() {return this.text.slice(this.cursorStart, this.cursorEnd);}
    get preSelection() {return this.text.slice(0, this.cursorStart);}
    get postSelection() {return this.text.slice(this.cursorEnd);}
    
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