let gallery = document.querySelector('.gallery')
let gallery2 = document.querySelector('.gallery2')
let sortingContainer = document.querySelector('.sortingContainer')
const nav = document.querySelector('nav')
const navDropDown = document.getElementsByClassName('navDropDown')
const border = document.querySelector('.border')

let readMoreBtn = document.querySelector(".readMore")
const nameInput = document.querySelector("#nameInp")
const paswInput1 = document.querySelector("#paswInput1")
const paswInput2 = document.querySelector("#paswInput2")
const nameInputLogin = document.querySelector("#nameInpLogin")
const paswInputLogin = document.querySelector("#paswInputLogin")


const nameError = document.getElementById('nameError')
const paswErrorReg = document.getElementById('paswErrorReg')
const paswErrorReg2 = document.getElementById('paswErrorReg2')
const registerWindow = document.querySelector('.registerWindow')
const accountSuccess = document.getElementById('accountSuccess')
const loginSuccess = document.getElementById('loginSuccess')
const secretKeyText = document.getElementById('secretKeyText')

const postDiv = document.querySelector('.postDiv')
const postTitle = document.getElementById('postTitle')
const postURL = document.getElementById('postURL')
const postDescr = document.getElementById('postDescr')
const titleError = document.getElementById('titleError')
const urlError = document.getElementById('urlError')
const postError = document.getElementById('postError')
const usernameColor = document.querySelector('.usernameColor')

const myCollection = document.querySelector('.myCollection')
const selectedPost = document.querySelector('.selectedPost')
const sorting = document.querySelector('.sorting')
const mainPhoto = document.querySelector('.mainPhoto')

//BUTTONS
const submitBtnRegist = document.querySelector('#submitBtnRegist')
const loginSubmitBtn = document.querySelector('#loginSubmitBtn')

const earliest = document.getElementById('earliest')
const latest = document.getElementById('latest')

const modal = document.querySelector('.modal')
let singlePost

let postsArr
let postsScndFetch
let myPostsArr = []
let testinis = []

let writePostTrigger = false
let triggerNavigation = false
let targetToDeleteId


function createPost() {
    let postParam = {
        secretKey: "h2K415KxXKCK6FcOzVP4",
        title: postTitle.value,
        image: postURL.value,
        description: postDescr.value
    }

    fetch("http://167.99.138.67:1111/createpost", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(postParam)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message === "title must be at least 20 symbols length") {
                titleError.innerText = "Title must be at least 20 symbols length"
            }
            if (data.message === "image url is wrong (has to include http)") {
                urlError.innerText = "Image url is wrong (has to include http)"
                titleError.innerText = ""
            }
            if (data.message === "description must be at least 50 symbols length") {
                postError.innerText = "Description must be at least 50 symbols length"
                titleError.innerText = ""
                urlError.innerText = ""
            }
            // hideWritting()
            myCollection.innerHTML = ""
            myPostsArr = []
            filterMyPosts() // irgi fetcho viduj!!!!!
            hideWritting()
        })
}

//cia issifiltruoja ir REALIAI atsivaizduoja MANO blogo irasai
function filterMyPosts() {

    fetch("http://167.99.138.67:1111/getallposts")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            postsScndFetch = data
            let tempMyPostArr = []
            postsScndFetch.data.map(item => {
                if (item.username === "krabas") {
                    // myPostsArr.push(item) //nepamirsti isvalyti kitose funkc, kur naudosiu. myPostArr = []
                    tempMyPostArr.push(item)
                    // console.log(myPostsArr.length)
                }
            })
            myPostsArr = tempMyPostArr
            showMyPosts()
        })
}
filterMyPosts()

//cia atsivaizduoja MANO blogo irasai. iskvieciama filterMyPosts()
function showMyPosts() {

    myCollection.innerHTML = ""
    // console.log(myPostsArr)

    myPostsArr.map(item => {

        singlePost = document.createElement('div')
        singlePost.classList.add('singlePost')
        singlePost.style.position = 'relative'
        singlePost.setAttribute('id', item.id)

        //MODAL UPDATE
        modalUpdate = document.createElement('div')
        modalUpdate.classList.add('modal', 'modalToUpdate')
        createModalToEdit()

        //MODAL DELETE
        modalDelete = document.createElement('div')
        modalDelete.classList.add('modal', 'modalToDelete')
        createModalToDelete()


        //INSIDE
        let date = new Date(item.timestamp)
        let dateStandart = date.toDateString()
        window.localStorage.setItem('date', 'date')

        let myPostDate = document.createElement('div')
        myPostDate.classList.add('myPostDate')
        myPostDate.innerHTML = `${date.toDateString()}`
        
        myBlogImg = document.createElement('img')
        myBlogImg.classList.add('myBlogImg')
        myBlogImg.setAttribute('src', item.image)

        myPostTitle = document.createElement('div')
        myPostTitle.classList.add('myPostTitle')
        myPostTitle.innerHTML =  item.title

        myPostText = document.createElement('div')
        myPostText.classList.add('myPostText')
        myPostText.innerHTML =  item.description


        let editingBtns = document.createElement('div')
        editingBtns.classList.add('editingBtns')

        let updateChosenBtn = document.createElement('button')
        updateChosenBtn.classList.add('updateChosenBtn')
        updateChosenBtn.innerText = "UPDATE"
        updateChosenBtn.addEventListener('click', openModalToEdit)

        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('deleteBtn')
        deleteBtn.innerText = "DELETE"
        deleteBtn.addEventListener('click', openModalToDelete)

        singlePost.appendChild(myPostDate)
        singlePost.appendChild(modalUpdate)
        singlePost.appendChild(modalDelete)


        singlePost.appendChild(myBlogImg)
        singlePost.appendChild(myPostTitle)
        singlePost.appendChild(myPostText)
        singlePost.appendChild(editingBtns)

        editingBtns.appendChild(updateChosenBtn)
        editingBtns.appendChild(deleteBtn)

        myCollection.appendChild(singlePost)
    })
}


//MODALS
// 1. MODAL TO DELETE
function createModalToDelete() {

    let modalText = document.createElement('div')
    modalText.classList.add('modalText')
    modalText.innerText = "Are you sure you want to delete your post?"

    let modalBtnDiv = document.createElement('div')
    modalBtnDiv.classList.add('modalBtnDiv')

    let btnModalYes = document.createElement('button')
    btnModalYes.classList.add("btnModal")
    btnModalYes.innerText = "Yes"
    btnModalYes.addEventListener('click', deleteMyPost)

    let btnModalNo = document.createElement('button')
    btnModalNo.classList.add("btnModal")
    btnModalNo.innerText = "No"
    btnModalNo.addEventListener('click', closeModalDelete)

    modalDelete.appendChild(modalText)
    modalDelete.appendChild(modalBtnDiv)
    modalBtnDiv.appendChild(btnModalYes)
    modalBtnDiv.appendChild(btnModalNo)
}

function openModalToDelete(event) {
    // console.log(event)
    modalToDeleteId = event.path[2].children[2]
    modalToDeleteId.style.display = 'block'
}

function closeModalDelete() {
    modalToDeleteId.style.display = 'none'
}

function deleteMyPost() {
//puslapio atvaizdavimas is naujo - fetch viduje, kitaip istrynima atvaizduoja
// tik perkrovus psl

    // console.log(event)
    console.log(targetToDeleteId)

    let itemToDelete = {
        secretKey: "h2K415KxXKCK6FcOzVP4",
        id: targetToDeleteId,
    }

    fetch("http://167.99.138.67:1111/deletepost", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(itemToDelete)

    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            myPostsArr = [] // nes vis pushina kiekv karta iskvietinejant filterMyPosts(): myPostsArr.push(item))

            filterMyPosts()
            closeModalDelete()
        })
    console.log(myPostsArr.length)
}

// 2.MODAL TO EDIT
function createModalToEdit() {

    let modalText = document.createElement('div')
    modalText.classList.add('modalText')
    modalText.innerText = "Are you sure you want to edit your post?"

    let modalBtnDiv = document.createElement('div')
    modalBtnDiv.classList.add('modalBtnDiv')

    let btnModalYes = document.createElement('button')
    btnModalYes.classList.add("btnModal")
    btnModalYes.innerText = "Yes"
    btnModalYes.addEventListener('click', updateMyPost)

    let btnModalNo = document.createElement('button')
    btnModalNo.classList.add("btnModal")
    btnModalNo.innerText = "No"
    btnModalNo.addEventListener('click', closeModalUpdate)

    modalUpdate.appendChild(modalText)
    modalUpdate.appendChild(modalBtnDiv)
    modalBtnDiv.appendChild(btnModalYes)
    modalBtnDiv.appendChild(btnModalNo)
}

function openModalToEdit(event) {
    console.log(event)
    titleToEdit = event.path[2].children[4].innerHTML
    imageToEdit = event.path[2].children[3].src // jei modalas - [2].src
    textToEdit = event.path[2].children[5].innerHTML // jei modalas - [4].src
    idToEdit = event.path[2].id
    modalToEditId = event.path[2].children[1]
    console.log(imageToEdit)
    modalToEditId.style.display = "block"
}

function closeModalUpdate() {
    modalToEditId.style.display = 'none'
}

function updateMyPost(event) {
    // console.log(event)
    // console.log(idToEdit)

    singlePost = document.getElementById(idToEdit)

    let newElem = document.createElement('div')
    newElem.classList.add('singlePost')

    newBlogImg = document.createElement('textarea')
    newBlogImg.classList.add('inputToEdit')
    newBlogImg.innerHTML = imageToEdit
    newBlogImg.addEventListener('input', changeValueImg)

    newTitle = document.createElement('textarea')
    newTitle.classList.add('myPostTitle')
    newTitle.innerHTML = titleToEdit
    newTitle.addEventListener('input', changeValueTitle)


    newPostText = document.createElement('textarea')
    newPostText.classList.add('myPostText', 'textInput')
    newPostText.innerHTML = textToEdit
    newPostText.addEventListener('input', changeValueText)

    let btnDone = document.createElement('button')
    btnDone.classList.add('btnDone')
    btnDone.innerHTML = "DONE"
    btnDone.addEventListener('click', showEditedPage)

    newElem.appendChild(newBlogImg)
    newElem.appendChild(newTitle)
    newElem.appendChild(newPostText)
    newElem.appendChild(btnDone)
    singlePost.replaceWith(newElem)

    closeModalUpdate()
    console.log('miegas')
}

// EDIT POSTS  ///////////////////////
function changeValueImg(event) {
    // console.log(event)
    newBlogImg.innerText = event.target.value
    console.log(newBlogImg.value)
}

function changeValueTitle(event) {
    // console.log(event)
    newTitle.innerText = event.target.value
    console.log(newTitle.value)
}

function changeValueText(event) {
    // console.log(event)
    newPostText.innerText = event.target.value
    // console.log(newPostText.value)
}

function showEditedPage() {

    console.log(titleToEdit)
    let itemToUpdate = {
        secretKey: "h2K415KxXKCK6FcOzVP4",
        title: newTitle.value,
        image: newBlogImg.value,
        description: newPostText.value,
        id: idToEdit
    }

    fetch("http://167.99.138.67:1111/updatepost", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(itemToUpdate)

    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // myPostsArr = [] // nes vis pushina kiekv karta iskvietinejant filterMyPosts(): myPostsArr.push(item))
            //
            filterMyPosts()
        })
}

//OPEN WRITE NEW POST
function startWriting() {
    writePostTrigger = true
    postDiv.style.height = writePostTrigger ? "500px" : "0px"
}

function hideWritting() {
    writePostTrigger = false
    postDiv.style.height = writePostTrigger ? "500px" : "0px"
}

function openNavigation() {
    triggerNavigation = !triggerNavigation
    nav.style.height = triggerNavigation ? "250px" : "0px"
    nav.style.borderBottom = triggerNavigation ? "1px solid grey" : "none"
    navDropDown[0].style.display = triggerNavigation? "block" : "none"
    navDropDown[1].style.display = triggerNavigation? "block" : "none"
    navDropDown[2].style.display = triggerNavigation? "block" : "none"
    navDropDown[3].style.display = triggerNavigation? "block" : "none"
    border.style.display = triggerNavigation? "block" : "none"
}

