(function() {
  "use strict";

  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv, btnSendMsg;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    btnSendMsg = document.getElementById("btnSendMsg");

    queryInput.addEventListener("keydown", queryInputKeyDown);
    btnSendMsg.addEventListener("click", sendMessageButtonClick);

    document.getElementById("welcome1").innerHTML = new Date().toLocaleString();
    document.getElementById("welcome2").innerHTML = new Date().toLocaleString();
    document.getElementById("welcome3").innerHTML = new Date().toLocaleString();
  }

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }

    setAndReceiveMessage();
  }

  function sendMessageButtonClick() {
    setAndReceiveMessage();
  }

  function setAndReceiveMessage() {

    var value = queryInput.value;
    queryInput.value = "";

    createQueryNode(value);
    var responseNode = createResponseNode();

    sendText(value)
      .then(function(response) {
        var result;
        try {
		  result = response.result.fulfillment.messages[0].speech
        } catch(error) {
          result = "";
        }
        setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
        setResponseOnNode("Something goes wrong", responseNode);
      });
  }

  function createQueryNode(query) {
    var dateAndTime = '<span>' + new Date().toLocaleString() + '</span>';
    
    var node = document.createElement('div');
    node.className = "user-request";
    node.innerHTML = dateAndTime + query;
    resultDiv.appendChild(node);
  }

  function createResponseNode() {
    var node = document.createElement('div');
    node.className = "server-response";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;
  }

  function setResponseOnNode(response, node) {
    
    response = response.replace(/\n/g, "<br>");
    var dateAndTime = '<span>' + new Date().toLocaleString() + '</span>';
    
    node.innerHTML = response ? dateAndTime + response : "[empty response]";
    node.setAttribute('data-actual-response', response);
    node.scrollIntoView();
  }

})();