//Variáveis Bolinha/////////////////////////////////////////////////////////////////
let xBolinha = 300;
let yBolinha = 200;
let DiametroBolinha = 30;
let Raio = DiametroBolinha /2;

//Velocidade Bolinha
let SpeedxBolinha = 6;
let SpeedyBolinha = 6;

//Variáveis Raquete/////////////////////////////////////////////////////////////////
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 15;
let AlturaRaquete = 100;
let Curvatura = 20;
let hit = false;

//Variaveis Oponente////////////////////////////////////////////////////////////////
let xRaqueteOponente= 575;
let yRaqueteOponente= 150;
let comprimentoRaqueteOponente = 15;
let AlturaRaqueteOponente= 100;
let CurvaturaOponente = 20;
let VelocidadeyOponente; 

let chanceDeErrar = 1;

//Placar////////////////////////////////////////////////////////////////////////
let PontosP1 = 0;
let PontosP2 = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

////////////////////////////////////////////////////////////////////////////
function preload(){
  neon = loadImage('neon.png')
  trilha = loadSound("sons/trilha.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
  ponto = loadSound("sons/ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  frameRate(144);
}

function draw() {
  background(0);
  MostraBolinha();
  MovimentoBolinha();
  BordaBolinha();
  MostraRaquete();
  MovimentoRaquete();
  ColisãoRaquete();
  ColisãoRaqueteLibrary();
  MostraRaqueteOponente();
  ColisãoRaqueteLibraryOponente();
  MovimentoOponente();
  Placar();
  MarcaPonto();

}
//Bolinha////////////////////////////////////////////////////////////////////////////
function MostraBolinha(){
  circle (xBolinha,yBolinha,DiametroBolinha);
}
function MovimentoBolinha(){
    xBolinha += SpeedxBolinha
    yBolinha += SpeedyBolinha
}
function BordaBolinha(){
  if (xBolinha + Raio> width || xBolinha - Raio < 0){
    SpeedxBolinha *= -1;
  }
  if (yBolinha + Raio> height || yBolinha - Raio < 0){
    SpeedyBolinha *= -1;  
  }
}
//MinhaRaquete///////////////////////////////////////////////////////////////////////
function MostraRaquete (){
  rect (xRaquete, yRaquete, comprimentoRaquete, AlturaRaquete, Curvatura);
  //image(neon, xRaquete, yRaquete, comprimentoRaquete, AlturaRaquete);  
}
function MovimentoRaquete(){
 if (keyIsDown(87)){
   yRaquete -= 10;
 } 
 if (keyIsDown(83)){
   yRaquete += 10;
 }  
}
function ColisãoRaquete(){
 if (xBolinha - Raio < xRaquete + comprimentoRaquete && yBolinha - Raio < yRaquete + AlturaRaquete && yBolinha + Raio > yRaquete){
   SpeedxBolinha *= -1;
 }  
}

function ColisãoRaqueteLibrary(){
   hit = 
     collideRectCircle(xRaquete, yRaquete, comprimentoRaquete, AlturaRaquete, xBolinha, yBolinha, Raio);
  if (hit){
  SpeedxBolinha *= -1;

  }
}
//RaqueteOponente//////////////////////////////////////////
function MostraRaqueteOponente (){
  rect (xRaqueteOponente, yRaqueteOponente, comprimentoRaqueteOponente, AlturaRaqueteOponente, CurvaturaOponente);  
}

function ColisãoRaqueteLibraryOponente(){
   hit = 
     collideRectCircle(xRaqueteOponente, yRaqueteOponente, comprimentoRaqueteOponente, AlturaRaquete, xBolinha, yBolinha, Raio);
  if (hit){
  SpeedxBolinha *= -1;
 }
}

function MovimentoOponente(){
  VelocidadeyOponente = yBolinha -yRaqueteOponente -comprimentoRaquete /2 -30
  yRaqueteOponente += VelocidadeyOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (PontosP2 >= PontosP1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
//placar////////////////////////////////////////////////////
function Placar(){
  textAlign(CENTER)
  textFont(myfont)
  textSize(70);
  fill(139,0,0);
  text(PontosP1, 218, 75);
  text(PontosP2, 351, 75);
}
function preload(){
  myfont = loadFont('AmazDooMLeft.ttf')
}
function MarcaPonto(){
  if (xBolinha > 587){
    PontosP1 += 1;
  }
  if (xBolinha < 13){
    PontosP2 += 1;
  }
}




