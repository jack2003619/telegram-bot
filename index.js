const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  balance: { type: Number, default: 0 }
});

const User = mongoose.model("User", UserSchema);

// Home
app.get("/", (req, res) => {
  res.send("Zonguru Backend Running 🚀");
});

// Create User
app.post("/create-user", async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  res.json({ message: "User created", user });
});

// Get Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

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
