# Training Disclosure for wixOrderEmailLink
This Training Disclosure, which may be more specifically titled above here (and in this document possibly referred to as "this disclosure"), is based on **Training Disclosure version 1.1.4** at https://github.com/Hierosoft/training-disclosure by Jake Gustafson. Jake Gustafson is probably *not* an author of the project unless listed as a project author, nor necessarily the disclosure editor(s) of this copy of the disclosure unless this copy is the original which among other places I, Jake Gustafson, state IANAL. The original disclosure is released under the [CC0](https://creativecommons.org/public-domain/cc0/) license, but regarding any text that differs from the original:

This disclosure also functions as a claim of copyright to the scope described in the paragraph below since potentially in some jurisdictions output not of direct human origin, by certain means of generation at least, may not be copyrightable (again, IANAL):

Various author(s) may make claims of authorship to content in the project not mentioned in this disclosure, which this disclosure by way of omission unless stated elsewhere implies is of direct human origin unless stated elsewhere. Such statements elsewhere are present and complete if applicable to the best of the disclosure editor(s) ability. Additionally, the project author(s) hereby claim copyright and claim direct human origin to any and all content in the subsections of this disclosure itself, where scope is defined to the best of the ability of the disclosure editor(s), including the subsection names themselves, unless where stated, and unless implied such as by context, being copyrighted or trademarked elsewhere, or other means of statement or implication according to law in applicable jurisdiction(s).

Disclosure editor(s): Hierosoft LLC

Project author: Hierosoft LLC

This disclosure is a voluntary of how and where content in or used by this project was produced by LLM(s) or any tools that are "trained" in any way.

The main section of this disclosure lists such tools. For each, the version, install location, and a scope of their training sources in a way that is specific as possible.

Subsections of this disclosure contain prompts used to generate content, in a way that is complete to the best ability of the disclosure editor(s).

tool(s) used:
- GPT-4-Turbo (Version 4o, chatgpt.com)

Scope of use: code described in subsections--typically modified by hand to improve logic, variable naming, integration, etc, but in this commit, unmodified.

## wixOrderEmailLink.js
- 2024-11-22

Write a greasemonkey script starting with 
```
// ==UserScript==
// @name         Wix Order E-mail Link
// @namespace    http://hierosoft.com/
// @version      2024-11-22
// @description  Generate a mailto link with order# in subject.
// @author       Hierosoft (Jake Gustafson)
// @match      https://*.wix.com/*order-details*
// @grant        none
// @run-at          document-end
// ==/UserScript==

(function() {
  'use strict';
```
. There is a variable called subject_template = "Warranty Order {order_number}" and link_text = "Warranty E-mail" so the user can set those as a preference. It polls every 250ms with a function that finds a span with data-hook="InfoCard__UserEmail". If found, it first checks a rewritten boolean in an outer scope, and if true, does nothing. If not true yet, set true, and continue by calling a rewrite function. It accepts the email_element as an argument. First, look for a div with data-hook="HeaderTitle__TitleText", and store the text content string in a variable called order_number. In order_number, replace "Order " with "". Set a local variable subject to subject_template with "{order_number}" replaced with the value of the order_number variable. Generate a new a element named mailto_e that is a tag that is a mailto link. The link encodes a TO field and SUBJECT field. The TO field is the text content of email_element, and the subject line is the subject variable. The visible content of the 'a' tag is link_text. add a new "<br/>" element and mailto_e to the parent of email_element.

set a font (and fallback fonts list) for the mailto_e something like this but simplify it without using var etc: font-family:

- pasted Wix font and fallback list from css

Add this picture https://upload.wikimedia.org/wikipedia/commons/c/c0/Tampermonkey_logo.svg then nbsp; before the text in the mailto_e. Make the image 1em in size.
