let gallery = document.querySelector('.gallery')
let gallery2 = document.querySelector('.gallery2')
// let gallery3 = document.querySelector('.gallery3')
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

//LOGIN
function login() {

    let loginParam = {
        name: nameInputLogin.value,
        password: paswInputLogin.value
    }

    fetch("http://167.99.138.67:1111/login", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(loginParam)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.success === true) {
                loginSuccess.style.display = 'block'
                noUser.style.display = "none"
            }
            if (data.success === false) {
                noUser.style.display = "block"
            }
        })
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

// let postsArr
// let postsScndFetch
// let myPostsArr = []
// let testinis = []
//
// //JEI TIESIOG DUOMENIS IDET:
// let particPostInfo
// //JEI MAPINT:
// // let particPostInfo = []
//
// let writePostTrigger = false