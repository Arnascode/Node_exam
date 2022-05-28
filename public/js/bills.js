const BASE_URL = 'http://localhost:3000';
const token = localStorage.getItem('groupUserToken');
const groupId = window.location.search.split('=')[1];
const signoutBtn = document.querySelector('.signout');
const showEl = document.querySelector('.showBill');
const formEl = document.querySelector('.form');

if (!token) {
  window.location.replace('login.html');
}

signoutBtn.addEventListener('click', () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');
  window.location.replace('login.html');
});

function generateTh(dest) {
  const tr = document.createElement('tr');
  const thId = document.createElement('th');
  thId.textContent = 'ID';
  const thDescription = document.createElement('th');
  thDescription.textContent = 'For what?';
  const thAmount = document.createElement('th');
  thAmount.textContent = 'How much?';
  tr.append(thId, thDescription, thAmount);
  dest.append(tr);
}

function generateTable(arr, dest) {
  generateTh(dest);
  arr.forEach((eObj) => {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    tdId.textContent = eObj.id;
    const tdAmount = document.createElement('td');
    tdAmount.textContent = `€${eObj.amount}`;
    const tdDescription = document.createElement('td');
    tdDescription.textContent = eObj.description;
    tr.append(tdId, tdDescription, tdAmount);
    dest.appendChild(tr);
  });
}

async function fetchBills(endpoint, dest, token) {
  const resp = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await resp.json();
  if (data.success) {
    generateTable(data.msg, dest);
  }
}

async function AddNewBill(endpoint, newObj, token) {
  const resp = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(newObj),
  });
  const data = await resp.json();
  return data;
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newBillObj = {
    groupId,
    amount: formEl.elements.amount.value,
    description: formEl.elements.description.value,
  };

  const addedResult = await AddNewBill(`${BASE_URL}/bills`, newBillObj, token);
  if (addedResult.success) {
    showEl.innerHTML = '';
    fetchBills(`${BASE_URL}/bills/${groupId}`, showEl, token);
    formEl.elements.amount.value = '';
    formEl.elements.description.value = '';
  }
});

fetchBills(`${BASE_URL}/bills/${groupId}`, showEl, token);
