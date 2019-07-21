const guest_list = require('./data/guest_list.json');
const tables = require ('./data/tables.json');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// An api endpoint that returns a short list of items
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/guest_list', (req, res) => {
  res.send(guest_list);
});

app.get('/api/tables', (req, res) => {
    res.send(tables);
  });

app.post('/api/postGuests', (req, res) => {
  fs.writeFile('./data/guest_list.json', JSON.stringify(req.body), function (err) {
    if (err) throw err;
  });
  res.send(
    `I received your POST request. This is what you sent me: ${req.body}`,
  );
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));