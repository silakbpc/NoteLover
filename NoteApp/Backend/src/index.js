const express = require("express");
const connectDB = require("../lib/db");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

const userRoutes = require("./routes/userRoutes");      
const notesRoutes = require("./routes/notesRoutes");
const noteTypeRoutes = require("./routes/noteTypeRoutes");

app.use("/api/users", userRoutes);                      
app.use("/api/notes", notesRoutes);
app.use("/api/notetypes", noteTypeRoutes);

app.get("/", (req, res) => {
  res.send("API çalışıyor");
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} adresinde çalışıyorİĞ?"Ğİ`);
});
