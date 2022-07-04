//chrome.storage.local.clear();

let data = {};
const ancherElementList = document.querySelectorAll('a');

//nullはすべて取得する
chrome.storage.local.get(null, function(result) {
  data = result;
  console.log(result);

  
  for (const key in data){
    if(data.hasOwnProperty(key)){
      console.log(key);
      const q = document.querySelector('a[href="' +  key + '" ]')
      console.log(q);
      if(q) {;
        q.style.transform = 'scale(' + Math.max(0 ,1/((data[key].count)*0.2+1)) + ')';
        q.style.display = 'inline-block';
        if(data[key].count > 7) {
          q.style.visibility = 'hidden';
        }
      } 
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

    console.log(data);

    chrome.storage.local.set(data, function () {
      console.log('Value is set to ' , data);
    });

    // ページ遷移の処理
    window.location.href = currentTarget;
    
  });
});

window.onpageshow = function(event) {
	if (event.persisted) {
		 window.location.reload();
	}
};
