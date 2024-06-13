//Définir les variables
var myInput = document.getElementById('psw');
var letter = document.getElementById('letter');
var capital = document.getElementById('capital');
var number = document.getElementById('number');
var special = document.getElementById('special');
var length = document.getElementById('length');
var strengthMessage = document.getElementById("strengthMessage");
// Variables pour la limitation des tentatives
var attemptCount = 0;
var maxAttempts = 4;
//l'affichage de la barre des consignes
myInput.onfocus = function(){ 
    document.getElementById("message").style.display = "block"  
}
//le masquage de la barre des consignes
myInput.onblur = function(){ 
    document.getElementById("message").style.display = "none"  
}
//lors de la frappe
myInput.onkeyup = function(){ 
    //valider les minuscules
   var lowerCaseLetters = /[a-z]/g 
   if(myInput.value.match(lowerCaseLetters)){
    //si le mot de passe contient une minuscule
    letter.classList.remove('invalid');
    letter.classList.add('valid');
   } else {
    //sinon
    letter.classList.remove('valid'); 
    letter.classList.add('invalid');
   }
   //valider les majuscules
   var upperCaseLetters = /[A-Z]/g 
   if(myInput.value.match(upperCaseLetters)){
    //si le mot de passe contient une majuscule
    capital.classList.remove('invalid');
    capital.classList.add('valid');
   } else {
    //sinon
    capital.classList.remove('valid'); 
    capital.classList.add('invalid');
   }
    //valider les chiffres
    var numbers = /[0-9]/g 
    if(myInput.value.match(numbers)){
     //si le mot de passe contient un chiffre
     number.classList.remove('invalid');
     number.classList.add('valid');
    } else { 
     //sinon
     number.classList.remove('valid'); 
     number.classList.add('invalid');
    }
    // Valider les caractères spéciaux
     var specialCharacters = /[\!\@\#\$\%\^\&\*\/\§\.\<\>\µ\£\¨\&\'\(\\-\_\)\=\+\?]/g;
    if(myInput.value.match(specialCharacters)) {  
    special.classList.remove("invalid");
    special.classList.add("valid");
    } else {
    special.classList.remove("valid");
    special.classList.add("invalid");
    }
    //valider la longueur
    if(myInput.value.length >= 8){
     //si le mot de passe contient 8 caractères au plus
     length.classList.remove('invalid');
     length.classList.add('valid');
    } else {
     //sinon
     length.classList.remove('valid'); 
     length.classList.add('invalid');
    }
} 
// Fonction pour évaluer la robustesse du mot de passe
function evaluatePasswordStrength(password) {
    var strength = 0;
  
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[\!\@\#\$\%\^\&\*\/\§\.\<\>\µ\£\¨\&\'\(\\-\_\)\=\+\?]/)) strength += 1;
    if (password.length >= 8) strength += 1;
  
    return strength;
  }
  // Afficher le niveau de robustesse du mot de passe lors du clic sur "vérifier"
document.getElementById("passwordForm").onsubmit = function(event) {
    event.preventDefault();// Empêche la soumission du formulaire pour afficher le message de robustesse
    attemptCount++;
    if (attemptCount >= maxAttempts) {
        alert("Nombre maximum de tentatives atteint. Veuillez réessayer plus tard.");
        return;
      }
    var password = myInput.value;
    var strength = evaluatePasswordStrength(password);
    var strengthText = "";
    var body = document.body;

  switch (strength) {
    case 0:
    case 1:
      strengthText = "Très faible";
      strengthMessage.style.color = "white";
      body.style.backgroundColor = "red";
      break;
    case 2:
      strengthText = "Faible";
      strengthMessage.style.color = "white";
      body.style.backgroundColor = "orange";
      break;
    case 3:
      strengthText = "Moyen";
      strengthMessage.style.color = "black";
      body.style.backgroundColor = "yellow";
      break;
    case 4:
      strengthText = "Fort";
      strengthMessage.style.color = "white";
      body.style.backgroundColor = "lightgreen";
      break;
    case 5:
      strengthText = "Très fort";
      strengthMessage.style.color = "white";
      body.style.backgroundColor = "green";
      break;
  }

  strengthMessage.textContent = "Niveau de robustesse du mot de passe : " + strengthText;
  
}