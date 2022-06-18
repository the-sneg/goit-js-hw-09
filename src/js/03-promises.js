import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delay = +formEl.elements.delay.value;
  const step = +formEl.elements.step.value;
  const amount = +formEl.elements.amount.value;

  generatePromises(delay, step, amount);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function generatePromises(delay, step, amount) {
  if (delay < 0 || step < 0 || amount < 0) {
    return (
      Notiflix.Notify.warning('⚠️ Field value cannot be less than 0'),
      {
        timeout: 5000,
      }
    );
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 5000,
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: 5000,
          }
        );
      });
    delay += step;
  }
}
