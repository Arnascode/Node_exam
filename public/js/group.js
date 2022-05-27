import { getFetch } from './modules/fetch.js';

const groupListEl = document.getElementById('group');

const token = localStorage.getItem('groupUserToken');
console.log('token ===', token);

function renderGroup(arr, dest) {
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = '';
  arr.forEach((bObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${bObj.id} - ${bObj.name}`;
    dest.append(liEl);
  });
}
if (!token) {
  window.location.replace('login.html');
}
async function getGroup(userToken) {
  const groupArr = await getFetch('group', userToken);
  renderGroup(groupArr, groupListEl);
}
getGroup(token);
