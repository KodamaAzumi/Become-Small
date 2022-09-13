//chrome.storage.local.clear();

let data = {};

// nullはすべて取得する
chrome.storage.local.get(null, (result) => {
  data = result;
  console.log(result);

  for (const key in data){
    if(data.hasOwnProperty(key)){
      console.log(key);
      const keyElm = document.querySelector('a[href="' +  key + '" ]')
      console.log(keyElm);
      if(keyElm) {;
        keyElm.style.transform = 'scale(' + Math.max(0 ,1/((data[key].count)*0.2+1)) + ')';
        keyElm.style.display = 'inline-block';
        if(data[key].count > 7) {
          q.style.visibility = 'hidden';
        }
      } 
    }
  }
});

const ancherElementList = document.querySelectorAll('a:not([href=""]');

ancherElementList.forEach((ancherElement) => {
  ancherElement.addEventListener('click', (e) => {
    
    const { currentTarget } = e;
    console.log(currentTarget.outerHTML);
    console.log(currentTarget);

    // clickしたサイトのURLを取得
    const url = currentTarget.href;
    console.log(url);

     // ページ遷移の処理を中断
     e.preventDefault();
  
    // もしdataの中にurlが無かったらクリックしたサイトのurlを追加
    if(data.hasOwnProperty(url)){
      data[url].count += 1;
    } else {
      data[url] = {};
      data[url].count = 1;
    }

    console.log(data);

    chrome.storage.local.set(data, () => {
      console.log('Value is set to ' , data);
    });

    // ページ遷移の処理
    if(url.indexOf('http') === 0){
      window.location.href = currentTarget;
    }
  });
});

window.onpageshow = (event) => {
	if (event.persisted) {
		 window.location.reload();
	}
};
