const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []
const dataPanel = document.querySelector('#user-panel')
// Render Users
axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderUserList(users)
  })
  .catch((err) => console.log(err))

//Event to wait for user image to be clicked
dataPanel.addEventListener('click', (event) => {
  if (event.target.matches('.card-img-top')) {
    showUserModal(event.target.dataset.id)
  }
})

function renderUserList(data) {
  let rawHTML = ``
  data.forEach((item) => {
    rawHTML += `
      <div class="card m-2">
        <img src="${item.avatar}" class="card-img-top img-show-user" alt="User Photo" data-id="${item.id}"
        data-bs-toggle="modal" data-bs-target="#user-modal">
        <div class="card-body" data-id="${item.id}">
          <h5 class="card-title">${item.name} ${item.surname}</h5>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function showUserModal(id) {
  const modalTitle = document.querySelector('#user-modal-name')
  const modalImage = document.querySelector('#user-modal-image')
  const modalDescription = document.querySelector('#user-modal-info')
  modalTitle.textContent = ''
  modalImage.src = ''
  modalDescription.innerText = ''
  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response.data
      modalTitle.innerHTML = `${data.name} ${data.surname}`
      modalDescription.innerHTML = `<p>email: ${data.email}</p>
      <p>gender: ${data.gender}</p>
      <p>age: ${data.age}</p>
      <p>region: ${data.region}</p>
      <p>birthday: ${data.birthday}</p>`
      modalImage.innerHTML = `<img src="${data.avatar
        }" alt="movie-poster" class="img-fluid">`
    })
    .catch(error => console.log(error))
}