const showEl = document.querySelector('.showGrp');
const BASE_URL = 'http://localhost:3000';
const token = localStorage.getItem('groupUserToken');
const signoutBtn = document.querySelector('.signout');

if (!token) {
  window.location.replace('login.html');
}

signoutBtn.addEventListener('click', () => {
  localStorage.removeItem('groupUserToken');
  localStorage.removeItem('userId');
  window.location.replace('login.html');
});

function createCard(id, name) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.addEventListener('click', () => {
    window.location.href = `bills.html?id=${id}`;
  });
  const h3El = document.createElement('h3');
  h3El.textContent = `ID: ${id}`;
  const pEl = document.createElement('p');
  pEl.textContent = name;
  cardEl.append(h3El, pEl);
  return cardEl;
}

function generateCard(dest, arr) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';
  arr.forEach((accObj) => {
    const card = createCard(accObj.group_id, accObj.name);
    dest.appendChild(card);
  });
}

// eslint-disable-next-line no-shadow
async function fetchAccountGroups(endpoint, dest, token) {
  try {
    const resp = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();

    generateCard(dest, data);
  } catch (error) {
    alert('Something wrong fetching Accounts');
  }
}

fetchAccountGroups(`${BASE_URL}/accounts`, showEl, token);
