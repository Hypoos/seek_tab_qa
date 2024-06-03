document.addEventListener('DOMContentLoaded', function () {
  var tabList = document.getElementById('tabList');
  var runButton = document.getElementById('runButton');
  var askQuestionButton = document.getElementById('askQuestion');
  var questionInput = document.getElementById('questionInput');
  var responseDiv = document.getElementById('response');
  var selectedTabs = [];

  function sendToBackend(data, endpoint, callback) {
      fetch(`http://localhost:5000/${endpoint}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          callback(data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  function parseSelectedTabs(tabIds) {
      tabIds.forEach(function (tabId) {
          chrome.scripting.executeScript(
              {
                  target: { tabId: tabId },
                  func: () => document.body.textContent
              },
              (results) => {
                  if (results && results.length > 0) {
                      let textContent = results[0].result;
                      console.log(`Text content for Tab ID ${tabId}: ${textContent.length} characters`);
                      sendToBackend({ tabId: tabId, text: textContent }, 'store_text', (data) => {
                          console.log(`Text stored for Tab ID ${tabId}`);
                      });
                  } else {
                      console.log(`Unable to fetch content for Tab ID ${tabId}`);
                  }
              }
          );
      });
  }

  runButton.addEventListener('click', function () {
      parseSelectedTabs(selectedTabs);
  });

  askQuestionButton.addEventListener('click', function () {
      const question = questionInput.value;
      if (question) {
          sendToBackend({ question: question }, 'query_vector_store', (data) => {
              responseDiv.textContent = data.response;
          });
      }
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
