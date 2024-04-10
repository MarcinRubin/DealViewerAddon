function listenForisLoadedEvent() {
  browser.webNavigation.onCompleted.addListener(
    () => {
      browser.tabs  
        .query({ active: true, currentWindow: true })
        .then(sendMessage)
        .catch(reportError);
    },
    { url: [{ urlMatches: "https://www.warsbrydz.pl/wyniki/" }] }
  );

  function sendMessage(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "loadingCompleted",
    });
  }

  function reportError() {
    console.log("Error occured!");
  }
}

listenForisLoadedEvent();
