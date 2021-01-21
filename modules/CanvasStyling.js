export class Color { //TODO: Add alpha 
    constructor (arg0, arg1, arg2) { //Either Color(r, g, b) or Color(hex)
        if(typeof arg0 == 'undefined'){
            this.hex = Color.BLACK;
        } else if(typeof arg1 != 'undefined'){ //I realy don't like this code.
            this.setRGB(arg0, arg1, arg2);
        } else if (typeof arg0 == "string" && arg0[0] == '#') {
            this.hex = arg0;
        } else {
            throw 'Bad Color constructor args';
        }
    }
    *[Symbol.iterator] (){
        yield this.r;
        yield this.g;
        yield this.b;
    }
    toString(){
        return this.hex;
    }
    set hex(h) { //Takes 3 or 6 digits hex codes
        [,this.r,this.g,this.b]=h.match(/#?(..?)(..?)(..?)/i).map(c=>+('0x'+c+c).slice(0,4)); //Code golf is fun :)
    }
    get hex() {
        return [...this].reduce((a,c)=>a+`0${c.toString(16)}`.slice(-2),'#');
    }
    setRGB(r,g,b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    getRGB(){
        return [...this];
    }
    setHex(hex){
        this.hex = hex;
    }
    getHex(){
        return this.hex;
    }

    static get ALICE_BLUE(){return new Color("#F0F8FF");}
    static get ANTIQUE_WHITE(){return new Color("#FAEBD7");}
    static get AQUA(){return new Color("#00FFFF");}
    static get AQUAMARINE(){return new Color("#7FFFD4");}
    static get AZURE(){return new Color("#F0FFFF");}
    static get BEIGE(){return new Color("#F5F5DC");}
    static get BISQUE(){return new Color("#FFE4C4");}
    static get BLACK(){return new Color("#000000");}
    static get BLANCHED_ALMOND(){return new Color("#FFEBCD");}
    static get BLUE(){return new Color("#0000FF");}
    static get BLUE_VIOLET(){return new Color("#8A2BE2");}
    static get BROWN(){return new Color("#A52A2A");}
    static get BURLY_WOOD(){return new Color("#DEB887");}
    static get CADET_BLUE(){return new Color("#5F9EA0");}
    static get CHARTREUSE(){return new Color("#7FFF00");}
    static get CHOCOLATE(){return new Color("#D2691E");}
    static get CORAL(){return new Color("#FF7F50");}
    static get CORNFLOWER_BLUE(){return new Color("#6495ED");}
    static get CORNSILK(){return new Color("#FFF8DC");}
    static get CRIMSON(){return new Color("#DC143C");}
    static get CYAN(){return new Color("#00FFFF");}
    static get DARK_BLUE(){return new Color("#00008B");}
    static get DARK_CYAN(){return new Color("#008B8B");}
    static get DARK_GOLDEN_ROD(){return new Color("#B8860B");}
    static get DARK_GRAY(){return new Color("#A9A9A9");}
    static get DARK_GREY(){return new Color("#A9A9A9");}
    static get DARK_GREEN(){return new Color("#006400");}
    static get DARK_KHAKI(){return new Color("#BDB76B");}
    static get DARK_MAGENTA(){return new Color("#8B008B");}
    static get DARK_OLIVE_GREEN(){return new Color("#556B2F");}
    static get DARKORANGE(){return new Color("#FF8C00");}
    static get DARK_ORCHID(){return new Color("#9932CC");}
    static get DARK_RED(){return new Color("#8B0000");}
    static get DARK_SALMON(){return new Color("#E9967A");}
    static get DARK_SEA_GREEN(){return new Color("#8FBC8F");}
    static get DARK_SLATE_BLUE(){return new Color("#483D8B");}
    static get DARK_SLATE_GRAY(){return new Color("#2F4F4F");}
    static get DARK_SLATE_GREY(){return new Color("#2F4F4F");}
    static get DARK_TURQUOISE(){return new Color("#00CED1");}
    static get DARK_VIOLET(){return new Color("#9400D3");}
    static get DEEP_PINK(){return new Color("#FF1493");}
    static get DEEP_SKY_BLUE(){return new Color("#00BFFF");}
    static get DIM_GRAY(){return new Color("#696969");}
    static get DIM_GREY(){return new Color("#696969");}
    static get DODGER_BLUE(){return new Color("#1E90FF");}
    static get FIRE_BRICK(){return new Color("#B22222");}
    static get FLORAL_WHITE(){return new Color("#FFFAF0");}
    static get FOREST_GREEN(){return new Color("#228B22");}
    static get FUCHSIA(){return new Color("#FF00FF");}
    static get GAINSBORO(){return new Color("#DCDCDC");}
    static get GHOST_WHITE(){return new Color("#F8F8FF");}
    static get GOLD(){return new Color("#FFD700");}
    static get GOLDEN_ROD(){return new Color("#DAA520");}
    static get GRAY(){return new Color("#808080");}
    static get GREY(){return new Color("#808080");}
    static get GREEN(){return new Color("#008000");}
    static get GREEN_YELLOW(){return new Color("#ADFF2F");}
    static get HONEY_DEW(){return new Color("#F0FFF0");}
    static get HOT_PINK(){return new Color("#FF69B4");}
    static get INDIAN_RED(){return new Color("#CD5C5C");}
    static get INDIGO(){return new Color("#4B0082");}
    static get IVORY(){return new Color("#FFFFF0");}
    static get KHAKI(){return new Color("#F0E68C");}
    static get LAVENDER(){return new Color("#E6E6FA");}
    static get LAVENDER_BLUSH(){return new Color("#FFF0F5");}
    static get LAWN_GREEN(){return new Color("#7CFC00");}
    static get LEMON_CHIFFON(){return new Color("#FFFACD");}
    static get LIGHT_BLUE(){return new Color("#ADD8E6");}
    static get LIGHT_CORAL(){return new Color("#F08080");}
    static get LIGHT_CYAN(){return new Color("#E0FFFF");}
    static get LIGHT_GOLDEN_ROD_YELLOW(){return new Color("#FAFAD2");}
    static get LIGHT_GRAY(){return new Color("#D3D3D3");}
    static get LIGHT_GREY(){return new Color("#D3D3D3");}
    static get LIGHT_GREEN(){return new Color("#90EE90");}
    static get LIGHT_PINK(){return new Color("#FFB6C1");}
    static get LIGHT_SALMON(){return new Color("#FFA07A");}
    static get LIGHT_SEA_GREEN(){return new Color("#20B2AA");}
    static get LIGHT_SKY_BLUE(){return new Color("#87CEFA");}
    static get LIGHT_SLATE_GRAY(){return new Color("#778899");}
    static get LIGHT_SLATE_GREY(){return new Color("#778899");}
    static get LIGHT_STEEL_BLUE(){return new Color("#B0C4DE");}
    static get LIGHT_YELLOW(){return new Color("#FFFFE0");}
    static get LIME(){return new Color("#00FF00");}
    static get LIME_GREEN(){return new Color("#32CD32");}
    static get LINEN(){return new Color("#FAF0E6");}
    static get MAGENTA(){return new Color("#FF00FF");}
    static get MAROON(){return new Color("#800000");}
    static get MEDIUM_AQUA_MARINE(){return new Color("#66CDAA");}
    static get MEDIUM_BLUE(){return new Color("#0000CD");}
    static get MEDIUM_ORCHID(){return new Color("#BA55D3");}
    static get MEDIUM_PURPLE(){return new Color("#9370D8");}
    static get MEDIUM_SEA_GREEN(){return new Color("#3CB371");}
    static get MEDIUM_SLATE_BLUE(){return new Color("#7B68EE");}
    static get MEDIUM_SPRING_GREEN(){return new Color("#00FA9A");}
    static get MEDIUM_TURQUOISE(){return new Color("#48D1CC");}
    static get MEDIUM_VIOLET_RED(){return new Color("#C71585");}
    static get MIDNIGHT_BLUE(){return new Color("#191970");}
    static get MINT_CREAM(){return new Color("#F5FFFA");}
    static get MISTY_ROSE(){return new Color("#FFE4E1");}
    static get MOCCASIN(){return new Color("#FFE4B5");}
    static get NAVAJO_WHITE(){return new Color("#FFDEAD");}
    static get NAVY(){return new Color("#000080");}
    static get OLD_LACE(){return new Color("#FDF5E6");}
    static get OLIVE(){return new Color("#808000");}
    static get OLIVE_DRAB(){return new Color("#6B8E23");}
    static get ORANGE(){return new Color("#FFA500");}
    static get ORANGE_RED(){return new Color("#FF4500");}
    static get ORCHID(){return new Color("#DA70D6");}
    static get PALE_GOLDEN_ROD(){return new Color("#EEE8AA");}
    static get PALE_GREEN(){return new Color("#98FB98");}
    static get PALE_TURQUOISE(){return new Color("#AFEEEE");}
    static get PALE_VIOLET_RED(){return new Color("#D87093");}
    static get PAPAYA_WHIP(){return new Color("#FFEFD5");}
    static get PEACH_PUFF(){return new Color("#FFDAB9");}
    static get PERU(){return new Color("#CD853F");}
    static get PINK(){return new Color("#FFC0CB");}
    static get PLUM(){return new Color("#DDA0DD");}
    static get POWDER_BLUE(){return new Color("#B0E0E6");}
    static get PURPLE(){return new Color("#800080");}
    static get RED(){return new Color("#FF0000");}
    static get ROSY_BROWN(){return new Color("#BC8F8F");}
    static get ROYAL_BLUE(){return new Color("#4169E1");}
    static get SADDLE_BROWN(){return new Color("#8B4513");}
    static get SALMON(){return new Color("#FA8072");}
    static get SANDY_BROWN(){return new Color("#F4A460");}
    static get SEA_GREEN(){return new Color("#2E8B57");}
    static get SEA_SHELL(){return new Color("#FFF5EE");}
    static get SIENNA(){return new Color("#A0522D");}
    static get SILVER(){return new Color("#C0C0C0");}
    static get SKY_BLUE(){return new Color("#87CEEB");}
    static get SLATE_BLUE(){return new Color("#6A5ACD");}
    static get SLATE_GRAY(){return new Color("#708090");}
    static get SLATE_GREY(){return new Color("#708090");}
    static get SNOW(){return new Color("#FFFAFA");}
    static get SPRING_GREEN(){return new Color("#00FF7F");}
    static get STEEL_BLUE(){return new Color("#4682B4");}
    static get TAN(){return new Color("#D2B48C");}
    static get TEAL(){return new Color("#008080");}
    static get THISTLE(){return new Color("#D8BFD8");}
    static get TOMATO(){return new Color("#FF6347");}
    static get TURQUOISE(){return new Color("#40E0D0");}
    static get VIOLET(){return new Color("#EE82EE");}
    static get WHEAT(){return new Color("#F5DEB3");}
    static get WHITE(){return new Color("#FFFFFF");}
    static get WHITE_SMOKE(){return new Color("#F5F5F5");}
    static get YELLOW(){return new Color("#FFFF00");}
    static get YELLOW_GREEN(){return new Color("#9ACD32");}
}
export class Style {
    static get DEFAULT(){return {
        fillStyle: Color.WHITE,
        strokeStyle: Color.BLACK,
        lineWidth: 1,
        lineWidth_text: 1,
        font: "10px sans-serif",
        textBaseline: Style.TextBaseline.ALPHABETIC,
        textAlign: Style.TextAlign.LEFT,
    }}

    constructor (styleObj, base = {}) {
        Object.assign(this, Style.DEFAULT, base,  styleObj);
    }
    applyTo(canvas){
        for (const prop in this) canvas[prop] = this[prop];
    }
    static TextBaseline = class {
        static get TOP(){return "top"};
        static get HANGING(){return "hanging"};
        static get MIDDLE(){return "middle"};
        static get ALPHABETIC(){return "alphabetic"};
        static get IDEOGRAPHIC(){return "ideographic"};
        static get BOTTOM(){return "bottom"};
    }
    static TextAlign = class {
        static get LEFT(){return "left"};
        static get RIGHT(){return "right"};
        static get CENTER(){return "center"};
        static get START(){return "start"};
        static get END(){return "end"};
    }
}