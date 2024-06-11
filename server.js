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
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
