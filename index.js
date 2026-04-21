const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zonguru Backend Running 🚀");
});

app.post("/deposit", (req, res) => {
  const { user, amount } = req.body;
  res.json({
    status: "success",
    message: `User ${user} deposited ${amount} USDT`
  });
});

app.post("/withdraw", (req, res) => {
  const { user, amount } = req.body;
  res.json({
    status: "success",
    message: `User ${user} withdraw ${amount} USDT`
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
