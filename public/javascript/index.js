const charactersAPI = new APIHandler("http://localhost:8000")

function showCharacters(list) {
  const characterCardEl = document.querySelector(".character-info")
  const characterContainerEl = document.querySelector(".characters-container")
  const cardTemplateEl = characterCardEl.cloneNode(true)
  characterContainerEl.innerHTML = ""
  list.forEach((charater) => {
    const charaterNode = cardTemplateEl.cloneNode(true)
    charaterNode.querySelector(".name").textContent = charater.name
    charaterNode.querySelector(".occupation").textContent = charater.occupation
    charaterNode.querySelector(".cartoon").textContent = charater.cartoon
    charaterNode.querySelector(".weapon").textContent = charater.weapon
    characterContainerEl.appendChild(charaterNode)
  })
}

function changeColorButton(test, button){
  if(test){
    button.style.backgroundColor = "green"
  }
  else{
    button.style.backgroundColor = "red"
  }
}

window.addEventListener("load", () => {
  document.getElementById("fetch-all").addEventListener("click", async function (event) {
    event.preventDefault()
    const list = await charactersAPI.getFullList()
    showCharacters(list)
  })

  document.getElementById("fetch-one").addEventListener("click", async function (event) {
    event.preventDefault()
    const id = document.querySelector('input[name="character-id"]').value
    const character = await charactersAPI.getOneRegister(id)
    if (character) showCharacters([character])
  })

  document.getElementById("delete-one").addEventListener("click", async function (event) {
    event.preventDefault()
    const id = document.querySelector('input[name="character-id-delete"]').value
    const response = await charactersAPI.deleteOneRegister(id)
    const deleteButton = document.getElementById("delete-one")
    changeColorButton(response, deleteButton)
  })

  document.getElementById("edit-character-form").addEventListener("submit", async function (event) {
    event.preventDefault()
    console.log('event', event.target.id);
    const id = document.querySelector('input[name="chr-id"]').value
    const character = {
      id,
      name:event.target.name.value,
      occupation:event.target.occupation.value,
      weapon:event.target.weapon.value,
      cartoon:event.target.cartoon.value,
    }
    console.log({character});
    const response = await charactersAPI.updateOneRegister(id, character)
    const editButton = document.querySelector("#edit-character-form.send-data")
    changeColorButton(response, editButton)

  })

  document.getElementById("new-character-form").addEventListener("submit", async function (event) {
    event.preventDefault()
    const character = {
      name:event.target.name.value,
      occupation:event.target.occupation.value,
      weapon:event.target.weapon.value,
      cartoon:event.target.cartoon.value,
    }
    const response = await charactersAPI.createOneRegister(character)
    const createButton = document.querySelector("#new-character-form.send-data")
    changeColorButton(response, createButton)
  })
})
