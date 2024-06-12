const express = require('express');
const path = require('path');
let fs = require('fs')
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/profile-picture', (req, res)=>{
    let img = fs.readFileSync(path.join(__dirname, "images/profile.png"));
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

// Fetch profile data
app.get('/profile', (req, res) => {
  profileCollection.findOne({ _id: 1 })
      .then(profile => res.json(profile))
      .catch(error => res.status(500).send(error));
});

// Update profile data
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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
