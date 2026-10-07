 const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
 const sectionReiniciar = document.getElementById('reiniciar')
 const botonMascotaJugador = document.getElementById('boton-mascota')
 const botonReiniciar = document.getElementById('boton-reiniciar')
 sectionReiniciar.style.display = 'none'

 const sectionSeleccionarMascota= document.getElementById('seleccionar-mascota')
 const spanMascotaJugador = document.getElementById("mascota-jugador")

 const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

 const spanVidasJugador = document.getElementById("vidas-jugador")
 const spanVidasEnemigo = document.getElementById("vidas-enemigo")

 const sectionMensajes = document.getElementById('resultado')
 const ataqueDelJugador = document.getElementById('ataque-del-jugador')
 const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
 const contenedorTarjetas = document.getElementById('contenedorTarjetas')
 const contenedorAtaques = document.getElementById('contenedorAtaques')

 const sectionVerMapa = document.getElementById('ver-mapa')
 const mapa = document.getElementById('mapa')

let jugadorid = null 
let enemigoid =null
let mokepones =[]
let mokeponesEnemigos =[]
let ataqueJugador =[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJudador
let mascotaJugadorObjeto
let ataquesMoquepon
let ataquesMoqueponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones =[]
let indexAtaqueJugador 
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = window.innerWidth * 600/ 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
   constructor(nombre, foto, vida,fotoMapa, id = null){
    this.id = id
    this.nombre = nombre
    this.foto = foto
    this.vida =vida
    this.ataques = []
     this.ancho = 40
    this.alto = 40
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)
   
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
    

   } 

pintarMokepon(){
         lienzo.drawImage(
         this.mapaFoto,
         this.x,
         this.y,
         this.ancho,
         this.alto,

   ) 
}

}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5,'./assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5,'./assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5,'./assets/ratigueya.png')


const HIPODOGE_ATAQUES = [
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'❤️',id:'boton-fuego'},
    {nombre:'🌵',id:'boton-tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES = [
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'❤️',id:'boton-fuego'}
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUE =[
     {nombre:'❤️',id:'boton-fuego'},
    {nombre:'❤️',id:'boton-fuego'},
    {nombre:'❤️',id:'boton-fuego'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🌵',id:'boton-tierra'},
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUE)




mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarJuego(){
  
   sectionSeleccionarAtaque.style.display = 'none' 
   sectionVerMapa.style.display ='none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
          <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
            `
   contenedorTarjetas.innerHTML  +=  opcionDeMokepones  
     
     inputhipodoge =document.getElementById('Hipodoge')
     inputcapipepo =document.getElementById('Capipepo') 
     inputratigueya =document.getElementById('Ratigueya')
   
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
     botonReiniciar.addEventListener('click',reiniciarJuego)

    unirseAlJuego() 
    
}  

function unirseAlJuego() {
    fetch("http://192.168.0.8:8080/unirse")
        .then(function(res){
            if (res.ok){
                res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorid = respuesta
                })
            }

        })
}

function seleccionarMascotaJugador(){
    
  
    if (inputhipodoge.checked){
        spanMascotaJugador.innerHTML = inputhipodoge.id 
        mascotaJudador = inputhipodoge.id 
   }else if (inputcapipepo.checked){
        spanMascotaJugador.innerHTML = inputcapipepo.id 
        mascotaJudador = inputcapipepo.id 
   }else if (inputratigueya.checked){
        spanMascotaJugador.innerHTML = inputratigueya.id
        mascotaJudador = inputratigueya.id
   }else{
    alert('selecciona una mascota')
    return
   }

 sectionSeleccionarMascota.style.display = 'none'

   seleccionarMokepon(mascotaJudador)
   
   extraerAtaques(mascotaJudador)
   sectionVerMapa.style.display = 'flex'
   iniciarMapa()
  
}

function seleccionarMokepon(mascotaJugador) {
         fetch(`http://192.168.0.8:8080/mokepon/${jugadorid}`, {

        
        
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJudador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJudador ===  mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    
    mostrarAtaques(ataques)  
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMoquepon = `
          <button id=${ataque.id} class="botom-de-ataque BAtaque ">${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML +=   ataquesMoquepon 
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
             if(e.target.textContent.trim() === '❤️') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent.trim() === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador )
                boton.style.background ='#122f58'
                boton.disabled = true
            }
            if(ataqueJugador.length === 5){
                enviarAtaques()       
            }
         
        })
    })
      

}

function enviarAtaques(){
    fetch(`http://192.168.0.8:8080/mokepon/${jugadorid}/ataques`,{
        method: "post",
        headers:{
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques () {
    fetch(`http://192.168.0.8:8080/mokepon/${enemigoid}/ataques`)
     .then(function (res){
        if(res.ok){
            res.json()
            .then(function({ataques}) {
                if (ataques.length === 5){
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
     ataquesMoqueponEnemigo = enemigo.ataques
    secuenciaAtaque()
   

}
function ataqueAleatorioEnemigo(){
     let ataqueAleatorio = aleatorio(0,ataquesMoqueponEnemigo.length - 1)
    console.log('Ataques enemigo', ataquesMoqueponEnemigo);
  
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1 ){
         ataqueEnemigo.push('FUEGO')
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4 ){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()

}

function iniciarPelea(){
   if(ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

   
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index] ){
             indexAmbosOponente(index, index)
             crearMensaje("empate") 
        }else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo [index] == 'TIERRA'){
            indexAmbosOponente(index, index)
            crearMensaje("ganaste")
            victoriasJugador++
             spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
             indexAmbosOponente(index, index)
             crearMensaje("ganaste")
            victoriasJugador++
             spanVidasJugador.innerHTML = victoriasJugador
        }   else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
             indexAmbosOponente(index, index)
             crearMensaje("ganaste")
             victoriasJugador++
             spanVidasJugador.innerHTML = victoriasJugador    
        }else{
              indexAmbosOponente(index, index)
             crearMensaje("perdiste")
             victoriasEnemigo++
             spanVidasEnemigo.innerHTML = victoriasEnemigo
             spanVidasJugador.innerHTML = victoriasJugador
        }
    }


            revisarVidas()

}
function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("esto fue un empate!!")
    }else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELIZITACIONES! Ganaste")
    }else{
        crearMensajeFinal('LO SIENTO PERDISTE')
    }
}

function crearMensaje(resultado){
       
    
        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
        
        ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}
function crearMensajeFinal(resultadoFinal){
      
      
      sectionMensajes.innerHTML = resultadoFinal
      
      sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
            return Math.floor(Math.random() * (max - min +1) + min)
            
        }
function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage (
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height,

        )
   mascotaJugadorObjeto.pintarMokepon()

   enviarPosicion( mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)


   mokeponesEnemigos.forEach(function(mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)   
   })
 
  
}  

function enviarPosicion(x, y) {
    fetch(`http://192.168.0.8:8080/mokepon/${jugadorid}/posicion`,{
      method: "post",
    headers: {
        "content-Type": "application/json"
    } ,
    body: JSON.stringify({
        x,
        y
    })
    })

    .then(function (res){
        if (res.ok){
            res.json()
             .then(function ({ enemigos }){
                console.log( enemigos )
                mokeponesEnemigos = enemigos.map( function (enemigo) {
                    let mokeponEnemigo = null
                const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodoge"){
                         mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5,'./assets/hipodoge.png', enemigo.id)
                    }else if (mokeponNombre === "Capipepo"){
                       mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5,'./assets/capipepo.png', enemigo.id)
                    }else if (mokeponNombre === "Ratigueya"){
                         mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5,'./assets/ratigueya.png', enemigo.id)

                    }
                    mokeponEnemigo.x = enemigo.x || 0
                    mokeponEnemigo.y = enemigo.y || 0

                    return mokeponEnemigo
                })
            
             })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5

}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY =  5
    
}

function moverArriva() {
    mascotaJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento(){
    const miMokepon = obtenerObjetoMascota()
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0

}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriva()
            break
        case 'ArrowDown':
            moverAbajo()    
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
  
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJudador)
    console.log(mascotaJugadorObjeto,mascotaJudador);
    intervalo = setInterval(pintarCanvas, 50)

   window.addEventListener('keydown', sePresionoUnaTecla)

   window.addEventListener('keyup', detenerMovimiento)
}

function  obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJudador ===  mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
    
}
function revisarColision(enemigo){ 
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =    mascotaJugadorObjeto.y
    const abajoMascota =     mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =   mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log(' se detecto una colision');

    enemigoid = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
   
}

window.addEventListener('load', iniciarJuego)