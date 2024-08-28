const express = require("express")
const app = express()
const path = require("path")
const port = 3000

app.use(express.static("public"))

app.get('/', (req, res) => {
    const html_file = path.join(__dirname, "public", "index.html")
    res.sendFile(html_file)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})