const express = require ("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.use(express.static("."))

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

actualizarPosicion(x,y) {
    this.x = x
    this.y = y
}   

asignarAtaques(ataques){
    this.ataques = ataques
}

}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse",(req, res) => {
    const id = `${(Math.random())}`
    
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.end(id)

})
app.post("/mokepon/:jugadorid",(req,res) =>{
    const jugadorid = req.params.jugadorid ||""
    const nombre = req.body.mokepon ||""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorid === jugador.id)


    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorid)
    res.end()
})


app.post("/mokepon/:jugadorid/posicion",(req,res)=> {
    const jugadorid = req.params.jugadorid || ""
    const X = req.body.x || 0
    const y = req.body.y || 0
    
    const jugadorIndex = jugadores.findIndex((Jugador) => jugadorid === Jugador.id)

     if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(X, y)
     }

     const enemigos = jugadores.filter((jugador) => jugadorid !== jugador.id && jugador.mokepon)

     res.send({
       enemigos 
     })
})


app.post("/mokepon/:jugadorid/ataques",(req, res) =>{
    const jugadorid = req.params.jugadorid || ""
    const ataques = req.body.ataques  || []
   
    
    const jugadorIndex = jugadores.findIndex((Jugador) => jugadorid === Jugador.id)

     if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
     }

   
    res.end()
})

app.get("/mokepon/:jugadorid/ataques", (req,res) =>{
    const jugadorid = req.params.jugadorid || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorid)
    res.send({
        ataques: jugador.ataques || []
    })    
})


app.listen(8080,()=>{
    console.log("servidor funcionando")
})

