chrome.storage.local.clear();

let data = {};
const ancherElementList = document.querySelectorAll('a');

//nullはすべて取得する
chrome.storage.local.get(null, function(result) {
  data = result;
  
  console.log(data);
});

ancherElementList.forEach((ancherElement) => {
  ancherElement.addEventListener('click', (e) => {
    
    const { currentTarget } = e;
    console.log(currentTarget.outerHTML);
    console.log(currentTarget);

    //clickしたサイトのURLを取得
    const url =currentTarget.href;
    
    //ランダムな三桁の文字列を生成
    let l = 3;
    let c = '0123456789';
    let cl = c.length;
    let r = '';
    for(let i = 0; i < l; i++){
      r += c[Math.floor(Math.random()*cl)];
    };

    //kから始まるidを作成
    const idk = 'k' + r;
    console.log(idk);

    //もしdata.idkが無かったらcurrentTargetにidを追加＆data.idkを作成
    if(typeof data.idk === 'undefined'){
      currentTarget.setAttribute('id', idk);
      data.idk = idk;
    } 

    //もしdata.idの中にurlが無かったらクリックしたサイトのurlを追加
    if(data.idk.hasOwnProperty('url')){
    } else {
      data.idk.url = url;
      console.log(url);
    }

    currentTarget.style.transform = 'scale(0.5)';
    currentTarget.style.display = 'inline-block';

    //cから始まるidを作成
    const idc = 'c' + r;
    console.log(idc);

    if (data.hasOwnProperty('count')) {
      data.count += 1;
    } else {
      data.count = 0;
    }

    console.log(data);

    chrome.storage.local.set(data, function () {
      console.log('Value is set to ' + data);
    });

    // ページ遷移の処理を中断
    e.preventDefault();

    // ページ遷移の処理
    //window.location.href = currentTarget;
    
  });
});