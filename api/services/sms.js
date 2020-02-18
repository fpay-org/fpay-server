const axios = require("axios");

exports.sendSMS = (to, body) => {
  const request = {
    user_id: "11394",
    api_key: "pZKXbn800LuqIsjHUPzE",
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
