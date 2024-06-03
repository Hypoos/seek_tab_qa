
// VERSION 2 - ###########################################################################################
document.addEventListener('DOMContentLoaded', function () {
    var tabList = document.getElementById('tabList');
    var runButton = document.getElementById('runButton');
    var selectedTabs = [];
  
    // Function to parse text content from selected tabs
    function parseSelectedTabs(tabIds) {
      tabIds.forEach(function (tabId) {
        var textContent = document.body.innerText || 'Unable to fetch content';
      });
    }
  
    // Run button click event
    runButton.addEventListener('click', function () {
      parseSelectedTabs(selectedTabs);
    });
  
    chrome.tabs.query({ currentWindow: true, highlighted: true }, function (tabs) {
      tabs.forEach(function (tab) {
        var listItem = document.createElement('li');
        listItem.textContent = tab.title;
        selectedTabs.push(tab.id);
        tabList.appendChild(listItem);
      });
    });
  });

// VERSION 1 - ###########################################################################################
  document.addEventListener('DOMContentLoaded', function () {
    var tabList = document.getElementById('tabList');
    var runButton = document.getElementById('runButton');
    var selectedTabs = [];
  
    // Function to parse text content from selected tabs
    function parseSelectedTabs(tabIds) {
      tabIds.forEach(function (tabId) {
        chrome.tabs.sendMessage(tabId, { action: 'getInnerText' }, function (response) {
          var textContent = response ? document.body.innerText : 'Unable to fetch content';
          console.log(`Text content for Tab ID ${tabId}: ${textContent}`);
        });
      });
    }
  
    // Run button click event
    runButton.addEventListener('click', function () {
      parseSelectedTabs(selectedTabs);
    });
  
    chrome.tabs.query({ currentWindow: true, highlighted: true }, function (tabs) {
      tabs.forEach(function (tab) {
        var listItem = document.createElement('li');
        listItem.textContent = tab.title;
        selectedTabs.push(tab.id);
        tabList.appendChild(listItem);
      });
    });
  });
  