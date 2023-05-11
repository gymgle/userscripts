// ==UserScript==
// @name         Show Webpage IP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show the IP address of the current webpage
// @author       Gymgle
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function showRemoteIP(ip) {
        const el = document.createElement("div");
        el.id = "show-ip";
        el.textContent = ip;
        GM_addStyle("#show-ip { position: fixed; font-size: 12px; margin: 5px; bottom: 0px; right: 0; background: rgba(0, 0, 0, 0.5); color: #fff; padding: 2px 5px; border-radius: 2px; z-index: 9999 }");
        document.body.appendChild(el);

        el.addEventListener('mouseover', function() {
            const currentLeft = el.style.left;
            el.style.left = currentLeft === "0px" ? "auto" : "0px";
            el.style.right = currentLeft === "0px" ? "0px" : "auto";
        });
    }

    function getWebpageIP() {
        const currentUrl = window.location.href;
        const hostname = currentUrl.match(/:\/\/(www\.)?(.[^/:]+)/i)[2];

        fetch(`https://dns.google/resolve?name=${hostname}&type=A`)
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.Answer[0].data;
                console.log("IP Address:", ipAddress);
                showRemoteIP(ipAddress)
            })
            .catch(error => {
                showRemoteIP(hostname)
            });
    }

    // Run the function to get the IP address
    getWebpageIP();
})();
