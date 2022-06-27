const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
const mailchimp_apiKey = process.env.MAILCHIMP_APIKEY;
const mailchimp_server = mailchimp_apiKey.substring(mailchimp_apiKey.indexOf('-')+1);
const mailchimp_list = "9f4d90403d";
const cryptocurrency_id = "10090";

app.get("/newsletter/subscribe", (apiReq, apiRes) => {
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
        //console.error(error);
        apiRes.json(error.response.data);
    });
});

const cryptocurrency = {};
app.get("/cryptocurrency", (apiReq, apiRes) => {
    updateCryptocurrency().then(() => {
        apiRes.json(cryptocurrency);
    });
});

function updateCryptocurrency() {
    // actualisation des données toutes les heures maximum
    if (cryptocurrency.lastUpdate && cryptocurrency.lastUpdate+3600*1000 > Date.now()) {
        return Promise.all([]);
    }
    return Promise.all([
        axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/?id=${cryptocurrency_id}`)
        .then(res => {
            cryptocurrency.name = res.data.data.name;
            cryptocurrency.symbol = res.data.data.symbol;
        })
        .catch(console.error),
        axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${cryptocurrency_id}&range=7D`)
        .then(res => {
            var points = [];
            for (let t in res.data.data.points) {
                points.push({x:t, y:res.data.data.points[t].v[0]});
            }
            cryptocurrency.value = points[points.length-1].y;
            cryptocurrency.points = points;
        })
        .catch(console.error)
    ]);
}

module.exports = app