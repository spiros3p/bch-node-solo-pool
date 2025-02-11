const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8091;

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const filePath = path.join(__dirname, "..", "pool-logs", "users", userId);
  console.log(filePath);
  console.log(fs.existsSync(filePath));

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "User not found" });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading file" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
