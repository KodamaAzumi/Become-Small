'use script';
let buttonElement = document.getElementById('button');
let kimetu = () => {
    document.body.innerHTML=document.body.innerHTML.replace(/鬼滅の刃/g, 'ボボボーボ・ボーボボ');
};

window.addEventListener('DOMContentLoaded', ()=>{
    buttonElement.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target : {tabId: tabs[0].id},
                func : kimetu,
            });
        }); 
    });
});