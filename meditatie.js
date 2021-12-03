const boboc_Token = "a4c357f4-90dc-4e82-bef7-00ad9bd1e187";

//GET for subjects for profesori

fetch("https://proba2021.lsacbucuresti.ro/subjects")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var obj = json;
    var li = ``;
    //li tine practic elementele preluate dinamic de la /subjects si le introduce sub forma de optiuni pentru slectul cu id ul "subjects"
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id == 1) {
        li += `
        <option selected>${obj[i].title}</option>
      `;
      } else {
        li += `
        <option>${obj[i].title}</option>
      `;
      }
    }
    document.getElementById("subjects").innerHTML = li;
  });



//POST Meditatii


$(document).ready(function() {
  select = document.getElementById('subjects');

  for (subject in subjects) {
    select.add(new Option(subjects[subject]));
  };

  $('#incarcaMeditatie').click(function() {
    const materie = $('#subjects').val();
    const proiect = $('#inputProiect').val();
    var id_materie = 1;
    if (materie == "Fizica") {
      id_materie = 2;
    } else if (materie == "Informatica") {
      id_materie = 3;
    } else if (materie == "POO") {
      id_materie = 4;
    } else {
      id_materie = 1;
    }
    //se extrage id-ul preluat in urma slectarii optiunii de la butonul de select
    if (proiect.length < 20) {
      alert("Descrierea trebuie sa aiba minim 20 de cuvinte!");
      return;
    }

    if (materie && proiect) {

      fetch("https://proba2021.lsacbucuresti.ro/tutoring-classes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
            'boboc-token': boboc_Token
          },
          body: JSON.stringify({
            description: proiect,
            subject_id: id_materie
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.reload(true);
          //se va da reload la pagina pentru a aparea meditatia introdusa, mai exact pentru a se face si GET-ul de la /my/tutoring-classes
          //caci intai se face postul la /tutoring-classes apoi se salveaza in baza de date, urmand requestul pentru a prelua elementele
          //din baza de date, inclusiv cele abia adaugate
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Ambele campuri trebuie completate!");
    }
  });
});


//GET meditatii


fetch("https://proba2021.lsacbucuresti.ro/my/tutoring-classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
      'boboc-token': boboc_Token
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var listMeditatii = json;
    var count = Object.keys(listMeditatii).length; //lungimea obiectelor json, practic lungimea obiectelor-meditatii
    var final = `<br><br>`;
    for (var i = 0; i < count; i++) {
      final += `
    <li style="list-style-type:none; align">

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
      </div>
      <br>
    </div>
    </li>
    `;
    }
    $('#meditatie').append(final);
    //se adauga elementele de lista pentru a fi postate pe pagina
  })
