const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
const mailchimp_apiKey = "be1892ef316e07e390dbe3318192ceea-us14";
const mailchimp_server = "us14";
const mailchimp_list = "9f4d90403d";

app.get("/newsletter/subscribe", async (apiReq, apiRes) => {
    if (!apiReq.query.email) {
        apiRes.status(400);
        apiRes.json("need email");
        return;
    }
    axios.post(`https://${mailchimp_server}.api.mailchimp.com/3.0/lists/${mailchimp_list}/members?skip_merge_validation=false`, {
        "email_address":apiReq.query.email,
        "email_type":"html",
        "status":"subscribed",
        "merge_fields":{},
        "interests":{},
        "vip":false,
        "language":"",
        "location":{"latitude":0,"longitude":0},
        "marketing_permissions":[],
        "ip_signup":"",
        "timestamp_signup":"",
        "ip_opt":"",
        "timestamp_opt":"",
        "tags":[]
    }, {
        headers: {
            Authorization: `Bearer ${mailchimp_apiKey}`
        }
    })
    .then(res => {
        apiRes.json(res.data);
    })
    .catch(error => {
        console.error(error);
        apiRes.json(error.response.data);
    });
});

module.exports = app