import throttle from 'lodash.throttle';
import storage from './localstorage';

const formEl = document.querySelector('.feedback-form');

let feedbackFormInfo = {};
const dataFromStorage = storage.load('feedback-form-state');

const fillFormFields = () => {
  if (dataFromStorage) {
    for (const key in dataFromStorage) {
      formEl.elements[key].value = dataFromStorage[key];
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
  console.log(feedbackFormInfo);

  event.target.reset();
  storage.remove('feedback-form-state');
  feedbackFormInfo = {};
}

formEl.addEventListener('input', throttle(onFormFieldTypeText, 500));
formEl.addEventListener('submit', onFormFieldSubmit);
