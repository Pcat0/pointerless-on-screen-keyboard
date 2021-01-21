export class Vector2 { //Why am I implementing vector math for a shit post?
    constructor(x, y){
        if (x != null && x.constructor === Object && x.hasOwnProperty('x') && x.hasOwnProperty('y')){
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
        
    }
    get magnitude () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    *[Symbol.iterator](){
        yield this.x;
        yield this.y;
    }
    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
    sub(vector2) {
        return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }
    mult(scaler) {
        return new Vector2(this.x * scaler, this.y * scaler);
    }
    div(scaler) {
        return new Vector2(this.x / scaler, this.y / scaler);
    }
    static get ZERO(){return new Vector2(0,0)}
    static get NULL(){return new Vector2(null,null)}
}