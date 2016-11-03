function Chenille(canvas, nbAnneaux, rayon){
    //propriete:
    // sa tete, 
    //la liste de ses anneaux (sous forme d'un tableau), 
    // le canvas dans lequel il s'affiche
    var largeur = canvas.width;
    var hauteur = canvas.height;
    
    this.canvas=canvas;
    
    //créé tete et anneaux
    this.tete = new Tete(largeur/2, hauteur/2 ,rayon,0);
    this.anneaux = new Array(nbAnneaux);
    
    var dx = rayon;
    for (var i=1; i < nbAnneaux + 1 ; i++) {
        dx = rayon*i;
        this.anneaux[i-1] = new Anneau(largeur/2 - dx, hauteur/2 ,rayon);  
    }
    
    //methodes
    //dessiner()
    //deplacer()
};

Chenille.prototype.dessiner = function(){
    var ctxt = this.canvas.getContext("2d");
    this.tete.dessiner(ctxt);
    for (var i=0; i< this.anneaux.length-1; i++){
        this.anneaux[i].dessiner(ctxt);
    }
};

Chenille.prototype.deplacer= function(){
    //sauvegarde coord de la tete avant depl.
   var ancien_x_tete = this.tete.x;
   var ancien_y_tete = this.tete.y;
    
    //this.anneaux[0].dessiner(this.canvas.getContext("2d"));
    
    for (var i=this.anneaux.length - 1; i>0; i--)
      {
      this.anneaux[i].x = this.anneaux[i-1].x;
      this.anneaux[i].y = this.anneaux[i-1].y;
      //this.anneaux[i].dessiner(this.canvas.getContext("2d"));
      }
      
      this.anneaux[0].x = ancien_x_tete;
      this.anneaux[0].y = ancien_y_tete;
    
      this.tete.deplacer(this.canvas);

};

function Tete(xInit, yInit, rInit, cap){
    //propriete : 
    //coord x de son centre, 
    //coord y de son centre, 
    //son rayon , 
    //cap, 
    //la couleur de la tete est differete des anneaux, 
    //
    this.x = xInit;
    this.y = yInit;
    this.r = rInit;
    this.cap = cap;
    //methode: deplacer, 
    //afficher, 
    //devierCap(deltaC), 
    //deplacerSelonCap(), 
    //capOK(canvas)
};

Tete.prototype.dessiner = function(ctxt){
    //affiche l'anneau
    ctxt.beginPath();
    ctxt.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctxt.strokeStyle="black";
    ctxt.fillStyle="black";
    ctxt.stroke();
    ctxt.fill();
};

Tete.prototype.deplacer = function(canvas){
var deltaC = 10; //10deg fixé arbitrairement

// calcul un cap aléatoirement entre -30 et 30deg.
var cap_aleatoire = Math.random() * (30 - (-30)) + (-30);

console.log(this.cap);
this.cap= this.cap + cap_aleatoire;

//deplacerSelonCap();
while (this.capOK(canvas) === 0 )
    { // le cap est mauvais, il faut le devier de 10deg
    this.devierCap(deltaC);
    } 

this.deplacerSelonCap();

};


Tete.prototype.capOK = function(canvas){
    //prédit les coord suivantes de la tete et retourne si ce cap est possible ou non.
    var angle_rad = this.cap * Math.PI / 180; 
var Xsuiv = this.x + this.r * Math.cos(angle_rad);
var Ysuiv = this.y + this.r * Math.sin(angle_rad);
var bool = 1;

if (Xsuiv > canvas.width - this.r || Xsuiv < this.r || Ysuiv > canvas.height - this.r || Ysuiv < this.r)
    {
    bool=0;
    }

return bool;
};

Tete.prototype.devierCap = function(deltaC){
this.cap = this.cap + deltaC;
console.log(this.cap + " apres deviationcap");
console.log("X vaut: " +this.x );
console.log("Y vaut: " +this.y );
};

Tete.prototype.deplacerSelonCap = function(){
    var cap_rad = this.cap * Math.PI / 180; 
    
  this.x = this.x + this.r * Math.cos(cap_rad);
  this.y = this.y + this.r * Math.sin(cap_rad);
};
function Anneau(xInit,yInit,rInit ){
    //constructeur
    //job : fixe position initiale de l'anneau et son rayon d'apres les parametres fournis
    //this.canvas = canvas;
    this.x = xInit;
    this.y = yInit;
    this.r = rInit;
    //propriete: 
    //coord x de son centre, 
    //coord y de son centre, 
    //rayon de son cercle,
 
    //methode: deplacer, afficher
};

Anneau.prototype.placerA = function(px,py){
  
  
};

Anneau.prototype.dessiner = function(ctxt){
    //affiche l'anneau
    ctxt.beginPath();
    ctxt.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctxt.strokeStyle="blue";
    ctxt.fillStyle="orange";
    ctxt.stroke();
    ctxt.fill();
};

function init(){
    // dessiner une chenille
    // creation de l'objet
    var canvas = document.getElementById("myCanvas");
   // var hauteur = canvas.height;
   // var largeur = canvas.width;
    var ctxt = canvas.getContext("2d");
    
    // une chenille de 10 anneaux + 1 tete , rayon=10
    
    
    var chenille1 = new Chenille(canvas, 3, 10);
    chenille1.dessiner();
    
    
    
    document.getElementById("startBtn").onclick = function() {
        document.getElementById("settings").disabled=true;
        document.getElementById("stopBtn").disabled=false;
        
    // dessine une chenille
  
    
    
        timerId = setInterval( function() 
                            {
                            // la fonction invoquée périodiquement (toutes les 20 ms) par le timer
                            ctxt.clearRect(0, 0, canvas.width, canvas.height);
                            chenille1.deplacer();
                            chenille1.dessiner();
                            }
                         , 100);
    
    
    
    };
    
    document.getElementById("stopBtn").onclick = function() {
        document.getElementById("startBtn").disabled = false;
        document.getElementById("settings").disabled = false;
        // interruption du timer
        clearInterval(timerId);
    }
    
    document.getElementById("settings").onclick = function() {
        
        var nbanneaux = parseInt(document.getElementById("anneaux").value);
        var rayon = parseInt(document.getElementById("rayon").value);
        
        ctxt.clearRect(0, 0, canvas.width, canvas.height);
        
        chenille1 = new Chenille(canvas, nbanneaux + 1, rayon);
        
    }
    
    
}


