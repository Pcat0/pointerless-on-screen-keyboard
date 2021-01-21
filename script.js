"use strict";
import {KeyboardUI} from './modules/KeyboardUI.js'

const out = document.getElementById("keycode");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const keyboardLayout = {
    grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
        [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [1.5, 1, 1.25, 6.5, 1.25, 1, 1, 1.5]
    ],
    keyProps:[
        {upper:"~", lower:"`"},
        {upper:"!", lower:"1"},
        {upper:"@", lower:"2"},
        {upper:"#", lower:"3"},
        {upper:"$", lower:"4"},
        {upper:"%", lower:"5"},
        {upper:"^", lower:"6"},
        {upper:"&", lower:"7"},
        {upper:"*", lower:"8"},
        {upper:"(", lower:"9"},
        {upper:")", lower:"0"},
        {upper:"_", lower:"-"},
        {upper:"+", lower:"="},
        {label:"←"},
        {label:"Tab"},
        {key:"q"},
        {key:"w"},
        {key:"e"},
        {key:"r"},
        {key:"t"},
        {key:"y"},
        {key:"u"},
        {key:"i"},
        {key:"o"},
        {key:"p"},
        {upper:"{", lower:"["},
        {upper:"}", lower:"]"},
        {upper:"|", lower:"\\"},
        {label: ["CAPS", "LOCK"]},
        {key:"a"},
        {key:"s"},
        {key:"d"},
        {key:"f"},
        {key:"g"},
        {key:"h"},
        {key:"j"},
        {key:"k"},
        {key:"l"},
        {upper:":", lower:";"},
        {upper:"\"", lower:"'"},
        {label:"ENTER"},
        {label:"SHIFT"},
        {key:"z"},
        {key:"x"},
        {key:"c"},
        {key:"v"},
        {key:"b"},
        {key:"n"},
        {key:"m"},
        {upper:"<", lower:","},
        {upper:">", lower:"."},
        {upper:"?", lower:"/"},
        {label:"SHIFT"},
        {label:"CTRL"},
        {label:"WIN"},
        {label:"ALT"},
        {label:"SPACE"},
        {label:"ALT"},
        {label:"WIN"},
        {label:""},
        {label:"CTRL"}        
    ]
}


function init(){
    ctx.translate(10,10);
    const keyboardUI = new KeyboardUI(keyboardLayout, ctx);
    window.requestAnimationFrame(function draw() {
        keyboardUI.draw();
        window.requestAnimationFrame(draw);
    })
    keyboardUI.draw();
    
    window.keyboardUI = keyboardUI;
    window.ctx = ctx;
}
init();