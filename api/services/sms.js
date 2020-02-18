const axios = require("axios");

exports.sendSMS = (to, body) => {
  const request = {
    user_id: "11398",
    api_key: "QWaA8zu1lO0iGQw3lKu3",
    sender_id: "NotifyDEMO",
    to: to,
    message: body
  };

  axios
    .post("https://app.notify.lk/api/v1/send", request)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
