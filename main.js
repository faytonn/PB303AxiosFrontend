
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


        axios.delete(`https://localhost:7049/api/Users?id=${element.id}`)
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
