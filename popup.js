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

function RegisteredUser(message) {
  this.message = message;
  this.name = "RegisteredUser";
}

async function sendUserInfo(userEmail, userName) {
  const apiUrl = "https://api-chrome-extension.vercel.app/emails"; // Reemplaza con la URL de tu API
  console.log("Enviando correo electrónico a:", userEmail);

  try {
    const emails = await fetch(apiUrl).then((response) => response.json());
    for (var i = 0; i < emails.length; i++) {
      if (emails[i].email_address == userEmail) {
        throw new RegisteredUser(
          "Bienvenido de nuevo " + emails[i].user_name + "!"
        );
      }
    }
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
        email_address: userEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function clearChat() {
  var chatAnsElement = document.getElementById("chatAns");
  chatAnsElement.innerHTML = "";
}

function logInUI() {
  document.getElementById("chatContainer").style.display = "none";
  document.body.style.height = "150px";
}

function initUI() {
  document.body.style.height = "300px";
  document.getElementById("logInContainer").style.display = "none";
  document.getElementById("chatContainer").style.display = "block";
  document.getElementById("userQuestion").style.display = "block";
  document.getElementById("chatAns").style.display = "none";
  document.getElementById("userQuestion").value = "";
  document.getElementById("refresh").style.display = "none";
  document.getElementById("btn").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  var searchBtn = document.getElementById("btn");
  var refreshBtn = document.getElementById("refresh");
  var emailButton = document.getElementById("btnEmail");
  var userEmailInput = document.getElementById("email");
  var userNameINput = document.getElementById("userName");
  var form = document.getElementById("formEmail");
  logInUI();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendUserInfo(userEmailInput.value, userNameINput.value)
      .then((data) => {
        alert("Te has registado con Exito!!");
        initUI();
      })
      .catch((error) => {
        alert(error.message);
        initUI();
      });
  });

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