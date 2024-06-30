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
};

refs.btnFormSubmitEl.addEventListener("click", onBtnSubmit);

function onBtnSubmit(e) {
  // заборонили перезавантаження сторінки
  e.preventDefault();
  const name = refs.formInputName.value;
  const tel = refs.formInputTel.value;
  const email = refs.formInputEmail.value;
  //   console.log(name);

  if (name === "" && tel === "" && email === "") {
    console.log("Ghbdtn!");

    onInputTextError(
      refs.inputTextName,
      refs.inputTextName,
      refs.formInputName
    );
    // refs.inputTextName.textContent = "Обов'язкове поле для заповнення";
    // refs.inputTextName.style.color = "#ff3459";
    // refs.formInputName.style.border = "1px solid #ff3459";

    onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);

    // refs.inputTextTel.textContent = "Обов'язкове поле для заповнення";
    // refs.inputTextTel.style.color = "#ff3459";
    // refs.formInputTel.style.border = "1px solid #ff3459";

    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );

    // refs.inputTextEmail.textContent = "Обов'язкове поле для заповнення";
    // refs.inputTextEmail.style.color = "#ff3459";
    // refs.formInputEmail.style.border = "1px solid #ff3459";
  }
}

function onInputTextError(name, color, border) {
  name.textContent = "Обов'язкове поле для заповнення";
  color.style.color = "#ff3459";
  border.style.border = "1px solid #ff3459";
}
