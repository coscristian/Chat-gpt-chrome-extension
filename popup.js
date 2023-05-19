/**
 * Make the request to the specified apiUrl
 * @param {String} userPrompt The user message to send to the API
 * @returns {Promise} The response from the API
 */
async function sendUserQuestion(userPrompt) {
  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/completions";

  // Make a POST request to the OpenAI API
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
      // Parse the response as JSON and return it
      return response.json();
    })
    .catch((error) => Promise.reject(error));
}

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("btn");
  var chatAnsElement = document.getElementById("chatAns");
  chatAnsElement.style.display = "none";

  // Add click event listener to the button
  btn.addEventListener("click", function () {
    textAreaElement = document.getElementById("userQuestion");

    // Send the user's question to the API and handle the response
    sendUserQuestion(textAreaElement.value)
      .then((response) => {
        var chatAns = response.choices[0].text;

        // Hide the user's question input and display the answer
        document.getElementById("userQuestion").style.display = "none";
        chatAnsElement.style.display = "block";

        // Create a text node with the answer and append it to the answer element
        var textNode = document.createTextNode(chatAns);
        chatAnsElement.appendChild(textNode);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        alert("An error has ocurred, please try again later. " + error);
      });
  });
});


/**
 * Make the request to the specified apiUrl
 * @param {String} userPrompt The user message to send to the API
 * @returns {Promise} The response from the API
 */
async function sendUserQuestion(userPrompt) {
    const apiKey = config.SECRET_KEY;
    const apiUrl = "https://api.openai.com/v1/completions";
  
    // Make a POST request to the OpenAI API
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
        // Parse the response as JSON and return it
        return response.json();
      })
      .catch((error) => Promise.reject(error));
  }
  
  function clearChat() {
    var chatAnsElement = document.getElementById("chatAns");
    chatAnsElement.innerHTML = "";
  }
  
  function initUI(){
      document.getElementById("userQuestion").style.display = "block";
      document.getElementById("chatAns").style.display = "none";
      document.getElementById("userQuestion").value = "";
      document.getElementById("refresh").style.display = "none";
      document.getElementById("btn").style.display = "block";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var searchBtn = document.getElementById("btn");
    var refreshBtn = document.getElementById("refresh");
  
    initUI();
  
    // Add click event listener to the button
    searchBtn.addEventListener("click", function () {
      textAreaElement = document.getElementById("userQuestion");
  
      // Send the user's question to the API and handle the response
      sendUserQuestion(textAreaElement.value)
        .then((response) => {
          var chatAns = response.choices[0].text;
          var chatAnsElement = document.getElementById("chatAns");
  
          // Hide the user's question input and display the answer
          document.getElementById("userQuestion").style.display = "none";
          chatAnsElement.style.display = "block";
          searchBtn.style.display = "none";
          document.getElementById("refresh").style.display = "block";
  
          // Create a text node with the answer and append it to the answer element
          var textNode = document.createTextNode(chatAns);
          chatAnsElement.innerHTML = "";
          chatAnsElement.appendChild(textNode);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          alert("An error has ocurred, please try again later. " + error);
        });
    });
  
    refreshBtn.addEventListener("click", function () {    
      initUI();
    });
  
  });
  