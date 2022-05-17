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
    console.log(url);

    currentTarget.style.transform = 'scale(0.5)';
    currentTarget.style.display = 'inline-block';
    
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

    //もしdata[idk]が無かったらcurrentTargetにidを追加＆data[idk]を作成
    if(typeof data[idk] === 'undefined'){
      currentTarget.setAttribute('id', idk);
      data[idk] = {};
    } 

    console.log(data[idk]);

    //もしdata[idk]の中にurlが無かったらクリックしたサイトのurlを追加
    if(data[idk].hasOwnProperty('url')){
    } else {
      data[idk].url = url;
    }

    //もしdata[idk]の中にclickDataが無かったらclickDataを追加
    if(data[idk].hasOwnProperty('clickData')){
    } else {
      data[idk].clickData = {};
    }

    //cから始まるidを作成
    const idc = 'c' + r;
    console.log(idc);

    // ページ遷移の処理を中断
    e.preventDefault();

     console.log(data[idk].clickData);

    if(typeof data[idk].clickData[idc] === 'undefined'){
      currentTarget.setAttribute('class', idc);
      data[idk].clickData[idc] = {};
    }

    if (data[idk].clickData[idc].hasOwnProperty('count')) {
      data[idk].clickData[idc].count += 1;
    } else {
      data[idk].clickData[idc].count = 0;
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