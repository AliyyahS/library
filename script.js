const library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(book) {
    library.push(book)
}

function updateDisplay() {
  resetDisplay()

  library.forEach((book, index) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('data-index', index)
    main.appendChild(card)

    const info = document.createElement('div')
    info.classList.add('info')
    card.appendChild(info)

    const titleDisplay = document.createElement('h1')
    info.appendChild(titleDisplay)
    titleDisplay.textContent = book.title

    const authorDisplay = document.createElement('h2')
    info.appendChild(authorDisplay)
    authorDisplay.textContent = `by ${book.author}`

    const pageDisplay = document.createElement('h3')
    info.appendChild(pageDisplay)
    pageDisplay.textContent = `${book.pages} pages`

    const controls = document.createElement('div')
    controls.classList.add('controls')
    card.appendChild(controls)

    const statusBtn = document.createElement('button')
    statusBtn.classList.add('status')
    statusBtn.setAttribute('data-index', index)
    controls.appendChild(statusBtn)
    if (book.read) {
      statusBtn.classList.toggle('read')
      statusBtn.textContent = 'Read'
    } else statusBtn.textContent = 'Unread'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.setAttribute('data-index', index)
    controls.appendChild(deleteBtn)
    deleteBtn.textContent = 'Delete'
  })
  
  setStatusBtns()
  setDeleteBtns()
}

function getBookInfo() {
  const title = form.querySelector('#title').value
  const author = form.querySelector('#author').value
  const pages = form.querySelector('#pages').value
  const read = form.querySelector('#read').checked
  return new Book(title, author, pages, read)
}

function resetDisplay() {
  const card = main.querySelectorAll('div')
  card.forEach(div => div.remove())
}

function setStatusBtns() {
  const statusBtns = main.querySelectorAll('.status')

  statusBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      button.classList.toggle('read')
      if(button.classList.contains('read')) {
        button.textContent = 'Read'
      } else button.textContent = 'Unread'
      updateStatus(event.target)
    })
  })
}

function updateStatus(book) {
  const dataIndex = book.getAttribute('data-index')
  library[dataIndex].read = !library[dataIndex].read
}

function setDeleteBtns() {
  const deleteBtns = main.querySelectorAll('.delete')
  
  deleteBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      deleteBook(event.target)
     })
  })
}

function deleteBook(book) {
  const dataIndex = book.getAttribute('data-index')
  library.splice(dataIndex, 1)
  updateDisplay()
}

// DOM elements

const main = document.querySelector('.main')
const addBookBtn = document.querySelector('#addBook')
const dialog = document.querySelector('dialog')
const form = dialog.querySelector('#form')
const submitBtn = dialog.querySelector('#submit')
const cancelBtn = dialog.querySelector('#cancel')


// Form validation

// Form input DOM elements

const requiredInputs = form.querySelectorAll('input')
const message = dialog.querySelector('.message')
const errorMessage = message.querySelector('.errorMessage')

// Functions

function showErrorMessage() {
  errorMessage.textContent = `Please fill in the required fields.`
}

function addInvalidClass() {
  requiredInputs.forEach((input) => {
    if(!input.checkValidity()) {
      input.classList.add('invalid')
    }
  })
}

function removeInvalidClass() {
  requiredInputs.forEach((input) => {
    input.classList.remove('invalid')
  })
}

// Event listeners

addBookBtn.addEventListener("click", () => {
  dialog.showModal()
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault()
  if (!form.checkValidity()) {
    showErrorMessage()
    addInvalidClass()
  } else {
    addBookToLibrary(getBookInfo())
    updateDisplay()
    form.reset()
    dialog.close()
  }
});

cancelBtn.addEventListener("click", () => {
  errorMessage.textContent = ''
  removeInvalidClass()
  dialog.close()
});

requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if(input.checkValidity()) {
      input.classList.remove('invalid')
      errorMessage.textContent = ''
    } else input.classList.add('invalid')
  })
})