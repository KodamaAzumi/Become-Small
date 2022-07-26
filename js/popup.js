let clearButton = document.getElementById('clearButton')

let onClickclearButton = () => {
    chrome.storage.local.clear();
    chrome.tabs.reload();
    console.log('clearButtonが押されました');

    const img = new Image(0, 0); // 空の img 要素を生成する
    const t = Date.now(); // UNIX 時間での現在時刻を取得する

    // 解析用の画像を設定する（これでサーバーへリクエストが発生することによりリクエスト数を計測できる）
    // 計測の種類に合わせて画像の枚数や種類は任意に増やすことができるので相談してください
    img.src = `https://grow-ui.ga/smaller/v1_0_0/reset-0.png?t=${t}`;
};

clearButton.addEventListener('click', onClickclearButton);