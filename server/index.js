
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const route = require('./Route'); // ✅ path should be correct

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ You need this for parsing JSON

const PORT = process.env.PORT || 8080;
const MONGODBURL = process.env.MONGODB_URL;

mongoose.connect(MONGODBURL)
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
app.get('/', (req, res) => {
  console.log("Root / hit ✅");
  res.send("Backend Working ✅");
});
app.use('/api', route); // ✅ this maps /api/info to route
