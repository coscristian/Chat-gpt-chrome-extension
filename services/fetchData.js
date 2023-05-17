import axios from "axios";

var options = {
  method: "GET",
  url: "",
  headers: { "Content-Type": "application/json" },
};

class FetchData {
  async getChatGptResponse() {
    return await axios
      .request(options)
      .then(function (response) {
            return response.data;
      })
      .catch(function (error) {
            return error;
      });
  }
}

export default new FetchData();
