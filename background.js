const songwhipUrl = 'https://songwhip-proxy.herokuapp.com/https://songwhip.com/';

// event to run execute.js content when extension's button is clicked
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.contentScriptQuery === 'spotifyOpen') {
    getSongwhipRedirect(sender.tab.url)
      .then((redirectTo) => sendResponse(redirectTo))
      .catch((err) => sendResponse(null, true));
  }

  return true;
});

function getSongwhipRedirect(url) {
  return new Promise((resolve, reject) => {
    fetch(songwhipUrl, buildSongwhipRequestOptions(url))
      .then((res) => res.json())
      .then((json) => resolve(json.url))
      .catch((e) => reject(e));
  });

  return true;
}

function buildSongwhipRequestOptions(url) {
  return {
    headers: { 'Content-Type': 'application/json', 'Origin': 'songwhip.com' },
    body: JSON.stringify({ url }),
    method: 'POST'
  };
}
