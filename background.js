// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { VectorDBQAChain } from "langchain/chains";
// import { HNSWLib } from "langchain/vectorstores/hnswlib";
// import { OpenAI } from "langchain/llms/openai";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "contentScriptLoaded") {
//      chrome.tabs.executeScript(sender.tab.id, {file: "contentScript.js"});
//   } else if (request.action === "extractText") {
//     chrome.storage.sync.set({ ["tab_" + request.tabId]: request.data }, function() {
//       // prepareData(request.data)
//     });
  
//      // Note: You would typically want to associate this text with the tab ID
//      // and perhaps keep track of whether this is the last tab to respond
//   }
// });
 

// const prepareData = async (textContent) => {
//   const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
//   const docs = await textSplitter.createDocuments([textContent]);
//   const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
//   return vectorStore;
// };

// const model = new OpenAI();
// const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
//   returnSourceDocuments: true,
// });

// const res = await chain.invoke({ question: 'Your question here' });
// console.log(res);

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installée et prête à être utilisée !");
  });
  