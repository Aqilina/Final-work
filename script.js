let gallery = document.querySelector('.gallery')
let gallery2 = document.querySelector('.gallery2')
let divToPutGallery = document.querySelector('.divToPutGallery')
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
const createdForOnePost = document.querySelector('.createdForOnePost')

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



function getAll() {
            fetch("http://167.99.138.67:1111/getallposts")
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    postsArr = data

                    showAllPosts() // jei uz fetch'o - dar duomenu nebus
                })
            // console.log(postsArr.data.length)
}
getAll()

//INDEX
function showAllPosts() {
    // console.log(postsArr.data)

    postsArr.data.map(item => {
        // console.log(item.username)
        //pridejau item.username i klase, kad galeciau filtruot ji getParticPost() funkcijoj
        let date = new Date(item.timestamp) // pakeiciama data. toliau - date.toDateString()
        gallery.innerHTML += `
            <div class="card ${item.username}" id="${item.id}">
                <img class="photo" src="${item.image}" alt="">
                <div class="infoPost">
                    <div class="date">${date.toDateString()}</div>
                    <div class="slash">/</div>
                    <div class="username" onclick="getParticUser(event)"><a class="usernameColor" href="particularUser.html">${item.username}</a></div>
<!--                    <div class="username" onclick="getParticUser(event)">${item.username}</div>-->

                </div>
                <div class="description">${item.title}</div>
<!--                <div class="date readMore" onclick="getParticPost(event)"><a href="particularPost.html">READ MORE</a></div>-->
    <div class="date readMore" onclick="getParticPost(event)">READ MORE</div>
<!--kad paziuret event'ą - be <a href>-->
            </div>
        `
        })
}

//SORTING
function sortEarliest(postsArr) {
    fetch("http://167.99.138.67:1111/getallposts")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            sortingArr = data

            console.log(sortingArr)
            sortingArr.data.sort(function (a, b) {
               return b.timestamp - a.timestamp
            })

                gallery.innerHTML = ""

                sortingArr.data.map(item => {

                    // console.log(item)
                    // console.log(item.username)

                    gallery.innerHTML += `
                    <div class="card ${item.username}" id="${item.id}">
                    <img class="photo" src="${item.image}" alt="">
                    <div class="infoPost">
                        <div class="date">${item.timestamp}</div>
                        <div class="slash">/</div>
                        <div class="username" onclick="getParticUser(event)">${item.username}</div>
                    </div>
                    <div class="description">${item.title}</div>
<!--                 <div class="date readMore" onclick="getParticPost(event)"><a href="particularPost.html">READ MORE</a></div>-->
                    <div class="date readMore" onclick="getParticPost(event)">READ MORE</div>
                `
                })
            })
}

function sortLatest() {
    fetch("http://167.99.138.67:1111/getallposts")
        .then(res => res.json())
        .then(data => {
            let sortingArr
            sortingArr = data

            sortingArr.data.sort(function (a, b) {
                return a.timestamp - b.timestamp
            })

            console.log(sortingArr)

            gallery.innerHTML = ""

            sortingArr.data.map(item => {
                // console.log(item)
                // console.log(item.username)

                gallery.innerHTML += `
                    <div class="card ${item.username}" id="${item.id}">
                    <img class="photo" src="${item.image}" alt="">
                    <div class="infoPost">
                        <div class="date">${item.timestamp}</div>
                        <div class="slash">/</div>
                        <div class="username" onclick="getParticUser(event)">${item.username}</div>
                    </div>
                    <div class="description">${item.title}</div>
<!--                 <div class="date readMore" onclick="getParticPost(event)"><a href="particularPost.html">READ MORE</a></div>-->
                    <div class="date readMore" onclick="getParticPost(event)">READ MORE</div>
                `
            })
        })
}

//GET PARTICULAR
function getParticPost(event) {
    console.log(event)

    let name = event.target.innerHTML
    window.localStorage.setItem('chosenName', name)
    console.log(localStorage)
}

function getParticPost(event) {
    console.log(event)

    let selectedId
    !!event.target.id ? selectedId = event.target.id : selectedId = event.path[1].id
    console.log(selectedId)

    let particUsername = event.path[1].classList[1] //prisidejau papildoma klase funkcijoj showAllPosts()
    // window.localStorage.setItem('nameReadMore', particUsername)
    console.log(particUsername)

    fetch(`http://167.99.138.67:1111/getsinglepost/${particUsername}/${selectedId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let date = new Date(data.data.timestamp)

            // 1 varinatas
            sortingContainer.style.display = 'none'
            gallery.style.display = 'none'


            // 2 variantas

            createdForOnePost.innerHTML += `
                    <div class="myPostDate">${date.toDateString()}</div>
                    <div class="myPostName">${name}</div>
                    <img class="myBlogImg" src="${data.data.image}" alt="">
                    <div class="myPostTitle">${data.data.title}</div>
                    <div class="myPostText">${data.data.description}</div>
            `
        })
    console.log('krapas')
}

function getParticUser(event) {
    // console.log(event)

    let name = event.target.innerHTML
    // console.log(name)
    window.localStorage.setItem('chosenName', name)
    // console.log(localStorage)
}

// OPEN NAVIGATION
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

// API DOCUMENTATION

// GET - REQUESTS

// get all posts
// http://167.99.138.67:1111/getallposts +

// get particular user posts
// http://167.99.138.67:1111/getuserposts/:name +
// put user name instead of ":name"

// get particular post
// http://167.99.138.67:1111/getsinglepost/:name/:id' +
// put user name instead of ":name" and post id instead of ":id"


// POST - REQUESTS

// create new user
// http://167.99.138.67:1111/createaccount +
// send JSON object with these keys:
// name, passwordOne, passwordTwo

// login to get your secret key
// http://167.99.138.67:1111/login +
// send JSON object with these keys:
// name, password

// create new post (have to have secret key) +
// http://167.99.138.67:1111/createpost
// send object JSON object with these keys:
// secretKey, title, image, description

// update existing post (have to have secret key) +
// http://167.99.138.67:1111/updatepost
// send JSON object with these keys:
// secretKey, title, image, description, id (id stands for post id)

// delete existing post (have to have secret key) +
// http://167.99.138.67:1111/deletepost
// send JSON object with these keys:
// secretKey, id (id stands for post id)
