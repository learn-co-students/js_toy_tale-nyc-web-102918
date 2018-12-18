const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
const newToyForm = document.querySelector(".add-toy-form")

let addToy = false
let allToys = []
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

function Adapter(url) {
  function get() {
    return fetch(url)
    .then(r => r.json())
  }

  function post(data) {
    const params = createParams("POST", data)

    return fetch(url, params)
    .then(r => r.json())
  }

  function patch(data, id){
		const params = createParams("PATCH", data)

		return fetch(url + "/" + id, params)
		.then(r => r.json())
	}

  function createParams(method, data){
	  const params = {
		  method: method,
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify(data)
		}

		return params
	}

  let allFunctions = {
    get: get,
    post: post,
    patch: patch
  }

  return allFunctions
}

function renderSingleToy(toy) {
  return `<div class="card toy-${toy.id}">
            <h2>${toy.name}</h2>
            <img src="${toy.image}" class="toy-avatar" />
            <p><span class="like-amount">${toy.likes}</span> Likes</p>
            <button data-id="${toy.id}" class="like-btn">Like <3</button>
          </div>`
}

function showAllToys(toys) {
  toyCollection.innerHTML = toys.map(renderSingleToy).join('')
}


let adapter = Adapter("http://localhost:3000/toys")

function getToys() {
  adapter.get()
  .then(data => {
    allToys = data
    showAllToys(data)
  })
}

toyCollection.addEventListener("click", e => {
  if (e.target.classList.contains("like-btn")) {
    const likedToy = allToys.find(toy => toy.id === parseInt(e.target.dataset.id))
    likedToy.likes++
    adapter.patch(likedToy, likedToy.id)
    .then(toy => {
      const updatedLikes = toyCollection.querySelector(`.toy-${toy.id} .like-amount`)
      updatedLikes.innerText = toy.likes
    })
  }
})

newToyForm.addEventListener("submit", e => {
  e.preventDefault()
  const newToyName = document.getElementById("new-toy-name").value
  const newToyImage = document.getElementById("new-toy-image").value
  const newToy = {
    name: newToyName,
    image: newToyImage,
    likes: 0
  }
  adapter.post(newToy)
  .then(toy => {
    toyCollection.innerHTML += renderSingleToy(toy)
    adapter.get()
    .then(data => {
      allToys = data
      return allToys
    })
  })

  e.target.reset()
})



getToys()
