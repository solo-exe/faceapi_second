const { response } = require('express');
const fetch = require('node-fetch');

const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": "rd600bzv1y9j",
            "app_id": "3234306b4f634fed961c2885389fc4c1"
        },
        "inputs": [
            {
                "data": {
                    "image": { "url": req.body.input }
                }
            }
        ]
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key 1ebab7c4c1e34198aeec81fd975e1f28'
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs", requestOptions)
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(response => res.json(response))
        .catch(err => res.status(400).json('unable to call API'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log(entries[0])
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}