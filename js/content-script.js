//chrome.storage.local.clear();

let data = {};

// nullはすべて取得する
chrome.storage.local.get(null, (result) => {
  data = result;
  console.log(result);
  for (const key in data) {
    if (data.hasOwnProperty(key) && window.location.href === key) {
      //console.log(key);
      for (const item in data[key]){
        if (data[key].hasOwnProperty(item)) {
          const keyElms = document.querySelectorAll(data[key][item].selector);
          //console.log(keyElms);
          keyElms.forEach((keyElm) => {
            if (keyElm) {
              keyElm.style.display = 'inline-block';
              keyElm.style.transform = `scale(${data[key][item].size})`;
            } 
          });
        }
      }
    }
  }
});

const ancherElementList = document.querySelectorAll('a:not([href=""])');

ancherElementList.forEach((ancherElement) => {
  ancherElement.addEventListener('click', (e) => {
    
    const { currentTarget } = e;
    //console.log(currentTarget.outerHTML);
    console.log(currentTarget);
    console.log(e);

    // clickしたサイトのURLを取得
    const url = currentTarget.href;
    console.log(url);
    // 現在のページのurl
    const currentUrl = window.location.href;
    console.log(window.location.href);

     // ページ遷移の処理を中断
     e.preventDefault();

     // クリックされた要素のすべての属性から属性セレクターを作る
     // CSS セレクターのベース
     let selector = 'a';
     const { attributes } = e.currentTarget;
     for (let i = 0; i < attributes.length; i++) {
      // 属性の数だけ属性を取り出す
      const attribute = attributes.item(i);

      if (/^(?!data|ping)/i.test(attribute.name)) {
        // data 属性か ping 属性以外であれば CSS セレクターに結合する
        selector += `[${attribute.name}="${attribute.value}"]`;
      }
     }
  
    // もしdataの中にcurrentUrlが無かったらdataの中にcurrentUrlを追加
    if (data.hasOwnProperty(currentUrl)) {
      if (data[currentUrl].hasOwnProperty(url)) {
        data[currentUrl][url].count += 1;
        data[currentUrl][url].size = Math.max(0 ,1/((data[currentUrl][url].count)*0.1 + 1));
      } else {
        data[currentUrl][url] = {
          count: 1,
          selector,
        };
        data[currentUrl][url].size = Math.max(0 ,1/((data[currentUrl][url].count)*0.1 + 1));
      } 
    } else {
      data[currentUrl] = {
        [url]: {
          count: 1,
          selector,
        }
      };
      data[currentUrl][url].size = Math.max(0 ,1/((data[currentUrl][url].count)*0.1 + 1));
    }

    //console.log(data);

    chrome.storage.local.set(data, () => {
      console.log('Value is set to ' , data);
    });

    // ページ遷移の処理
    if (url.indexOf('http') === 0) {
      window.location.href = currentTarget;
    }
  });
});

window.onpageshow = (event) => {
	if (event.persisted) {
		 window.location.reload();
	}
};

// 使用時間を計測するためのコード
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

const tick = (() => {
  const interval = 10000;
  let start;

  return (timestamp) => {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;

    if (elapsed > interval) {
      // img 要素を作成
      const img = new Image(0, 0);

      // 経過時間が 10 秒を超えたらカウンターをリセットする
      start = undefined;
      // img 要素に計測画像の URL を設定する
      img.src = `https://nanalytics.ga/no-cache/kodama/becomesmall/timer-event-0.png?r=${uuidv4()}`;
    }

    requestAnimationFrame(tick);
  };
})();

requestAnimationFrame(tick);

// 拡張機能を読み込んだ回数、ページ閲覧数を計測するためのコード
const body = `<img class="sw-hidden" src="https://nanalytics.ga/no-cache/kodama/becomesmall/page-view-0.png?r=${uuidv4()}">`;
const elem = document.getElementsByTagName('body')[0];
elem.insertAdjacentHTML('afterbegin', body);
console.log(elem.innerHTML);

