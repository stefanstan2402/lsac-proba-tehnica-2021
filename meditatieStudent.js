const boboc_Ttoken = "a4c357f4-90dc-4e82-bef7-00ad9bd1e187";

fetch("https://proba2021.lsacbucuresti.ro/tutoring-classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
      'boboc-token': boboc_Ttoken
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var listMeditatii = json;
    var count = Object.keys(listMeditatii).length;
    console.log(listMeditatii);
    var final = `<br><br>`;
    for (var i = 0; i < count; i++) {
      final += `
    <li style="list-style-type:none;" class="filterDiv ${listMeditatii[i].subject.title}">

    <div class="card w-75 mt-2 mx-auto" style="background: linear-gradient(180deg, #B1E0FF 17.19%, #AEC0FF 71.35%); border-radius: 15px;">
      <br>
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <h2 class="scris">${listMeditatii[i].subject.title}</h2>
        </div>
        <div class="col-lg-2 col-md-2"></div>
        <div class="col-lg-2 col-md-2"></div>
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-2 col-md-2 col-sm-3 scris"  style="text-align:left">Prof. ${listMeditatii[i].teacher.lastname} ${listMeditatii[i].teacher.firstname}</div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6">
            <p class="scris">${listMeditatii[i].description}</p>
        </div>
        <div class="col-lg-3 col-md-3"></div>
        <div class="col-lg-3 col-md-3">
          <button type="submit" name="buttonEnrol" class="btn button-navbar scris" id="${listMeditatii[i].id}" onclick="
          const enrol = 'https://proba2021.lsacbucuresti.ro/tutoring-classes/${listMeditatii[i].id}/enrol';
            fetch(enrol, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                  'boboc-token': 'a4c357f4-90dc-4e82-bef7-00ad9bd1e187'
                },
              })
              .then((response) => response.json())
              .then((data) => {
                if(data.statusCode){
                  alert(data.message);
                } else {
                  alert('Inregistrare buna!');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          ">Inscrie-te</button>
        </div>
      </div>
      <br>
    </div>
    </li>
    `;
    }
      $('#meditation').append(final);
      //se face get la /tutoring-classes pentru a se prelua meditatiile tuturor profesorilor
      //in pagina, spre a fi vizibile studentilor. Apare si butonul de Inscrie-te, care
      //are inclus in atributul onclick fetch-ul POST la /#id/enrol, ce face post
      //la baza de date a meditatiei introduse de student ca inrolare, adica la care acesta
      //s-a inrolat.
  })

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
