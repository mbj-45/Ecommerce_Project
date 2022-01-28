  let getStar = (vote) => {
    vote = parseInt(vote)
    let starVote = vote / 2
    let starFill = ''
    for (i = 0; i < 5; i++) {
      if (i < starVote) {
        starFill += `<i class="fas fa-star"></i>`
      } else {
        starFill += `<i class="far fa-star"></i>`
      }
    }
    return starFill;
  };

  fetch('assets/data/movies.json')
    .then(response => response.json())
    .then((jsonMovies) => {
      jsonMovies.results.map((movie) => {

        let title = movie.original_title;
        let prix = movie.prix;
        let overview = movie.overview;
        let poster = movie.poster_path;
        let vote = movie.vote_average;
        let star = getStar(vote);
        
        let movieElToInject = `
        <div class="row">
          <div class="col-lg-4 col-md-6 text-center">
            <div class="single-product-item">
            <a href="#"><img src='${poster}' />
          </div>
            <h3>${title}</h3>
            <p class="product-price"> ${prix} </p>
            <a href="#" class="cart-btn"><i class="fas fa-shopping-cart"></i>Acheter</a>
			  </div>`;
        document.getElementById('filmTable').innerHTML += launchElToInject;
          
      });
    });


    function Produit(id, designation, prix) {
      this.id= id;
      this.prix= prix;
      this.designation= designation;
      this.toString= function() {
      return this.designation + " "+ prix;
      }
    };
  
    var catalogue= new Array();
    catalogue.push(new Produit(1, "Iphone 13", 1000));
    catalogue.push(new Produit(2, "Iphone X", 500));
    catalogue.push(new Produit(3, "Iphone 7", 700));
    catalogue.push(new Produit(4, "MacBook Pro", 2000));
    catalogue.push(new Produit(5, "MacBook Air", 1800));
    catalogue.push(new Produit(6, "Imac", 5000));
    catalogue.push(new Produit(7, "Ipad Air", 800));
    catalogue.push(new Produit(8, "Ipad Mini", 300));
    catalogue.push(new Produit(9, "Ipad Pro", 1500));
    catalogue.push(new Produit(10, "Apple Watch Nike", 200));
    catalogue.push(new Produit(11, "Apple Watch SE", 300));
    catalogue.push(new Produit(12, "Apple Watch Series", 400));
    var panier= new Array();
    
  
    function remplirCatalogue() {
          var cat= document.getElementById('cat');
      for (var i in catalogue) {
          var e= document.createElement("option");
          e.value=i;
              var txt= document.createTextNode(catalogue[i].designation);
              e.appendChild(txt);
          cat.appendChild(e);
      }
    };
  
  function ajouterCase(parent, txt) {
    var e= document.createElement("td");
    e.appendChild(document.createTextNode(txt));
    parent.appendChild(e);
  };
  
  function calculerTotal() {
    var tot= 0;
    for (var p in panier) {
      tot+= panier[p].prix;
    }
    return tot;
  };
  
  function ajouter() {
        var cat= document.getElementById('cat');
      var sel= cat.options[cat.selectedIndex].value;
      var prod= catalogue[sel];
      panier.push(prod);
      var ligne= document.createElement("tr");
          ajouterCase(ligne,prod.designation);
          ajouterCase(ligne,prod.prix);
      document.getElementById("pan").appendChild(ligne);
      document.getElementById("tot").innerHTML= calculerTotal();
  };

  remplirCatalogue();


let btnPopup = document.getElementsByClassName('fas fa-shopping-cart');
let overlay = document.getElementById('overlay');
let btnClose = document.getElementById('btnClose');

btnpanier.addEventlistener('click', openModal);
btnClose.addEventlistener('click', closePopup);

function openModal(){
  overlay.style.display ='block';
}

function closePopup(){
  overlay.style.display = 'none';
}


function ajouter()
{
    var code = parseInt(document.getElementById("id").value);
    var qte = parseInt(document.getElementById("qte").value);
    var prix = parseInt(document.getElementById("prix").value);
    var monPanier = new Panier();
    monPanier.ajouterArticle(code, qte, prix);
    var tableau = document.getElementById("tableau");
    var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
    if (longueurTab > 0)
    {
        for(var i = longueurTab ; i > 0  ; i--)
        {
            monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
            tableau.deleteRow(i);
        }
    }
    var longueur = monPanier.liste.length;
    for(var i = 0 ; i < longueur ; i++)
    {
        var ligne = monPanier.liste[i];
        var ligneTableau = tableau.insertRow(-1);
        var colonne1 = ligneTableau.insertCell(0);
        colonne1.innerHTML += ligne.getCode();
        var colonne2 = ligneTableau.insertCell(1);
        colonne2.innerHTML += ligne.qteArticle;
        var colonne3 = ligneTableau.insertCell(2);
        colonne3.innerHTML += ligne.prixArticle;
        var colonne4 = ligneTableau.insertCell(3);
        colonne4.innerHTML += ligne.getPrixLigne();
        var colonne5 = ligneTableau.insertCell(4);
        colonne5.innerHTML += "<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
    }
    document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
    document.getElementById("nbreLignes").innerHTML = longueur;
}

function supprimer(code)
{
    var monPanier = new Panier();
    var tableau = document.getElementById("tableau");
    var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
    if (longueurTab > 0)
    {
        for(var i = longueurTab ; i > 0  ; i--)
        {
            monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
            tableau.deleteRow(i);
        }
    }
    monPanier.supprimerArticle(code);
    var longueur = monPanier.liste.length;
    for(var i = 0 ; i < longueur ; i++)
    {
        var ligne = monPanier.liste[i];
        var ligneTableau = tableau.insertRow(-1);
        var colonne1 = ligneTableau.insertCell(0);
        colonne1.innerHTML += ligne.getCode();
        var colonne2 = ligneTableau.insertCell(1);
        colonne2.innerHTML += ligne.qteArticle;
        var colonne3 = ligneTableau.insertCell(2);
        colonne3.innerHTML += ligne.prixArticle;
        var colonne4 = ligneTableau.insertCell(3);
        colonne4.innerHTML += ligne.getPrixLigne();
        var colonne5 = ligneTableau.insertCell(4);
        colonne5.innerHTML += "<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
    }
    document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
    document.getElementById("nbreLignes").innerHTML = longueur;
}



function LignePanier (code, qte, prix)
{
    this.codeArticle = code;
    this.qteArticle = qte;
    this.prixArticle = prix;
    this.ajouterQte = function(qte)
    {
        this.qteArticle += qte;
    }
    this.getPrixLigne = function()
    {
        var resultat = this.prixArticle * this.qteArticle;
        return resultat;
    }
    this.getCode = function() 
    {
        return this.codeArticle;
    }
};

function Panier()
{
    this.liste = [];
    this.ajouterArticle = function(code, qte, prix)
    { 
        var index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code, qte, prix));
        else this.liste[index].ajouterQte(qte);
    }
    this.getPrixPanier = function()
    {
        var total = 0;
        for(var i = 0 ; i < this.liste.length ; i++)
            total += this.liste[i].getPrixLigne();
        return total;
    }
    this.getArticle = function(code)
    {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (code == this.liste[i].getCode()) return i;
        return -1;
    }
    this.supprimerArticle = function(code)
    {
        var index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
};

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}