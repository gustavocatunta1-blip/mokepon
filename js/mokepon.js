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
 
let mokepones =[]
let ataqueJugador =[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputhipodoge
let inputcapipepo 
let inputratigueya
let mascotaJudador
let mascotaJugadorObjeto
let ataquesMoquepon
let ataquesMoqueponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones =[]
let indexAtaqueJugador 
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'https://static.platzi.com/media/user_upload/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.jpg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = window.innerWidth * 500/ 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
   constructor(nombre, foto, vida,fotoMapa){
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

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5,'https://static.platzi.com/media/user_upload/hipodoge-255625c9-dc2e-46d0-9557-47a6a588080a.jpg')

let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5,'https://static.platzi.com/media/user_upload/capipepo-88af5708-65fd-4c17-b6ba-b8769612c301.jpg')

let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5,'https://static.platzi.com/media/user_upload/ratigueya-3d52f361-7036-4ff7-bf61-c4b7e49875ff.jpg')

let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5,'https://static.platzi.com/media/user_upload/hipodoge-255625c9-dc2e-46d0-9557-47a6a588080a.jpg')

let capipepoEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5,'https://static.platzi.com/media/user_upload/capipepo-88af5708-65fd-4c17-b6ba-b8769612c301.jpg')

let ratigueyaEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5,'https://static.platzi.com/media/user_upload/ratigueya-3d52f361-7036-4ff7-bf61-c4b7e49875ff.jpg')
hipodoge.ataques.push(
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'❤️',id:'boton-fuego'},
    {nombre:'🌵',id:'boton-tierra'},
)

hipodogeEnemigo.ataques.push(
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'❤️',id:'boton-fuego'},
    {nombre:'🌵',id:'boton-tierra'},
)

capipepo.ataques.push(
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'❤️',id:'boton-fuego'},
)

capipepoEnemigo.ataques.push(
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'🌵',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'❤️',id:'boton-fuego'},
)


ratigueya.ataques.push(
    {nombre:'❤️',id:'boton-tierra'},
    {nombre:'❤️',id:'boton-tierra'},
    {nombre:'❤️',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🌵',id:'boton-fuego'},
)

ratigueyaEnemigo.ataques.push(
    {nombre:'❤️',id:'boton-tierra'},
    {nombre:'❤️',id:'boton-tierra'},
    {nombre:'❤️',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🌵',id:'boton-fuego'},
)


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
    
}   

function seleccionarMascotaJugador(){
    
   sectionSeleccionarMascota.style.display = 'none'

  
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
   }
   
   extraerAtaques(mascotaJudador)
   sectionVerMapa.style.display = 'flex'
   iniciarMapa()
  
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
          ataqueAleatorioEnemigo()
        })
    })
      

}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
     ataquesMoqueponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()

}
function ataqueAleatorioEnemigo(){
    console.log('Ataques enemigo', ataquesMoqueponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMoqueponEnemigo.length, -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1 ){
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4 ){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()

}

function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponente(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

   
}

function combate(){

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
   hipodogeEnemigo.pintarMokepon()
   capipepoEnemigo.pintarMokepon()
   ratigueyaEnemigo.pintarMokepon()
   if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0 ) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)    
    
   }
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
    console.log(mascotaJugadorObjeto, mascotaJudador);
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
    console.log(' se detecto una colizion')
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
   
}

window.addEventListener('load', iniciarJuego)