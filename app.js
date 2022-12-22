const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const fs = require("fs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// let usersArray = [{"id": 1, "name": "Alibi", "department": "MVD"},{"id": 2, "name": "Aslan", "department": "KNB"},{"id": 3, "name": "Elmira", "department": "MVD"}]

// app.use("/static", express.static(__dirname + "/public"))

app.get("/cars", (req, res) => {
    res.send(JSON.parse(fs.readFileSync("./cars.json")))
})
// app.get("/users/:id", (req, res) => {
//     const { id } = req.params
//     res.send(usersArray.find(item => item.id === +id))
// })

// app.get("/users/department/:name", (req, res) => {
//     const { name } = req.params
//     res.send(usersArray.filter(item => item.department === name))
// })
// app.get("/users/department/:name/:userId", (req, res) => {
//     const { name } = req.params
//     const userId = req.params.userId
//     const departmentArray = usersArray.filter(item => item.department === name)
//     res.send(departmentArray.find(item => item.id === +userId))
// })

app.post("/cars", (req, res) => {
    let carsArr = JSON.parse(fs.readFileSync("./cars.json"))
    carsArr.push({ id: carsArr[carsArr.length-1]?.id + 1 || 1, model: req.body.model })
    fs.writeFileSync("./cars.json", JSON.stringify(carsArr))
    res.status(201).send(JSON.parse(fs.readFileSync("./cars.json")))
})

app.put("/users", (req,res) => {
    const { id, model } = req.body
    let carsArr = JSON.parse(fs.readFileSync("./cars.json"))
    const index = carsArr.findIndex(item => item.id === id)
    carsArr[index].model = model
    fs.writeFileSync("./cars.json", JSON.stringify(carsArr))
    res.status(201).send(JSON.parse(fs.readFileSync("./cars.json")))
})

app.delete("/users/:id", (req,res) => {
    const id = +req.params.id
    let carsArr = JSON.parse(fs.readFileSync("./cars.json"))
    const index = carsArr.findIndex(item => item.id === id)
    carsArr.splice(index, 1)
    fs.writeFileSync("./cars.json", JSON.stringify(carsArr))
    res.send(JSON.parse(fs.readFileSync("./cars.json")))
})

app.listen(8000, () => {
    console.log('Server start')
})