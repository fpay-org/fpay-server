const config = require("../config/data");
const mailjet = require('node-mailjet')
    .connect(config.EMAIL.API_KEY, config.EMAIL.SCERET_KEY)

exports.sendEmail = (email, name, subject, body) => {

    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "hi@sashika.me",
                        "Name": "My"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": name
                        }
                    ],
                    "Subject": subject,
                    "TextPart": body
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err)
        })

}