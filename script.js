
let body = document.getElementsByTagName("body")[0]

let circle = document.getElementById("circle")

let img = document.getElementById("circle-img")

function themebtn() {

// let change = document.querySelector(".circle")

circle.classList.toggle("circle-anime") 

// img.src = "/assets/sun1.png"
if (img.src.includes("/assets/sun1.png")) {
    
    img.src = "/assets/moon2.png"
} else {

    img.src = "/assets/sun1.png"

}
// if(circle.style.left = "30px") {
// circle.style.left = "50px"
// } else if (circle.style.left = "50px") {
//     circle.style.left = "30px"

// }
body.classList.toggle("darktheme")

}


