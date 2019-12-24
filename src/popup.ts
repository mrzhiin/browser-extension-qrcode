import QRCode from "qrcode";
import { UAParser } from "ua-parser-js";

const DOMContentBefore = () => {
  const parser = new UAParser();
  const browser = parser.getBrowser();

  let color = "";

  switch (browser.name) {
    case "Edge":
      color = "#3b3b3b";
      break;
    case "Chrome":
      color = "#292a2d";
      break;
    default:
      color = "#192227";
      break;
  }

  document.write(`
    <style>
      @media (prefers-color-scheme: dark) {
        body {
          background: ${color};
        }
      }
    </style>
    `);
};

const DOMContentLoaded = async () => {
  const el = document.getElementById("canvas");

  const options = {
    margin: 0,
    width: 200,
    color: {
      dark: "#000",
      light: "#fff0"
    }
  };

  const tabs: chrome.tabs.Tab[] = await new Promise((s, j) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      s(tabs);
    });
  });

  const tab = tabs[0];

  if (tab && tab.url) {
    QRCode.toCanvas(el, tab.url, options);
  }
};

const main = async () => {
  // DOMContentBefore();
  document.addEventListener("DOMContentLoaded", DOMContentLoaded);
};

main();
