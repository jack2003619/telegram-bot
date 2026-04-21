const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Home route
app.get("/", (req, res) => {
  res.send("Zonguru Backend Running 🚀");
});

// Deposit
app.post("/deposit", (req, res) => {
  const { user, amount } = req.body;
  res.json({ message: `${user} deposited ${amount}` });
});

// Withdraw
app.post("/withdraw", (req, res) => {
  const { user, amount } = req.body;
  res.json({ message: `${user} withdrew ${amount}` });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server started"));  console.log("Server running on port " + PORT);
});
