const list = document.querySelector(".list");

axios
  .get("https://localhost:7049/api/Users")
  .then((data) => {
    console.log(data);

    data.data.forEach((element) => {
      const btn = document.createElement("button");
      btn.innerText = "delete";

      btn.addEventListener("click", (e) => {
        e.preventDefault();

        axios.delete(`https://localhost:7049/api/Users?id=${element.id}`);
      });
      const li = document.createElement("li");
      li.innerText = `${element.fullname} ${element.email}`;

      li.appendChild(btn);

      list.appendChild(li);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

const form = document.querySelector(".form");
const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phoneNumber");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (confirmPasswordInput.value != passwordInput.value) {
    alert("Passwordlar eyni deyil");
    return;
  }

  e.preventDefault();

  axios.post("https://localhost:7049/api/Users", {
    fullname: fullnameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
    phoneNumber: phoneInput.value,
  });

  alert(`User ugurla yaradildi-${fullnameInput.value} `);

  fullnameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  phoneNumber.value = "";

  //  form.reset();
});



const loginForm=document.querySelector(".loginForm")
const loginEmailInput = document.querySelector("#loginEmail");
const loginPasswordInput = document.querySelector("#loginPassword");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  axios.get("https://localhost:7049/api/Users").then((response) => {
    const users = response.data;
    const enteredEmail = loginEmailInput.value;
    const enteredPassword = loginPasswordInput.value;

    let userExists = false;
    let passwordMatches = false;

    users.forEach((user) => {
      if (user.email === enteredEmail) {
        userExists = true;
        if (user.password === enteredPassword) {
          passwordMatches = true;
        }
      }
    });

    if (!userExists) {
      alert("No such email found. Please check your email.");
    } else if (!passwordMatches) {
      alert("Incorrect password. Please try again.");
    } else {
      alert("Login successful!");
    }

    loginEmailInput.value = "";
    loginPasswordInput.value = "";
  });
});


//nice mueheheh ui duzeltsen pis olmaz ayri sehifede edim onda gerek? olar tamamm cox sag olllsdu xosduuu