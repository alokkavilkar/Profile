const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

const uri = 'mongodb://admin:password@localhost:27017';
const dbName = 'userProfileDB';

let db, profileCollection;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    db = client.db(dbName);
    profileCollection = db.collection('profiles');
  })
  .catch(error => console.error(error));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/profile-picture', (req, res) => {
  let img = fs.readFileSync(path.join(__dirname, 'images/profile.png'));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.get('/profile', (req, res) => {
  profileCollection.findOne({ _id: 1 })
    .then(profile => res.json(profile))
    .catch(error => res.status(500).send(error));
});

app.post('/profile', (req, res) => {
  const { name, email, interests } = req.body;
  profileCollection.updateOne(
    { _id: 1 },
    { $set: { name, email, interests } },
    { upsert: true }
  )
    .then(result => res.json('Profile updated'))
    .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
