import { FC, useEffect, useState } from 'react';
import { MagnetData, magnetDecode, magnetEncode } from '@ctrl/magnet-link';

import { AllowedTypes, ProcessType } from '../types';
import copy from '../assets/copy.svg';
import Toast from './Toast';

function decodeMagnet(link: string) {
  return magnetDecode(link);
}

function encodeMagnet(data: MagnetData): string {
  return magnetEncode(data);
}

export const MagnetContent: FC = () => {
  const [foundMagnets, setFoundMagnets] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    //asks data to be retrieved
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id as number, { type: AllowedTypes.RETRIEVE_DATA });
    });
  }, []);

  useEffect(() => {
    //listener to get retrieved data
    chrome.runtime.onMessage.addListener((message: ProcessType) => {
      switch (message.type) {
        case AllowedTypes.DATA_RETRIEVED:
          setFoundMagnets((val) => Array.from(new Set([...val, ...(message.payload as [])])));
          break;
        default:
          break;
      }
    });
  }, []);

  const copyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <h2>Found Magnet Links: {foundMagnets.length}</h2>

      <div className="items text-normal">
        <ul>
          {foundMagnets.map((m) => {
            const decodedData = decodeMagnet(m);
            const encodedData = encodeMagnet(decodedData);
            return (
              <li key={encodedData}>
                <button type="button" className="btn-copy" title="Copy" onClick={() => copyToClipboard(encodedData)}>
                  <img src={copy} />
                </button>
                <a href={encodedData}>{decodedData?.name || encodedData}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <Toast message="Link copied to clipboard!" active={showToast} />
    </>
  );
};
