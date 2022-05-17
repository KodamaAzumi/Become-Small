const ancherElementList = document.querySelectorAll('a');

ancherElementList.forEach((ancherElement) => {
  ancherElement.addEventListener('click', (e) => {
    
    const { currentTarget } = e;

    console.log(currentTarget.outerHTML);
    console.log(currentTarget);

    currentTarget.style.transform = 'scale(0.5)';
    currentTarget.style.display = 'inline-block';

    if(let num)
    let num = {key1 : 1};
    chrome.storage.local.set(num, function() {
      console.log('Value is set to ' + num.key1);
    });
       
    /*
    // 押した回数を保存
    if(num.key1 < 1){
      num.key1 = num.key1 + 1;
    }
    chrome.storage.local.set(num, function() {
      console.log('Value is set to ' + num.key1);
    });

     //一回以上押している場合に回数を追加
     if(num.key1 > 0){
      chrome.storage.local.get(num, function(result) {
        num.key1 = result.key1 + 1;
        console.log(result);
        console.log('Value currently is ' + num.key1);
        });
    }
    */

    // 押した回数に変更があったときにさらに小さくする
    /*
    chrome.storage.onChanged.addListener(changes => {

    });
    */

    // ページ遷移の処理を中断
    e.preventDefault();

    // ページ遷移の処理
    //window.location.href = currentTarget;
    
  });
});