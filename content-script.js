//chrome.storage.local.clear();

let data = {};
const ancherElementList = document.querySelectorAll('a');

//nullはすべて取得する
chrome.storage.local.get(null, function(result) {
  data = result;
  console.log(result);

  for (const key in data){
    console.log(key);
    const q = document.querySelector('a[href="' +  key + '" ]')
    console.log(q);
    if(q) {
      q.style.transform = 'scale(' + Math.max(0 ,1/((data[key].count)*0.2+1)) + ')';
      q.style.display = 'inline-block';
    }
  }
});

ancherElementList.forEach((ancherElement) => {
  ancherElement.addEventListener('click', (e) => {
    
    const { currentTarget } = e;
    console.log(currentTarget.outerHTML);
    console.log(currentTarget);

    //clickしたサイトのURLを取得
    const url =currentTarget.href;
    console.log(url);

     // ページ遷移の処理を中断
     e.preventDefault();

    //もしdataの中にurlが無かったらクリックしたサイトのurlを追加
    if(data.hasOwnProperty(url)){
      data[url].count += 1;
    } else {
      data[url] = {};
      data[url].count = 1;
    }

    /*

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

    */

    console.log(data);

    chrome.storage.local.set(data, function () {
      console.log('Value is set to ' , data);
      // ページ遷移の処理を中断
      e.preventDefault();
    });

    // ページ遷移の処理
    window.location.href = currentTarget;
    
  });
});