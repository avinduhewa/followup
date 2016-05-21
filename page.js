String.prototype.replaceHtmlEntites = function() {
var s = this;
var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
var translate = {"nbsp": " ","amp" : "&","quot": "\"","lt"  : "<","gt"  : ">"};
return ( s.replace(translate_re, function(match, entity) {
  return translate[entity];
}) );
};


// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('name').textContent   = info.name;
  document.getElementById('email').textContent  = info.email;
  document.getElementById('phone').textContent  = info.phone.replaceHtmlEntites();
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});
