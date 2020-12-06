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


//REGISTER HTML
function register() {
    console.log('labas')

    let user = {
        name: nameInput.value,
        passwordOne: paswInput1.value,
        passwordTwo: paswInput2.value
    }

    fetch("http://167.99.138.67:1111/createaccount", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.success === true) {
                if(data.message === "Account created successfully") {
                    // registerWindow.innerHTML = ""
                    accountSuccess.style.display = "block"
                }
            }
            if (data.success === false) {
                if (data.message === "Name has to be at least 5 symbols length") {
                    nameError.style.display = "block"
                }
                if (data.message === "Password should match") {
                    paswErrorReg.style.display = "block"
                }
                if (data.message === "Password should be at least 5 symbols length") {
                    paswErrorReg2.style.display = "block"
                }
            }
        })
}

// OPEN NAVIGATION
function openNavigation() {
    triggerNavigation = !triggerNavigation
    nav.style.height = triggerNavigation ? "200px" : "0px"
    nav.style.borderBottom = triggerNavigation ? "1px solid grey" : "none"
    navDropDown[0].style.display = triggerNavigation? "block" : "none"
    navDropDown[1].style.display = triggerNavigation? "block" : "none"
    navDropDown[2].style.display = triggerNavigation? "block" : "none"
    border.style.display = triggerNavigation? "block" : "none"
}

submitBtnRegist.addEventListener('click', register)