// // contentScript.js

// // Function to get inner text from the page
// function getInnerText() {
//   return { innerText: document.body.innerText };
// }

// // Send the inner text to the extension
// function sendInnerText() {
//   chrome.runtime.sendMessage({ action: 'getInnerText', innerText: getInnerText().innerText });
// }

// // Listen for messages from the extension
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'getInnerText') {
//     sendResponse(getInnerText());
//   }
// });

// // Listen for navigation events and re-inject the content script
// chrome.runtime.onConnect.addListener(function(port) {
//   if (port.name === 'content-script') {
//     // Execute the content script when a connection is established
//     sendInnerText();

//     // Listen for page load completion
//     chrome.webNavigation.onCompleted.addListener(function(details) {
//       if (details.tabId === port.sender.tab.id) {
//         // Execute the content script once again after the page is completely loaded
//         sendInnerText();
//       }
//     });
//   }
// });
// chrome.runtime.sendMessage({action: "contentScriptLoaded"}, function(response) {
//   var textContent = document.body.innerText || 'Unable to fetch content';
//   chrome.runtime.sendMessage({action: "extractText", data: textContent}, function(response) {
//      console.log(`Text content for Tab ID ${tabId}: ${textContent}`);
//   });
//  });



// function getText(){
//   return document.body.innerText
// }
// function getHTML(){
//   return document.body.outerHTML
// }
// console.log(getText());             //Gives you all the text on the page
// console.log(getHTML()); 