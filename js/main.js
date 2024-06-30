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

  if (name == "" && tel == "" && email == "") {
    console.log("Ghbdtn!");

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
    onInputTextSuccess(refs.inputTextName, refs.formInputName);
    onInputTextSuccess(refs.inputTextTel, refs.formInputTel);
    // onInputTextError(refs.inputTextTel, refs.inputTextTel, refs.formInputTel);
    onInputTextError(
      refs.inputTextEmail,
      refs.inputTextEmail,
      refs.formInputEmail
    );
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
