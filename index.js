const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Home
app.get("/", (req, res) => {
  res.send("Zonguru Backend Running 🚀");
});

// Deposit
app.post("/deposit", (req, res) => {
  const { user, amount } = req.body;

  res.json({
    success: true,
    message: `${user} deposited ${amount} USDT`
  });
});

// Withdraw
app.post("/withdraw", (req, res) => {
  const { user, amount } = req.body;

  res.json({
    success: true,
    message: `${user} withdraw ${amount} USDT`
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server Running on Port " + PORT);
});});

// Deposit
app.post("/deposit", async (req, res) => {
  const { username, amount } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ message: "User not found" });

  user.balance += Number(amount);
  await user.save();

  res.json({
    message: `${username} deposited ${amount} USDT`,
    balance: user.balance
  });
});

// Withdraw
app.post("/withdraw", async (req, res) => {
  const { username, amount } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ message: "User not found" });

  if (user.balance < amount) {
    return res.json({ message: "Not enough balance" });
  }

  user.balance -= Number(amount);
  await user.save();

  res.json({
    message: `${username} withdraw ${amount} USDT`,
    balance: user.balance
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
