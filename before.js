
// this code will be executed before page load
(function() {
  chrome.runtime.sendMessage({ contentScriptQuery: 'spotifyOpen' }, function(redirectTo, err) {
    if (redirectTo) {
      window.location.href = redirectTo;
    }

    if (err) {
      alert('Could not find this on Songwhip. Sorry :(');
    }
  });
})();
