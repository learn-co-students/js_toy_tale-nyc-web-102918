document.addEventListener('DOMContentLoaded', () => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  const newToyForm = document.querySelector('.add-toy-form')
  let addToy = false
  let allToys = []

  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then((r) => {
      return r.json()
    })
    .then((data) => {
      allToys = data
      console.log(data)
      showAllToys(data)
    })
  }
  fetchToys()

  function showAllToys(data) {
    data.forEach((toy) => {
      toyCollection.innerHTML += renderSingleToy(toy)
    })
  }

  function renderSingleToy(toy) {
    console.log(toy.image)
    return `
         <div class='card'>
           <h2>${toy.name}</h2>
           <img class='toy-avatar' src='${toy.image}'>
           <p>Likes: ${toy.likes}</p>
           <button data-id='${toy.id}' data-action='like-btn' class='like-btn'>❤️</button>
         </div>
       `
  }


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      newToyForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const newToyName = document.querySelector('#toy-name').value
        const newToyImage = document.querySelector('#toy-img').value
        fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body: JSON.stringify( {
            name: newToyName,
            image: newToyImage,
            likes: 0
          })
        })
        .then((r) => r.json())
        .then((data) => {
          allToys.push(data)
          toyCollection.innerHTML = ''
          showAllToys(allToys)
        })
      })
    }
    else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'like-btn') {
      let foundToy = allToys.find((toy) => {
        return event.target.dataset.id == toy.id
      })
      let addLikes = ++foundToy.likes

      fetch(`http://localhost:3000/toys/${foundToy.id}`, {
         method: 'PATCH',
         headers: {
           'Content-Type' : 'application/json',
           'Accept' : 'application/json'
         },
         body: JSON.stringify({
           likes: addLikes
         })
       })
       toyCollection.innerHTML = ''
       showAllToys(allToys)
    }
  })

})
