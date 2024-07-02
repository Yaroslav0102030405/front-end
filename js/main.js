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
const CHAT_ID = "-1002084469289";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
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
        // this.name.value = "";
        // this.email.value = "";
        // this.tel.value = "";
        refs.btnFormSubmitEl.style.backgroundColor = "#50C878";
        refs.btnFormSubmitEl.textContent = "Відправлено!";

        refs.successMessage.innerHTML = "Менеджер зв`яжеться через 15 хвилин!";

        // success.innerHTML =
        //   '<p class="message"><p>Менеджер з вами зв`яжеться <br /> через 15 хвилин!</p>';
        // success.style.display = "block";
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Конец");
      });
  } else if (name !== "" && tel !== "" && email !== "") {
    // console.log(tel.length);
    // console.log(email.includes("@"));
    if (tel.length === 9) {
      onInputTextSuccess(refs.inputTextName, refs.formInputName);
      onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
      onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
    } else if (tel.length < 9) {
      onInputTextSuccess(refs.inputTextName, refs.formInputName);
      onInputTextError2(
        refs.inputTextTel,
        refs.inputTextTel,
        refs.formInputTel
      );
    }

    if (email.includes("@")) {
      onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
    } else {
      onInputTextError3(
        refs.inputTextEmail,
        refs.inputTextEmail,
        refs.formInputEmail
      );
    }
  } else if (name === "" && tel === "" && email === "") {
    // console.log("Ghbdtn!");
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
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
  } else if (name !== "" && tel !== "" && email === "") {
    if (tel.length < 9) {
      onInputTextSuccess(refs.inputTextName, refs.formInputName);
      onInputTextError3(
        refs.inputTextTel,
        refs.inputTextTel,
        refs.formInputTel
      );
      onInputTextError(
        refs.inputTextEmail,
        refs.inputTextEmail,
        refs.formInputEmail
      );
    } else {
      onInputTextSuccess(refs.inputTextName, refs.formInputName);
      onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
      onInputTextError(
        refs.inputTextEmail,
        refs.inputTextEmail,
        refs.formInputEmail
      );
    }
  } else if (name !== "" && tel !== "" && email !== "") {
    if (email.includes("@")) {
      onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
    } else {
      onInputTextError3(
        refs.inputTextEmail,
        refs.inputTextEmail,
        refs.formInputEmail
      );
    }
  } else if (name === "" && tel === "" && email !== "") {
    if (email.includes("@")) {
      onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
      onInputTextError(
        refs.inputTextName,
        refs.inputTextName,
        refs.formInputName
      );
      onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    } else {
      onInputTextError3(
        refs.inputTextEmail,
        refs.inputTextEmail,
        refs.formInputEmail
      );
      onInputTextError(
        refs.inputTextName,
        refs.inputTextName,
        refs.formInputName
      );
      onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    }
  } else if (name === "" && tel !== "" && email === "") {
    if (tel.length === 9) {
      onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
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
    } else if (tel.length < 9) {
      onInputTextError2(
        refs.inputTextTel,
        refs.inputTextTel,
        refs.formInputTel
      );
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
    }
  } else if (name === "" && tel !== "" && email !== "") {
    if (tel.length === 9 && email.includes("@")) {
      onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
      onInputTextError(
        refs.inputTextName,
        refs.inputTextName,
        refs.formInputName
      );
      onInputTextSuccess(refs.inputTextEmail, refs.formInputEmail);
    } else if (tel.length < 9) {
      onInputTextError2(
        refs.inputTextTel,
        refs.inputTextTel,
        refs.formInputTel
      );
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
    }
  }
}

function onInputTextSuccess(color, border) {
  //   name.textContent = "Обов'язкове поле для заповнення";
  color.style.color = "#ff3459";
  border.style.border = "1px solid green";
}

function onInputTextError(name, color, border) {
  name.textContent = "Обов'язкове поле для заповнення";
  color.style.color = "#ff3459";
  border.style.border = "1px solid #ff3459";
}

function onInputTextError2(name, color, border) {
  name.textContent = "Поле має містити не менше 9 символів";
  color.style.color = "#ff3459";
  border.style.border = "1px solid #ff3459";
}

function onInputTextError3(name, color, border) {
  name.textContent = "Поле має містити обов'язковий @ символ";
  color.style.color = "#ff3459";
  border.style.border = "1px solid #ff3459";
}

// function onTelegram(e) {
//   e.preventDefault();

//   const name = refs.formInputName.value;
//   const tel = refs.formInputTel.value;
//   const email = refs.formInputEmail.value;

//   if (
//     name !== "" &&
//     tel !== "" &&
//     tel.length === 9 &&
//     email !== "" &&
//     email.includes("@")
//   ) {
//     let message = `<b>Заявка с сайта Бандерогусь</b>\n`;
//     message += `<b>Отправитель: </b> ${this.name.value}\n`;
//     message += `<b>Почта: </b> ${this.email.value}\n`;
//     //   message += `<b>Телефон: </b> ${this.phone.value}\n`;
//     //   message += `<b>Коментар: </b> ${this.comment.value}`;

//     axios
//       .post(URI_API, {
//         chat_id: CHAT_ID,
//         parse_mode: "html",
//         text: message,
//       })
//       .then((res) => {
//         this.name.value = "";
//         this.email.value = "";
//         //   this.phone.value = '';
//         //   this.comment.value = '';
//         //   this.topic.value = '';
//         //   this.checkbox.value = '';

//         success.innerHTML =
//           '<p class="message">Повідомлення відправлено!</p><p>Через 15 хвилин з вами зв`яжеться менеджер!</p>';
//         success.style.display = "block";
//       })
//       .catch((error) => {
//         console.varn(error);
//       })
//       .finally(() => {
//         console.log("Конец");
//       });
//   }
// }
