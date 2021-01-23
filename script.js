"use strict";
import {KeyboardUI} from './modules/KeyboardUI.js'
import { Vector2 } from './modules/Vector.js';
import {splitStr3Ways} from './modules/miscellaneousFunct.js';

const canvas = document.getElementById("canvas");
const textArea = document.getElementById("textArea");
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
        {label:"←", action:"__BACKSPACE__"},//v
        {label:"TAB ⭾", action:"__TAB__"},
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
        {label: ["CAPS", "LOCK"], action:"__CAPSLOCK__"},
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
        {label:["ENTER","⏎"], action:"__ENTER__"},
        {label:"SHIFT", action:"__SHIFT__"},
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
        {label:"SHIFT", action:"__SHIFT__"},
        {label:"CTRL", action:"__CTRL__"},
        {label:"WIN", action:"__WIN__"},
        {label:"ALT", action:"__ALT__"},
        {label:"SPACE", action:"__SPACE__"},
        {label:"ALT", action:"__ALT__"},
        {label:"WIN", action:"__WIN__"},
        {label:"☰"},
        {label:"CTRL",action:"__CTRL__"},
        
    ]
}

let layout = {"Escape":{"y":47,"x":19},"F1":{"y":47,"x":48},"F2":{"y":47,"x":71},"F3":{"y":48,"x":100},"F4":{"y":48,"x":119},"F5":{"y":48,"x":147},"F6":{"y":47,"x":172},"F7":{"y":47,"x":198},"F8":{"y":46,"x":222},"F9":{"y":47,"x":247},"F10":{"y":47,"x":271},"F11":{"y":47,"x":297},"F12":{"y":46,"x":323},"Insert":{"y":47,"x":349},"Delete":{"y":47,"x":373},"Home":{"y":48,"x":403},"End":{"y":48,"x":429},"PageUp":{"y":47,"x":452},"PageDown":{"y":46,"x":476},"Backquote":{"y":68,"x":20},"Digit1":{"y":68,"x":47},"Digit2":{"y":68,"x":71},"Digit3":{"y":67,"x":96},"Digit4":{"y":67,"x":120},"Digit5":{"y":68,"x":146},"Digit6":{"y":70,"x":173},"Digit7":{"y":70,"x":198},"Digit8":{"y":68,"x":220},"Digit9":{"y":69,"x":246},"Digit0":{"y":69,"x":272},"Minus":{"y":67,"x":298},"Equal":{"y":70,"x":324},"Backspace":{"y":70,"x":360},"NumLock":{"y":69,"x":404},"NumpadDivide":{"y":70,"x":429},"NumpadMultiply":{"y":69,"x":451},"NumpadSubtract":{"y":70,"x":480},"Tab":{"y":96,"x":24},"KeyQ":{"y":94,"x":57},"KeyW":{"y":92,"x":83},"KeyE":{"y":96,"x":110},"KeyR":{"y":96,"x":133},"KeyT":{"y":94,"x":159},"KeyY":{"y":93,"x":187},"KeyU":{"y":93,"x":209},"KeyI":{"y":94,"x":234},"KeyO":{"y":93,"x":259},"KeyP":{"y":94,"x":283},"BracketLeft":{"y":97,"x":311},"BracketRight":{"y":94,"x":331},"Backslash":{"y":94,"x":366},"Numpad7":{"y":94,"x":404},"Numpad8":{"y":94,"x":429},"Numpad9":{"y":93,"x":452},"NumpadAdd":{"y":106,"x":479},"CapsLock":{"y":120,"x":28},"KeyA":{"y":119,"x":64},"KeyS":{"y":119,"x":89},"KeyD":{"y":120,"x":116},"KeyF":{"y":120,"x":140},"KeyG":{"y":119,"x":167},"KeyH":{"y":120,"x":192},"KeyJ":{"y":120,"x":216},"KeyK":{"y":120,"x":239},"KeyL":{"y":121,"x":264},"Semicolon":{"y":118,"x":291},"Quote":{"y":119,"x":314},"Enter":{"y":120,"x":354},"Numpad4":{"y":117,"x":403},"Numpad5":{"y":121,"x":427},"Numpad6":{"y":119,"x":452},"ShiftLeft":{"y":144,"x":36},"KeyZ":{"y":143,"x":78},"KeyX":{"y":143,"x":101},"KeyC":{"y":143,"x":129},"KeyV":{"y":143,"x":153},"KeyB":{"y":146,"x":177},"KeyN":{"y":146,"x":201},"KeyM":{"y":146,"x":228},"Comma":{"y":146,"x":253},"Period":{"y":147,"x":279},"Slash":{"y":147,"x":306},"ShiftRight":{"y":146,"x":349},"Numpad1":{"y":146,"x":403},"Numpad2":{"y":143,"x":428},"Numpad3":{"y":144,"x":456},"NumpadEnter":{"y":154,"x":478},"ControlLeft":{"y":171,"x":27},"MetaLeft":{"y":170,"x":64},"AltLeft":{"y":169,"x":89},"Space":{"y":171,"x":173},"AltRight":{"y":171,"x":256},"ControlRight":{"y":169,"x":304},"ArrowLeft":{"y":183,"x":329},"ArrowDown":{"y":183,"x":354},"ArrowRight":{"y":182,"x":378},"ArrowUp":{"y":164,"x":353},"Numpad0":{"y":169,"x":420},"NumpadDecimal":{"y":169,"x":452}};
let lastKeyCode = "";
let lastKeyCoord = Vector2.NULL;
let lastTimeout = null;


document.addEventListener("keydown", (event)=>{
    window.clearTimeout(lastTimeout);

    var keyCoord = new Vector2(layout[event.code]);
    if (lastKeyCoord.x !== null){ 
        let delta = keyCoord.sub(lastKeyCoord);
        if (delta.magnitude > 45) delta = Vector2.ZERO;
        keyboardUI.cursor.pos = keyboardUI.cursor.pos.add(delta.mult(.75));
    }
    lastKeyCoord = keyCoord;
    lastTimeout = window.setTimeout(_=>sendKey(keyboardUI.getKeyAtCursor().getAction(false), textArea), 2000);

    event.preventDefault();
});
function typeText(text, element) {
    let [start, ,end] = splitStr3Ways(element.value, element.selectionStart, element.selectionEnd);
    element.value = start+text+end;
}

function sendKey(key, element){
    switch(key) {
        case "__TAB__":
            typeText('\t', element);
            break;
        case "__ENTER__":
            typeText('\n', element);
            break;
        case "__SPACE__":
            typeText(' ', element);
            break;
        case "__BACKSPACE__":
        case "__CAPSLOCK__":
        case "__SHIFT__":
            // TODO: this.
            break;
        case "__CTRL__":
        case "__WIN__":
        case "__ALT__":
            /*How da fuck do I implement this?*/
            break;
        default:
            typeText(key, element);   
    }
}

window.sendKey = sendKey;
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