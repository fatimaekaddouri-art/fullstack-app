require("dotenv").config();
const express    = require("express");
const mongoose   = require("mongoose");
const path       = require("path");
const cors       = require("cors");
const helmet     = require("helmet");
const userRoutes = require("./routes/users");

const app  = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connecté"))
  .catch((err) => console.error(" Erreur :", err));

// Routes API
app.use("/api/users", userRoutes);

//  Servir le build React (Vite = dist)
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => console.log(` Serveur sur port ${PORT}`));