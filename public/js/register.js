console.log('register here');
const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.register;
const errroEl = document.getElementById('err');

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errroEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}

async function registerFetch(fullName, email, password) {
  const registerObj = { fullName, email, password };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    handleError('register success');
    window.location.replace('login.html');
  } else {
    handleError(await resp.json());
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('reg');
  const formData = {
    fullName: formEl.elements.fullName.value,
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
    repeatPassword: formEl.elements.repeat_password.value,
  };
  if (formData.password !== formData.repeatPassword) {
    handleError('Password dont match');
    return;
  }
  registerFetch(formData.fullName, formData.email, formData.password);
});
