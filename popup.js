let clearButton = document.getElementById('clearButton')

let onClickclearButton = () => {
    chrome.storage.local.clear();
    window.location.reload();
    console.log('clearButtonが押されました');
};

clearButton.addEventListener('click', onClickclearButton);