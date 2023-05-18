/**
 * Make the request to the specified apiUrl
 * @param {String} userPrompt The user message to send to the API
 * @returns {JSON} The response from the API
 */
async function sendUserQuestion(userPrompt) {
  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/completions";
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: userPrompt,
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .catch((error) => console.log("Error " + error));
}

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("btn");
  var chatAnsElement = document.getElementById("chatAns");
  chatAnsElement.style.display = "none";

  btn.addEventListener("click", function () {
    textAreaElement = document.getElementById("userQuestion");

    sendUserQuestion(textAreaElement.value)
      .then((response) => {
        var chatAns = response.choices[0].text;
        chatAnsElement.style.display = "block";

        var textNode = document.createTextNode(chatAns);
        chatAnsElement.appendChild(textNode);
      })
      .catch((error) => console.log("Error " + error));

    document.getElementById("userQuestion").style.display = "none";
  });
});
