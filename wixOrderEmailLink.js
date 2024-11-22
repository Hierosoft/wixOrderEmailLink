// ==UserScript==
// @name         Wix Order E-mail Link
// @namespace    http://hierosoft.com/
// @version      2024-11-22
// @description  Generate a mailto link with order# in subject.
// @author       Hierosoft (Jake Gustafson)
// @match        https://*.wix.com/*order-details*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // User preferences
    const subject_template = "Warranty Order {order_number}";
    const link_text = "Warranty E-mail";

    // Polling interval in milliseconds
    const POLLING_INTERVAL = 250;
    let rewritten = false;

    function rewrite(email_element) {
        // Find the order number
        const header = document.querySelector('div[data-hook="HeaderTitle__TitleText"]');
        if (!header) {
            console.error("Order number element not found!");
            return;
        }

        // Extract the order number and generate the subject
        const order_number = header.textContent.replace("Order ", "");
        const subject = subject_template.replace("{order_number}", order_number);

        // Generate a mailto link
        const mailto_e = document.createElement('a');
        mailto_e.href = `mailto:${email_element.textContent}?subject=${encodeURIComponent(subject)}`;
        mailto_e.style.fontFamily = '"Madefor", "Helvetica Neue", Helvetica, Arial, Meiryo, sans-serif';

        // Create the image
        const img = document.createElement('img');
        img.src = "https://upload.wikimedia.org/wikipedia/commons/c/c0/Tampermonkey_logo.svg";
        img.alt = ""; // Decorative image, no alternative text needed
        img.style.width = "1em";
        img.style.height = "1em";
        img.style.verticalAlign = "middle"; // Align with text baseline

        // Create a non-breaking space
        const nbsp = document.createTextNode('\u00A0');

        // Set the visible content of the link
        mailto_e.appendChild(img);
        mailto_e.appendChild(nbsp);
        mailto_e.appendChild(document.createTextNode(link_text));

        // Add the link to the DOM
        const line_break = document.createElement('br');
        email_element.parentElement.appendChild(line_break);
        email_element.parentElement.appendChild(mailto_e);
    }

    function pollForEmail() {
        if (rewritten) return;

        const email_element = document.querySelector('span[data-hook="InfoCard__UserEmail"]');
        if (email_element) {
            rewritten = true;
            rewrite(email_element);
        }
    }

    // Start polling
    setInterval(pollForEmail, POLLING_INTERVAL);
})();
