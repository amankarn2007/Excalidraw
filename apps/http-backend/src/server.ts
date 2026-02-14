import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("hii");
})

app.listen(3000, () => {
    console.log("listning on port 3000");
});