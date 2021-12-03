//CONTACT form POST Fetch

const bobocToken = "a4c357f4-90dc-4e82-bef7-00ad9bd1e187";
const url = "https://proba2021.lsacbucuresti.ro/contact-requests";

async function postFormDataAsJson({
  url,
  formData
}) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'Authorization': 'Bearer ' + bobocToken,
      'boboc-token': bobocToken
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({
      url,
      formData
    });

    console.log({
      responseData
    });
    alert("Mesaj inregistrat cu succes!");
  } catch (error) {
    console.error(error);
  }
}

const exampleForm = document.getElementById("contact-form");
exampleForm.addEventListener("submit", handleFormSubmit);

//apelul functiilor care executa fetchul, intai parsand datele ca json
//apoi apeland handleFormSubmit, care este functia ce face apel la
 //api, ce se executa cand se intra pe submit

//REGISTER FORM POST Fetch


var e = document.getElementById("selectRegister");

function registerUser(event) {

  //afisez erori intalnite pana i.n executia apelului la backend

  if (document.getElementById("inputPasswdRegister").value != document.getElementById("inputPasswdConfRegister").value) {
    alert("Parolele nu coincid!");
    return;
  }

  if (document.getElementById("inputPasswdRegister").value.length < 8) {
    alert("Parola trebuie sa aiba minim 8 caractere");
    return;
  }

  if (e.options[e.selectedIndex].value == "student" && document.getElementById("inputEmailRegister").value.endsWith("@stud.upb.ro") == false) {
    alert("Nu se poate face logarea ca STUDENT ! Te rugam, selecteaza optiunea de student sau verifica formatul mailului");
    return;
  }

  if (e.options[e.selectedIndex].value == "teacher" && document.getElementById("inputEmailRegister").value.endsWith("@onmicrosoft.upb.ro") == false) {
    alert("Nu se poate face logarea ca PROFESOR! Te rugam, selecteaza optiunea de profesor sau verifica formatul mailului");
    return;
  }

  fetch("https://proba2021.lsacbucuresti.ro/auth/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'boboc-token': bobocToken
      },
      body: JSON.stringify({
        email: document.getElementById("inputEmailRegister").value,
        firstname: document.getElementById("inputPrenumeRegister").value,
        lastname: document.getElementById("inputNumeRegister").value,
        password: document.getElementById("inputPasswdRegister").value,
        confirmation_password: document.getElementById("inputPasswdConfRegister").value,
        role: e.options[e.selectedIndex].value //extrag valoarea din caseta de select
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.statusCode) {
        alert(data.message ? data.message : "The server encountered an error. Please try again later");
        //intampin erorile date de backend si le afisez ca alert
      } else {
        alert("Inregistrare facuta cu succes! Acum va puteti loga.")
      }
    })
    .catch((err) => {
      console.error(err);
      alert("This is a warning message!");
    })

}

window.onload = function() {
  document.forms[0]
    .addEventListener("submit", registerUser)
}




//LOGIN FORM POST fetch



const form = {
  email: document.getElementById("inputEmailLogin"),
  password: document.getElementById("inputPasswdLogin"),
  submit: document.getElementById("incarcaLogin")
};
let button = form.submit.addEventListener("click", (e) => {

  //se executa fetchul cand se apasa click pe buton

  const login = "https://proba2021.lsacbucuresti.ro/auth/login";

  fetch(login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'boboc-token': bobocToken
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.statusCode) {
        alert(data.message ? data.message : "The server encountered an error. Please try again later");
        //afisez erorile date de backend
      } else {
        const value = data.token;
        window.localStorage.setItem('token', value);
        if (document.getElementById("inputEmailLogin").value.endsWith("@stud.upb.ro")) {
          location.href = "indexStudent.html";
        } else if (document.getElementById("inputEmailLogin").value.endsWith("@onmicrosoft.upb.ro")) {
          location.href = "indexProf.html";
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});



//GET REVIEWS fetch


fetch("https://proba2021.lsacbucuresti.ro/reviews")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    //retin o copie a obiectului JSON
    //pe care o prelucrez pentru a extrage datele
    var obj = json;
    var li = ``;
    //acest element li practic tine in el modul cum se creeaza un card in html
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id == 1) {
        li += `
      <div class="carousel-item active">
              <div class="col-md-6">
                <div class="card card-body constraints mx-auto" style="background: linear-gradient(180deg, #B1E0FF 17.19%, #AEC0FF 71.35%); border-radius:20px;">
                  <div>
                    <div class="row">
                      <div class="col-md-3 col-sm-3">
                        <img src="images/stud.png" alt="student">
                      </div>
                      <div class="col-md-6 col-sm-6">
                        <h4 class="card-title scris">${obj[i].user.firstname}:</h4>
                      </div>
                    </div>
                    <br>
                    <br>
                    <div class="row">
                      <div class="col-md-12 col-sm-12">
                        <h4 class="card-text text-left scris">${obj[i].message}</h4>
                        <br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `;
      } else {
        li += `
      <div class="carousel-item">
              <div class="col-md-6">
                <div class="card card-body constraints mx-auto" style="background: linear-gradient(180deg, #B1E0FF 17.19%, #AEC0FF 71.35%); border-radius:20px;">
                  <div>
                    <div class="row">
                      <div class="col-md-3 col-sm-3">
                        <img src="images/stud.png" alt="student">
                      </div>
                      <div class="col-md-6 col-sm-6">
                        <h4 class="card-title scris">${obj[i].user.firstname}:</h4>
                      </div>
                    </div>
                    <br>
                    <br>
                    <div class="row">
                      <div class="col-md-12 col-sm-12">
                        <h4 class="card-text text-left scris">${obj[i].message}</h4>
                        <br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `;
      }
    }
    document.getElementById("cardsGet").innerHTML = li;

    //Code for carousel cards
    //face ca la mutarea la stanga sau la dreapta, dupa 10 secunde sau cand
    //userul apasa prev sau next, sa mute cu cate un card la stanga sau
    //dreapta

    $('#recipeCarousel').carousel({
      interval: 10000
    })

    $('.carousel-item').each(function() {
      var minPerSlide = 2;
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });

  });
