export class Vector2 { //Why am I implementing vector math for a shit post?
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    *[Symbol.iterator](){
        yield this.x;
        yield this.y;
    }
    add(vector2){
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
    mult(scaler) {
        return new Vector2(this.x * scaler, this.y * scaler);
    }
    static get ZERO(){return new Vector2(0,0)}
}