const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const createForm = document.querySelector('.add-toy-form')
const toyCollectionDiv =  document.querySelector('#toy-collection')

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


fetch('http://localhost:3000/toys')
.then(res => res.json())
.then((res) => {addToytoPage(res)})

  function addToytoPage(array) {

    console.log(toyCollectionDiv);

    array.forEach(function (element) {
      toyCollectionDiv.innerHTML += `<div id="div-${element.id}"class="card">
    <h2>${element.name}</h2>
    <img src=${element.image} class="toy-avatar" />
    <p>${element.likes} Likes </p>
    <button id="${element.id}" class="like-btn">Like <3</button>
  </div>`
    })
  } ////// END OF ADD TOY

    createForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const nameInput = document.querySelector('#formName').value
    const imageInput = document.querySelector('#formImage').value

    console.log(nameInput);
    console.log(imageInput);
      fetch('http://localhost:3000/toys', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: nameInput,
            image: imageInput,
            likes: 0
          })
      }).then(res => res.json())/// end fetch
      .then(res => addToytoPage([res]))
}) ///// END EVENT LISTENET


toyCollectionDiv.addEventListener('click', function (event) {
    let currentLike = parseInt(event.target.parentElement.children[2].innerText);
    // console.log(currentLike);
    if(event.target.tagName=== "BUTTON"){
      // console.log(currentLike + 1);
      event.target.parentElement.children[2].innerText = `${currentLike + 1} Likes`
      console.log(event.target.id);
      fetch(`http://localhost:3000/toys/${event.target.id}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body:JSON.stringify(
        {
          "likes": `${currentLike + 1}`
        })
      })





    }/////end IFF
})
