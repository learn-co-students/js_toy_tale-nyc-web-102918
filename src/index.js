const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const collection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')
let addToy = false
let allToys=""

document.addEventListener('DOMContentLoaded', function(){

//Step # 2: GET request to fetch all the toy objects
fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })

  .then(function(data){
    allToys = data
    allToys.forEach(function(toy){
      // Step #3: Add toy info to the card
      collection.innerHTML += `<div id="toy-${toy.id}" class="card">
                               <h2> ${toy.name} </h2>
                               <img src="${toy.image}" class="toy-avatar">
                               <p id=like-${toy.id}>  ${toy.likes} Likes </p>
                               <button data-id="${toy.id}" class="like-btn"> Like <3 </button>
                               </div>`
    })
  })


//Step #4 add a new toy
form.addEventListener('submit', function(event){
  event.preventDefault()

  let name = event.target.name.value
  let img = event.target.image.value

  fetch('http://localhost:3000/toys', {
    method:'POST',
    headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body:JSON.stringify({
    name: name,
    image: img,
    likes: 0
    })
  })
  .then(function(response){
  return response.json()
  })
  .then(function(toy){
    console.log(toy)
    collection.innerHTML += `<div id="toy-${toy.id}" class="card">
                             <h2> ${toy.name} </h2>
                             <img src="${toy.image}" class="toy-avatar">
                             <p id=like-${toy.id}>  ${toy.likes} Likes </p>
                             <button data-id="${toy.id}" class="like-btn"> Like <3 </button>
                             </div>`

  })

})


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

//#Step # 5 increase likes
  document.addEventListener('click', function(event){
    if (event.target.className === "like-btn"){
      const toyId = event.target.dataset.id
      foundToy = allToys.find(function(toy){
        return toy.id == toyId
      })
      let newLikes = ++foundToy.likes
      const pTag = document.querySelector(`#like-${toyId}`)


    fetch(`http://localhost:3000/toys/${foundToy.id}`, {
           method: 'PATCH',
           headers: {
             'Content-Type' : 'application/json',
             'Accept' : 'application/json'
           },
           body: JSON.stringify({
             likes: newLikes
           })
         })
         .then(function(response){
           return response.json()
         })
         .then(function(toy){
           pTag.innerHTML = `${toy.likes} Likes`
         })
    }
  })




}) // End of DOMContentLoaded
