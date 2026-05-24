const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

// GET tous les users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST créer un user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

// PUT modifier un user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

// DELETE supprimer un user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User supprimé" });
});

module.exports = router;