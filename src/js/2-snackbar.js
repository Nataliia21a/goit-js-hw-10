import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  fieldset: document.querySelector('fieldset'),
  inputDelay: document.querySelector('input[type="number"]'),
  fulfilled: document.querySelector('input[value="fulfilled"]'),
  rejected: document.querySelector('input[value="rejected"]'),
  button: document.querySelector('button[type="submit"]'),
};

function onButtonSubmit(event) {
  event.preventDefault();
  const delay = parseInt(refs.inputDelay.value);
  const inputState = document.querySelector('input[name="state"]:checked');
  const state = inputState.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  promise
    .then(result => {
      iziToast.success({
        title: 'Notification',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Notification',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });
}

refs.form.addEventListener('submit', onButtonSubmit);
