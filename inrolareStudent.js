fetch("https://proba2021.lsacbucuresti.ro/my/enrolments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
      'boboc-token': 'a4c357f4-90dc-4e82-bef7-00ad9bd1e187'
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var listInrol = json;
    var count = Object.keys(listInrol).length;
    //console.log(count);
    console.log(listInrol);
    var final = `<br><br>`;
    for (var i = 0; i < count; i++) {
      console.log(listInrol[i].subject.title)
      final += `
    <li style="list-style-type:none; align-center" id="${listInrol[i].id}">

    <div class="card w-75 mt-2 mx-auto" style="background: linear-gradient(180deg, #B1E0FF 17.19%, #AEC0FF 71.35%); border-radius: 40px;">
      <br>
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <h2 class="scris">${listInrol[i].subject.title}</h2>
        </div>
        <div class="col-lg-2 col-md-2"></div>
        <div class="col-lg-2 col-md-2"></div>
        <div class="col-lg-1 col-md-1"></div>
        <div class="col-lg-2 col-md-2 col-sm-3 scris"  style="text-align:left">Prof. ${listInrol[i].teacher.lastname} ${listInrol[i].teacher.firstname}</div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6">
            <p class="scris">${listInrol[i].description}</p>
        </div>
        <div class="col-lg-3 col-md-3"></div>
        <div class="col-lg-3 col-md-3">
          <button type="submit" name="buttonEnrol" class="btn button-navbar scris" onclick="
          const inrol = 'https://proba2021.lsacbucuresti.ro/my/enrolments/${listInrol[i].id}';
            fetch(inrol, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                  'boboc-token': 'a4c357f4-90dc-4e82-bef7-00ad9bd1e187'
                },
              })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                window.location.reload(false);
              })
              .catch((err) => {
                console.log(err);
              });
          ">Renunta!</button>
        </div>
      </div>
      <br>
    </div>
    </li>
    `;
    }
    $('#enrollare').append(final);
    //se face get la /my/enrolments, se obtin meditatiile la care studentul s-a inrolat, iar cand se apasa butonul de Renunta
    // se va face apel la onclick, care trimite la executia fetchului de delete. Acesta sterge data aferenta butonului din baza
    //de date, iar pentru a se vedea disparitia acesteia, se va da un refresh la pagina, iar astfel campul va disparea.
  })
