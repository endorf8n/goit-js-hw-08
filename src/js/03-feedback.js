import throttle from 'lodash.throttle';
import storage from './localstorage';

const formEl = document.querySelector('.feedback-form');
let feedbackFormInfo = storage.load('feedback-form-state') || {};

const fillFormFields = () => {
  if (feedbackFormInfo) {
    for (const key in feedbackFormInfo) {
      formEl.elements[key].value = feedbackFormInfo[key];
    }
  } else return;
};

fillFormFields();

function onFormFieldTypeText(event) {
  const formFieldName = event.target.name;
  const formFieldValue = event.target.value.trim();

  feedbackFormInfo[formFieldName] = formFieldValue;
  storage.save('feedback-form-state', feedbackFormInfo);
}

function onFormFieldSubmit(event) {
  event.preventDefault();

  if (formEl.email.value === '' || formEl.message.value === '') {
    return alert('All form fields must be filled!');
  }
  console.log(feedbackFormInfo);

  event.target.reset();
  storage.remove('feedback-form-state');
  feedbackFormInfo = {};
}

formEl.addEventListener('input', throttle(onFormFieldTypeText, 500));
formEl.addEventListener('submit', onFormFieldSubmit);
