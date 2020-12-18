import { AllowedTypes, ProcessType } from './types';
import findMagnet from './Utils';

let data: string[] = [];

chrome.runtime.onMessage.addListener((request: ProcessType) => {
  switch (request.type) {
    case AllowedTypes.ANALYZE_DATA:
      //analyzes the DOM
      const foundData = findMagnet(request.payload);

      if (foundData && foundData?.length > 0) {
        chrome.runtime.sendMessage({ type: AllowedTypes.MAGNET_FOUND, payload: foundData });
        data = Array.from(new Set([...data, ...(foundData as [])]));

        chrome.tabs.query({ active: true, windowType: 'normal', currentWindow: true }, function (d) {
          const tabId = d[0].id;
          chrome.browserAction.setIcon({ path: 'icon128.png', tabId: tabId });
        });
      }
      break;
    case AllowedTypes.GET_DATA:
      chrome.runtime.sendMessage({ type: AllowedTypes.DATA_RETRIEVED, payload: data });
      break;
  }
});
