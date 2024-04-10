function listenForisLoadedEvent() {
  chrome.webNavigation.onCompleted.addListener(
    () => {
      chrome.tabs.query({ active: true, currentWindow: true }, sendMessage);

    },
    { url: [{ urlMatches: "https://www.warsbrydz.pl/wyniki/" }] }
  );

  function sendMessage(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      command: "loadingCompleted",
    });
  };

}

listenForisLoadedEvent();
