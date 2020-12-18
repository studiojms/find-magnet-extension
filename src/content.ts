import { AllowedTypes, ProcessType } from './types';

chrome.runtime.onMessage.addListener((message: ProcessType) => {
  switch (message.type) {
    case AllowedTypes.RETRIEVE_DATA:
      //asks background script to retrieve data
      chrome.runtime.sendMessage({ type: AllowedTypes.GET_DATA, payload: message.payload });
      break;
  }
});

const content = document.querySelectorAll('*');
const len = content.length;
for (let i = 0; i < len; i++) {
  const element = content[i];
  chrome.runtime.sendMessage({ type: AllowedTypes.ANALYZE_DATA, payload: element.innerHTML });
}
