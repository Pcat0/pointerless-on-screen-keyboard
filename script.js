"use strict";
import {KeyboardUI} from './modules/KeyboardUI.js'

const out = document.getElementById("keycode");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const keyboardLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
    [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [1.5, 1, 1.25, 6.5, 1.25, 1, 1, 1.5]
]


function init(){
    ctx.translate(10,10);
    const keyboardUI = new KeyboardUI(keyboardLayout, ctx);
    keyboardUI.draw();
    
    window.keyboardUI = keyboardUI;
    window.ctx = ctx;
}
init();