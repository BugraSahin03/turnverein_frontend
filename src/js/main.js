"use strict";

let alleEintraege = [];

//Steurt das schließen und öffnen vom Dialog Mitgliederhinzufügen 
const dialogAufrufe = function() {  
    //Mitglieder Hinzufügen
    var dialog = document.getElementById('DialogExample');  
    document.getElementById('show').onclick = () =>   dialog.show();         //Das ist der Button mit der Aufschrifft Mitglieder Hinzufügen
    document.getElementById('hide').onclick = () =>  dialog.close();         //Das ist der Button mit der Aufschrifft Schliesen 
    document.querySelector("#absenden").onclick = () => dialog.close();                   //Das ist der Button mit der Aufschrifft Hinzufügen

    //News & Aktuelles
    let dialogNews = document.getElementById("newsDialog");
    document.getElementById("newsButtonOpen").onclick = () => dialogNews.show();
    document.getElementById("newsButtonClose").onclick = () => dialogNews.close();
    document.getElementById("newsButtonSubmit").onclick = () => dialogNews.close();
   
    //Mitglieder Liste
    let dialogMitgliederListe = document.getElementById("auflistungVonMitgliedern"); 
    document.getElementById("mietgliederAuflisten").onclick = () => dialogMitgliederListe.show();
    document.getElementById("mietgliederAuflistenschliesen").onclick = () => dialogMitgliederListe.close();

    // Stundenplan
    let dialogStundenPlan = document.getElementById("stundenPlanDialog");
    document.getElementById("stundenplanVerwaltenButton").onclick = () => dialogStundenPlan.show();
    document.getElementById("stundenplanButtonSchliesen").onclick = () => dialogStundenPlan.close();
}; 
dialogAufrufe();


const absenden = function() {
    let form = document.querySelector(" #eingabeformular");
    let eingabe = {};
    form.addEventListener("submit", e => {
        e.preventDefault();
        eingabe = {
            name: e.target.elements.name.value,
            nachname: e.target.elements.nachname.value,
            geburtsdatum: e.target.elements.geburtsdatum.value,
            strasse: e.target.elements.strasse.value,
            hausnummer: e.target.elements.hausnummer.value,
            iban: e.target.elements.iban.value
        };        

        let eingabeFehler = datenValidieren(eingabe);           //ist ein array mit Fehlern drinnen 
        if (eingabeFehler.length === 0){
         
            mitgliederHtmlHinzufügen(eingabe);
         

            let bestehendeFehlerbox = document.querySelector(".fehlerbox");     //wir schauen ob es eine Fehlerbox gibt, wenn ja wird sie entfernt 
            if (bestehendeFehlerbox !== null){
                bestehendeFehlerbox.remove();
            }
            e.target.reset();
        }else{
            var dialog = document.getElementById('DialogExample');  
            dialog.show();
            let fehler = new Fehler("Folgende Felder wurden nicht Korrekt ausgefüllt", eingabeFehler);
            fehler.anzeigen();                
        }

        alleEintraege.push(eingabe);
    }
    ) 
    return eingabe;
}
absenden();


const datenValidieren = function(eingabe){
  let fehler = [];
  if (eingabe.name.trim() === ""){
    fehler.push("Name");
  }
  if (eingabe.nachname.trim() === ""){
    fehler.push("Nachname");
  }
  if (eingabe.strasse.trim() === ""){
    fehler.push("Strasse");
  }
  if (eingabe.hausnummer.trim() === ""){
    fehler.push("Hausnummer");
  }
  if (eingabe.iban.trim() === ""){
    fehler.push("IBAN");
  }
  if (eingabe.geburtsdatum === ""){
    fehler.push("Geburtsdatum");
  }
  return fehler;
}

const  newsAktuelles= function(){
    let form = document.querySelector("#newsFormular");
    form.addEventListener("submit", e => {
        e.preventDefault();
        let text = e.target.elements.news.value;
        newsAktuellesHtmlHinzufügen(text);
        e.target.reset();
    })
}
newsAktuelles();

const newsAktuellesHtmlHinzufügen = function(text){
    
        // es wsoll ein Timesatamp aufescghebene werden von wann es gemacht wurde     
    let article = document.createElement("article");
    article.textContent = text;
    let hr = document.createElement("hr");
    article.insertAdjacentElement("afterbegin", hr);
    
    let htmlEinbindung = document.getElementById("newsEinfugen");
    htmlEinbindung.insertAdjacentElement("afterbegin", article);
}

//HTML in den Dialog einfügen 
const mitgliederHtmlHinzufügen = function(objektMitEinträgen){
    let spaniban = document.createElement("span");
    let spanname = document.createElement("span");
    let spannachname = document.createElement("span");
    let spangeburtsdatum = document.createElement("span");
    let spanstrasse = document.createElement("span");
    let spanhausnummer = document.createElement("span");

    let loeschbutton = document.createElement("button");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.setAttribute("data-timestamp", Date.now());

    loeschbutton.textContent = "X";
    loeschbutton.setAttribute("id", "mitgliedEntfernen");
    loeschbutton.setAttribute("class", "standard"); 

    
    li.insertAdjacentElement("afterbegin", spaniban);
    li.insertAdjacentElement("afterbegin", spanhausnummer);
    li.insertAdjacentElement("afterbegin", spanstrasse);
    li.insertAdjacentElement("afterbegin", spangeburtsdatum);
    li.insertAdjacentElement("afterbegin", spannachname);
    li.insertAdjacentElement("afterbegin", spanname);
    li.insertAdjacentElement("beforeend", loeschbutton);
    ul.insertAdjacentElement("afterbegin", li);
    
    spaniban.textContent= " " + objektMitEinträgen.iban;
    spanhausnummer.textContent=" " + objektMitEinträgen.hausnummer;
    spanstrasse.textContent=" " + objektMitEinträgen.strasse;
    spangeburtsdatum.textContent=" " + objektMitEinträgen.geburtsdatum;
    spanname.textContent = objektMitEinträgen.name;
    spannachname.textContent = " " + objektMitEinträgen.nachname;

    let htmlEinbindung = document.getElementById("eintraegeHier");
    htmlEinbindung.insertAdjacentElement("afterend", ul);

    mitgliedEntfernenButton(li);

}

//Mitglied auswählen durch den Timestamp & Entfernen
const mitgliedEntfernenButton = function(){
    let button = document.getElementById("mitgliedEntfernen");
    button.onclick = e => {
        let test = e.target.parentElement
        
        test.remove();
    }
}

const stundenPlan = function(){
    
}

// Funktion zum Parsen der XML-Datei
function parseXML(xml) {
    // Mitgliederdaten aus der XML-Datei extrahieren
    let members = [];
    $(xml).find('member').each(function () {
      let name = $(this).find('Name').text();
      let surname = $(this).find('Nachname').text();
      let street = $(this).find('Strasse').text();
      let houseNumber = $(this).find('Hausnummer').text();
      let birthDate = $(this).find('Geburtsdatum').text();
      let iban = $(this).find('Iban').text();
  
      members.push({ name, surname, street, houseNumber, birthDate, iban });
    });
  
    console.log(members);
    xmlHtmlGenerieren(members);
    return members;

}

const xmlHtmlGenerieren = function(arrayMitDaten){
    
    arrayMitDaten.forEach((e)=> {
      let spaniban = document.createElement("span");
      let spanname = document.createElement("span");
      let spannachname = document.createElement("span");
      let spangeburtsdatum = document.createElement("span");
      let spanstrasse = document.createElement("span");
      let spanhausnummer = document.createElement("span");
  
      let loeschbutton = document.createElement("button");
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.setAttribute("data-timestamp", Date.now());
      
      loeschbutton.textContent = "X";
      loeschbutton.setAttribute("id", "mitgliedEntfernen");
      loeschbutton.setAttribute("class", "standard"); 

      li.insertAdjacentElement("afterbegin", spaniban);
      li.insertAdjacentElement("afterbegin", spanhausnummer);
      li.insertAdjacentElement("afterbegin", spanstrasse);
      li.insertAdjacentElement("afterbegin", spangeburtsdatum);
      li.insertAdjacentElement("afterbegin", spannachname);
      li.insertAdjacentElement("afterbegin", spanname);
      li.insertAdjacentElement("beforeend", loeschbutton);
      ul.insertAdjacentElement("afterbegin", li);     
      
      spaniban.textContent= " " + e.iban;
      spanhausnummer.textContent=" " + e.houseNumber;
      spanstrasse.textContent=" " + e.street;
      spangeburtsdatum.textContent=" " + e.birthDate;
      spanname.textContent = e.name;
      spannachname.textContent = " " + e.surname;

      let htmlEinbindung = document.getElementById("eintraegeHier");
      htmlEinbindung.insertAdjacentElement("afterend", ul);
  
      mitgliedEntfernenButton(li);

      
    })
    
}
  // Funktion zum Exportieren von Mitgliederdaten als XML-Datei
  function exportMembers(members) {
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n<members>\n';
  
    // Mitgliederdaten in XML-Format umwandeln
    members.forEach(member => {
      xmlString += `  <member>\n    <name>${name}</name>\n    <surname>${nachname}</surname>\n    <street>${strasse}</street>\n    <houseNumber>${hausnummer}</objektMitEinträgen.hausnummer>\n    <birthDate>${geburtsdatum}</birthDate>\n  </member>\n`;
    });
  
    xmlString += '</members>';
  
    // XML-Datei zum Download anbieten
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlString));
    element.setAttribute('download', 'members.xml');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  // Funktion zum Importieren von Mitgliederdaten aus einer XML-Datei
  function importMembers() {
    let input = document.createElement('input');
    input.type = 'file';
  
    input.onchange = function () {
      let file = this.files[0];
  
      let reader = new FileReader();
      reader.readAsText(file);
  
      reader.onload = function () {
        let members = parseXML(reader.result);
  
        // Mitgliederdaten in Ihre Anwendung importieren
      };
    };
  
    input.click();
  }
  
  // Event-Listener für die Import- und Export-Buttons hinzufügen
  document.getElementById('import-btn').addEventListener('click', importMembers);
  document.getElementById('export-btn').addEventListener('click', function () { exportMembers(members); });