"use strict";

var client = new ApiAi.ApiAiClient({accessToken: '1f1050d349944137a12df1673891a9fa', lang: 'pt-br'});

function sendText(text) {
  return client.textRequest(text);
}
