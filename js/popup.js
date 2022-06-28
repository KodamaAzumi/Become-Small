let clearButton = document.getElementById('clearButton')

let onClickclearButton = () => {
    chrome.storage.local.clear();
    chrome.tabs.reload();
    console.log('clearButtonが押されました');
};

clearButton.addEventListener('click', onClickclearButton);