const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.urlencoded({ extended: true }));

app.listen(5000, console.log("Servidor Encendido!"))
app.use(express.json())

// Configurar una ruta para la página principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })
  


 app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    res.json(canciones)
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(p => p.id == id)
    canciones[index] = cancion
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    // Envía una respuesta JSON con el mensaje de éxito
    res.status(200).json({ message: "Producto actualizado con éxito" });
    //res.send("Cancion modificado con éxito")
    })
    

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(p => p.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Producto eliminado con éxito")
    })

   app.post("/canciones", (req, res) => {
        // 1
        const cancion = req.body
        console.log(cancion)
        // 2
        const canciones = JSON.parse(fs.readFileSync("canciones.json"))
        // 3
        console.log(canciones)
        canciones.push(cancion)
        // 4
        console.log(canciones)
        fs.writeFileSync("canciones.json", JSON.stringify(canciones))
        console.log(canciones.json)
        // 5
        res.send("Cancion agregada con éxito!")
        })
        
        
