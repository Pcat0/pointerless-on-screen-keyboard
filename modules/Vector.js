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