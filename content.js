var send_message = document.getElementById('tc-actions-send-message');
var send_message_container = send_message.parentElement.parentElement;
var br = document.createElement('br');
var i = document.createElement('input');
      i.type = 'button';
      i.name = 'leads';
      var add_lead_class = document.createAttribute("class");
      add_lead_class.value = "button-primary";
      i.setAttributeNode(add_lead_class);

      var add_lead_style = document.createAttribute("style");
      add_lead_style.value = "margin-top:10px;background-image:-webkit-linear-gradient(top, #46b8da 0%, #46b8da 100%)";
      i.setAttributeNode(add_lead_style);

      i.value = 'Add Lead';
      send_message_container.appendChild(br);
      send_message_container.appendChild(i);

// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = {
      total:   document.querySelectorAll('*').length,
      inputs:  document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length,
      email: document.querySelectorAll('#email a')[0].innerHTML,
      name: document.querySelectorAll('#name span.full-name')[0].innerHTML,
      phone: document.querySelectorAll('#phone #phone-view ul li')[0].innerHTML
    };
    console.log(domInfo);
    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }
});
