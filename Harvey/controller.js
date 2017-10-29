(function() {
  "use strict";

  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");

    queryInput.addEventListener("keydown", queryInputKeyDown);
  }

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }

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
    var node = document.createElement('div');
    node.className = "user-request";
    node.innerHTML = query;
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

    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
    node.scrollIntoView();
  }

})();