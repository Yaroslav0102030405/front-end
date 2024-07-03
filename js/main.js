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
};

const TOKEN = "6470796582:AAEzk1WSMbpsvtk_zU8M9E4AEclnoD5ovB8";
// const CHAT_ID = "-1002084469289";
const CHAT_ID = "6163382681";
const URI_API = `https://t.me/rgb_hr/bot${TOKEN}/sendMessage`;
const success = document.getElementById("success");

refs.formEl.addEventListener("submit", onBtnSubmit);
// refs.formEl.addEventListener("submit", onTelegram);

function onBtnSubmit(e) {
  // заборонили перезавантаження сторінки
  e.preventDefault();
  const name = refs.formInputName.value;
  const tel = refs.formInputTel.value;
  const email = refs.formInputEmail.value;
  const select = refs.selectUkOrPl.value;
  console.log(select);

  if (
    name !== "" &&
    tel !== "" &&
    tel.length === 9 &&
    email !== "" &&
    email.includes("@")
  ) {
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
  } else if (name !== "" && tel === "" && email === "") {
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
  } else if (name !== "" && tel !== "" && tel.length < 9 && email === "") {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextError2(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
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
    onInputTextError2(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError3(
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
    email !== "" &&
    email.includes("@")
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
    onInputTextSuccess(
      // refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    onInputTextError3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (
    name !== "" &&
    tel === "" &&
    email !== "" &&
    !email.includes("@")
  ) {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError3(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name !== "" && tel === "" && email !== "" && email.includes("@")) {
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    refs.inputTextName.innerHTML = "";
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
  }
}

function onInputTextSuccess(color, border) {
  // name.textContent = " Вірно!✔️";
  color.style.color = "#ff3459";
  border.style.border = "1px solid #50C878";
}

function onInputTextError(name, color, border) {
  name.textContent = "Обов'язкове поле для заповнення";
  color.style.color = "#FF3131";
  border.style.border = "1px solid #FF3131";
}

function onInputTextError2(name, color, border) {
  name.textContent = "Поле має містити не менше 9 символів";
  color.style.color = "#FF3131";
  border.style.border = "1px solid #FF3131";
}

function onInputTextError3(name, color, border) {
  name.textContent = "Поле має містити обов'язковий @ символ";
  color.style.color = "#FF3131";
  border.style.border = "1px solid #FF3131";
}
