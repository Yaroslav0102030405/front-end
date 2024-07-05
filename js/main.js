const refs = {
  formEl: document.querySelector(".form"),
  btnFormSubmitEl: document.querySelector(".btn-submit"),
  formInputName: document.querySelector(".form-input-name"),
  formInputTel: document.querySelector(".form-input-tel"),
  formInputEmail: document.querySelector(".form-input-email"),
  formInput: document.querySelector(".form-input"),
  InputNameText: document.querySelector(".input-name-text"),
  inputTextName: document.querySelector(".input-text-name"),
  inputTextTel: document.querySelector(".input-text-tel"),
  inputTextEmail: document.querySelector(".input-text-email"),
  selectUkOrPl: document.querySelector(".select"),
  successMessage: document.querySelector(".success-message"),

  inputs: document.querySelectorAll("input"),
};

const patterns = {
  name: /^[a-z\d]{5,12}$/,
  tel: /^\d{9}$/,
  email: /^([a-z\d\/.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};

function validate(field, regex) {
  // console.log(regex.test(field.value));
  if (regex.test(field.value)) {
    field.classList.add("valid");
    field.classList.remove("invalid");

    // field.classList.remove("error");
  } else {
    field.classList.add("invalid");
  }
}

refs.inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    // console.log(e.target.attributes.name.value);
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});

const form = document.getElementById("form");
const result = document.getElementById("result");
const TOKEN = "6470796582:AAEzk1WSMbpsvtk_zU8M9E4AEclnoD5ovB8";
const CHAT_ID = "-1002084469289";
// const CHAT_ID = "6163382681";
// const URI_API = `https://t.me/rgb_hr/bot${TOKEN}/sendMessage`;
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.getElementById("success");

refs.formEl.addEventListener("submit", onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  const name = refs.formInputName.value;
  const tel = refs.formInputTel.value;
  const email = refs.formInputEmail.value;
  const select = refs.selectUkOrPl.value;
  // console.log(select);

  if (
    name !== "" &&
    name.length > 5 &&
    tel !== "" &&
    tel.length === 9 &&
    email !== "" &&
    email.includes("@") &&
    email.includes(".")
  ) {
    // отправка на пошту
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
        } else {
          console.log(response);
          result.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.log(error);
        // result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        // form.reset();
        setTimeout(() => {
          // result.style.display = "none";
        }, 3000);
      });
    // отправка в телеграм

    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
    refs.inputTextName.innerHTML = "";
    refs.inputTextTel.innerHTML = "";
    refs.inputTextEmail.innerHTML = "";

    let message = `<b>Заявка с сайта на курс ФРОНТЕНД</b>\n`;
    message += `<b>Відправник: </b> ${this.name.value}\n`;
    message += `<b>Телефон: </b> ${this.tel.value}\n`;
    message += `<b>Пошта: </b> ${this.email.value}\n`;
    message += `<b>uk / pl: </b> ${select}\n`;

    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        form.reset();
        refs.btnFormSubmitEl.style.backgroundColor = "#50C878";
        refs.btnFormSubmitEl.textContent = "Відправлено!";
        refs.successMessage.innerHTML = "Менеджер зв`яжеться через 15 хвилин!";
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Конец");
      });
    // якщо всі поля пусті
  } else if (name === "" && tel === "" && email === "") {
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name !== "" && name.length > 5 && tel === "" && email === "") {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    // refs.inputTextName.textContent = " Вірно!✔️";
    // refs.inputTextName.style.color = "white";
    refs.inputTextName.innerHTML = "";

    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name !== "" && name.length < 5 && tel === "" && email === "") {
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    // refs.inputTextName.textContent = " Вірно!✔️";
    // refs.inputTextName.style.color = "white";
    // refs.inputTextName.innerHTML = "";

    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name !== "" && tel !== "" && tel.length < 9 && email === "") {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name !== "" && tel !== "" && tel.length === 9 && email === "") {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    refs.inputTextTel.innerHTML = "";
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name !== "" &&
    tel !== "" &&
    tel.length < 9 &&
    email !== "" &&
    !email.includes("@")
  ) {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name !== "" &&
    tel !== "" &&
    tel.length === 9 &&
    email !== "" &&
    !email.includes("@")
  ) {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    refs.inputTextTel.innerHTML = "";
    onInputTextError3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name !== "" &&
    tel !== "" &&
    tel.length === 9 &&
    email === "" &&
    email.includes("@")
  ) {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    refs.inputTextTel.innerHTML = "";
    // onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name === "" &&
    tel === "" &&
    email !== "" &&
    !email.includes("@")
  ) {
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name === "" && tel === "" && email !== "" && email.includes("@")) {
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextSuccess(
      // refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
    refs.inputTextEmail.innerHTML = "";
  } else if (name === "" && tel !== "" && tel.length < 9 && email === "") {
    onInputTextError2(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name === "" && tel !== "" && tel.length === 9 && email === "") {
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    refs.inputTextTel.innerHTML = "";
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name === "" &&
    tel !== "" &&
    tel.length < 9 &&
    email !== "" &&
    !email.includes("@")
  ) {
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name === "" &&
    tel !== "" &&
    tel.length === 9 &&
    email !== ""
    // &&
    // email.includes("@")
  ) {
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    refs.inputTextTel.innerHTML = "";
    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextSuccess3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name !== "" &&
    tel === "" &&
    tel.length === 9 &&
    email !== "" &&
    !email.includes("@")
  ) {
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    refs.inputTextTel.innerHTML = "";
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    onInputTextError3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
    // }
    // else if (
    //   name !== "" &&
    //   tel === "" &&
    //   email !== "" &&
    //   !email.includes("@")
    // ) {
    //   onInputTextSuccess(refs.inputTextName, refs.formInputName);
    //   refs.inputTextName.innerHTML = "";
    //   onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    //   onInputTextError3(
    //     refs.inputTextEmail,
    //     refs.inputTextEmail,
    //     refs.formInputEmail
    //   );
  } else if (name !== "" && name.length < 5 && tel === "" && email !== "") {
    // onInputTextError(
    //   refs.inputTextName,
    //   refs.inputTextName,
    //   refs.formInputName
    // );
    // refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    // onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
  } else if (name !== "" && name.length > 5 && tel === "" && email !== "") {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    // refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    // onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
  } else if (name !== "" && name.length < 5 && tel === "" && email !== "") {
    // onInputTextError(
    //   refs.inputTextName,
    //   refs.inputTextName,
    //   refs.formInputName
    // );
    // refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    // onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
  }
  // else if (
  //   name !== "" &&
  //   name.length < 5 &&
  //   tel !== "" &&
  //   tel.length < 9 &&
  //   email !== ""
  // ) {
  //   // onInputTextError(
  //   //   refs.inputTextName,
  //   //   refs.inputTextName,
  //   //   refs.formInputName
  //   // );
  //   // refs.inputTextName.innerHTML = "";
  //   // onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
  //   // onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
  // }
}

// _______---------------------------

function onInputTextSuccess(color, border) {
  // name.textContent = " Вірно!✔️";
  color.style.color = "#ff3459";
  border.style.border = "1px solid #50C878";
}

function onInputTextError(name, color, border) {
  // name.textContent = "Обов'язкове поле для заповнення";
  // color.style.color = "#FF3131";
  // border.style.border = "1px solid #FF3131";
  // name.style.opacity = 1;
  // name.style.height = "auto";
  // name.style.marginBottom = "10px";

  color.classList.add("error-color");
  border.classList.add("error-border");
  name.classList.add("error-name");
}

// function onInputTextError2(name, color, border) {
//   name.textContent = "Телефон повинен містити тільки 9 цифр";
//   // color.style.color = "#FF3131";
//   // border.style.border = "1px solid #FF3131";
//   color.classList.add("error-color");
//   border.classList.add("error-border");
//   // name.classList.add("error-name");
// }

// function onInputTextError3(name, color, border) {
//   name.textContent = "E-mail повинен мати правильну форму";
//   // color.style.color = "#FF3131";
//   // border.style.border = "1px solid #FF3131";

//   color.classList.add("error-color");
//   border.classList.add("error-border");
//   // name.classList.add("error-name");
// }
