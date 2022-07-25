const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const mailchimp_apiKey = process.env.MAILCHIMP_APIKEY;
const mailchimp_server = mailchimp_apiKey ? mailchimp_apiKey.substring(mailchimp_apiKey.indexOf('-')+1) : "";
const mailchimp_list = "9f4d90403d";
const cryptocurrency_id = "10090";
const submit_discord_webhook = process.env.SUBMIT_DISCORD_WEBHOOK;
const submit_email = process.env.SUBMIT_EMAIL;

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

app.post("/music", (apiReq, apiRes) => {
    var body = apiReq.body;
    if (!body.artist || !body.title || !body.label || !body.catalogNumber || !body.releaseDate || typeof body.tracks != "object") {
        apiRes.status(400);
        apiRes.json({error:"need artist, title, label, catalogNumber, releaseDate, tracks"});
        return;
    }
    var album = [];
    if (!body.tracks || body.tracks.length <= 0) {
        apiRes.status(400);
        apiRes.json({error:"need tracks"});
        return;
    }
    for (let track of body.tracks) {
        if (!track.name || !track.displayArtists || !track.genre) {
            apiRes.status(400);
            apiRes.json({error:"need name, display artists and genre for each track"});
            return;
        }
        album.push(Object.assign({artist:body.artist,albumTitle:body.title,label:body.label,catalogNumber:body.catalogNumber,releaseDate:body.releaseDate,upc:body.upc}, track));
    }
    var albumCsv = toCSV(album, {artist:"Artist", albumTitle:"Album Title", label:"Label", catalogNumber:"Catalog Number", releaseDate:"Release Date", upc:"UPC", name:"Track Title", displayArtists:"Display Artists", isrc:"ISRC", type:"Track Type", volume:"volume", year:"year", assetYear:"assetYear", assetLine:"assetLine", genre:"Main genre", subgenre:"Main subgenre", alternateGenre:"Alternate genre", alternateSubgenre:"Alternate subgenre", lyrics:"Lyrics", playtime:"Track Duration", previewStart:"previewStart", previewLength:"previewLength", language:"Metadata Language", explicit:"Explicit", audioLanguage:"Audio Language"});
    var csvFileName = `${body.artist}-${body.title}-${Date.now()}.csv`;
    nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE=="true",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    }).sendMail({
        from: "contact@ambi.dev",
        to: submit_email,
        subject: "New submit from "+body.artist,
        html: `✨ New music submit in picture dashboard<br />Artist: <b>${body.artist}</b><br />Title: <b>${body.title}</b>`,
        attachments: [{ filename: csvFileName, content: albumCsv, contentType: 'text/csv' }]
    }, (e,_i) => e&&console.error(e));
    sendToDiscordWebhook(submit_discord_webhook, "✨ New music submit in picture dashboard", [{name:csvFileName, content:albumCsv}]).then(function(res) {
        apiRes.json({success:true});
    }).catch(function(err) {
        console.error(err);
        apiRes.status(500);
        apiRes.json({error:"error sending data"});
        return;
    });
    /*fs.writeFile(csvFileName, albumCsv, err => {
        if (err) {
            console.error(err);
            apiRes.status(500);
            apiRes.json({error:"error writing file"});
            return;
        }
        apiRes.json({success:true});
        console.log("New album submitted : " + csvFileName);
    });*/
});

app.get("/sacem", (apiReq, apiRes, apiNext) => {
    var [title, artist, page, elPerPage] = [apiReq.query.title, apiReq.query.artist, parseInt(apiReq.query.page||1), parseInt(apiReq.query.elPerPage||5)];
    if (!title && !artist) {
        apiRes.status(400);
        apiRes.json({error:"need artist or title"});
        return;
    } else if ((!title || title.length <= 3) && (!artist || artist.length <= 3)) {
        apiRes.status(400);
        apiRes.json({error:"need at least 4 characters for artist or title"});
        return;
    }
    var filters = title&&artist ? "titles,parties" : title ? "titles" : artist ? "parties" : null;
    var query = title&&artist ? encodeURIComponent(title)+","+encodeURIComponent(artist) : title ? encodeURIComponent(title) : artist ? encodeURIComponent(artist) : null;
    axios.post("https://repertoire.sacem.fr/en/more-results", {filters, query, elPerPage, page})
    .then(res => {
        apiRes.json(res.data);
    })
    .catch(err => {
        console.error(err);
        apiRes.status(500);
        apiRes.json({error:"error sending data"});
    });
});

function toCSV(array, headers=Object.keys(array[0]??{}).reduce((o,k)=>(o[k]=k)&&o,{})) {
    var csv = Object.values(headers).join(",") + "\n";
    for (let row of array)
        csv += Object.keys(headers).map(key => row[key]).join(",") + "\n";
    return csv;
}

function sendToDiscordWebhook(webhook, message, files=[]) {
    return new Promise((resolve, reject) => {
        var form = new FormData();
        form.append("content", message);
        for (let i = 0; i < files.length; i++) {
            let buffer = files[i].buffer ?? Buffer.from(files[i].content, files[i].encode??"utf8");
            form.append("files["+i+"]", buffer, files[i].name);
        }
        return axios.post(webhook, form, {...form.getHeaders()})
        .then(res => {
            resolve(res.data);
        })
        .catch(error => {
            reject(error);
        });
    });
}


module.exports = app
