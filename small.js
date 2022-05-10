'use script';

//tab上の情報を取得　chrome.tab.guery()
//前回保存した内容を取得＆使用 chrome.storage

//tab上のaタグをclickしたら処理が始まる
let buttom = document.getElementById('small');
small.addEventListener('click', () => {
    let link = document.getElementsByTagName('a').href
    console.log(link);
    console.log('クリックされた')
});

//clickしたaタグのpaddingを小さくする chrome.scripting
/*
let becomesmall = () =>{
    if(padding_px >= 1){
        padding_px = padding_px - 5
    }
    document.body.style.padding = padding_px + 'px'
}
*/

//ページが推移しても、内容を保存 chrome.storage

// 拡張機能をオフにしたとき内容を消去 ?