// BBClip

var browser = browser || chrome;
browser.storage.local.get(null, function(items) {
    var menu = "<ul>";
    const keys = Object.keys(items).reverse();
    for (const key of keys) {
        // `keys.forEach()`
        menu += "<li><input type=\"text\" id=\"1\" value='" + items[key].name + "'>&nbsp; [rename][delete]</li><ul>";
        for (const [payload_key, payload_value] of Object.entries(items[key].payloads)) {
            // Object.entries(items[key].payloads).forEach()
            menu += "<li><input type=\"text\" id=\"1\" value='" + payload_key + "'>&nbsp; [rename][edit][delete]</li>";
        }
        menu += "</ul>";
    }
    console.log(menu);
    document.querySelector(".parent-menu").innerHTML = menu;

});

// document.addEventListener('DOMContentLoaded', restoreOptions);
// document.querySelector("form").addEventListener("submit", saveOptions);
