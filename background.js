function handleClick() {
    var browser = browser || chrome;
    browser.runtime.openOptionsPage();
}
var browser = browser || chrome;
browser.browserAction.onClicked.addListener(handleClick);
