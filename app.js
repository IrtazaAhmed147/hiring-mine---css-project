let body = document.getElementsByTagName("body")[0]
let label = document.getElementById("label")
let themeSwitch = document.getElementById("themeSwitch")
let theme = JSON.parse(localStorage.getItem("hiringThemeMode"))

if (theme === "dark") {
    themeSwitch.checked = true
    body.classList.add("darktheme")
    document.querySelector(".sec1").classList.remove("gradientBack")
    } else {

    localStorage.setItem("hiringThemeMode", JSON.stringify("light"))
    theme = JSON.parse(localStorage.getItem("hiringThemeMode"))
}

function themebtn() {

    if (theme === "dark") {
        
        body.classList.remove("darktheme")
        document.querySelector(".sec1").classList.add("gradientBack")
        localStorage.setItem("hiringThemeMode", JSON.stringify("light"))
        theme = JSON.parse(localStorage.getItem("hiringThemeMode"))
    } else if (theme === "light") {
        
        body.classList.add("darktheme")
        document.querySelector(".sec1").classList.remove("gradientBack")

        localStorage.setItem("hiringThemeMode", JSON.stringify("dark"))
        theme = JSON.parse(localStorage.getItem("hiringThemeMode"))
    }

}
label.addEventListener("click", themebtn)


const getCategories = async () => {
    try {
        const response = await fetch("https://backend-prod.app.hiringmine.com/api/categories/all")
        const res = await response.json()

        if (!res.status) {
            return
        }

        let { data } = res
        document.getElementById("catergories").innerHTML = ""
        data.slice(0, 8).map((value) => {
            let li = document.createElement("li")
            li.classList.add("childbox")
            li.innerHTML = `  <a href="#catergories">
                         
                         <img src="/assets/box.svg" alt="">
                         <h4 >${value.name}</h4>
                         <p>${value.postCounts} Jobs</p>
                        </a>
                    `
            document.getElementById("catergories").appendChild(li)
        })


    } catch (error) {

        console.log(error);


        if (!navigator.online) {

            document.getElementById("catergories").innerHTML = "Network Connection Error"
        } else {

            document.getElementById("catergories").innerHTML = error.message
        }

    }
}

const getJobs = async () => {
    try {
        const response = await fetch("https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false")
        const res = await response.json()

        if (!res.status) {
            return
        }
        let { data } = res
        document.getElementById("jobParentBox").innerHTML = ""
        data.slice(0, 6).map((value) => {
            let div = document.createElement("div")
            div.classList.add("cardBox")

            let createdDate = new Date(value.createdAt)?.getDate()
            let currentDate = new Date().getDate()

            let daysAgo = currentDate - createdDate



            div.innerHTML = `            
                <a href="#jobParentBox">
                    <div class="card-upperpart">
                        <div class="card-portion1">
                            <p class="companyName">${value.companyName ? value.companyName : "Anonymous"}</p>
                            <img src="/assets/icon.png" alt="">
                            </div>
                            <div class="card-portion2">
                            <p>${value.designation}</p>
                            <span>${value.payRangeStart === 0 && value.payRangeEnd === 0 ? "No Salary Mentioned" : `${value.payRangeStart} - ${value.payRangeEnd}`}</span>
                        </div>

                    </div>

                    <div class="card-lowerpart">
                        <div class="lower-box1">
                            <p>${value.city}  ${value.country}</p>
                            <p>${value.views} views</p>
                            </div>
                            <div class="lower-box2">
                            <p>${daysAgo} ${daysAgo > 1 ? "days ago" : "day ago"}</p>
                            <p>Posted By ${value.user.firstName}</p>
                        </div>
                    </div>

                </a>
            `
            document.getElementById("jobParentBox").appendChild(div)
        })


    } catch (error) {
        console.log(error);
        
        if (!navigator.online) {

            document.getElementById("jobParentBox").innerHTML = "Network Connection Error"
        } else {

            document.getElementById("jobParentBox").innerHTML = error.message
        }

    }
}
const getHighProfile = async () => {
    try {
        const response = await fetch("https://backend-prod.app.hiringmine.com/api/users/home?sortBy=mostViewed")
        const res = await response.json()

        if (!res.status) {
            return
        }
        let { data } = res
        document.getElementById("highProfileContainer").innerHTML = ""
        data.slice(0, 6).map((value) => {
            let div = document.createElement("div")
            div.classList.add("highProfileBox")
            div.innerHTML = `            
            
            <div class="highProfileImage">
            <img src="${value.profilePic ? value.profilePic : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}" alt="">
                </div>
                <div>
                    <p class="small" style="color: #4d3bdb">${value.firstName} ${value.lastName}</p>
                    <p class="small" style="color: grey">${value.jobTitle.slice(0, 16)}...</p>
                    <p class="small" href="#" style="color: grey !important">View Profile &rightarrow;</p>
                </div>

                <div class="highProfileImage" style="height: 30px;"><img src="./assets/icon.png" alt=""></div>
           
            `
            document.getElementById("highProfileContainer").appendChild(div)
        })


    } catch (error) {
        console.log(error);

        if (!navigator.online) {

            document.getElementById("highProfileContainer").innerHTML = "Network Connection Error"
        } else {

            document.getElementById("highProfileContainer").innerHTML = error.message
        }

    }
}
getHighProfile()
getJobs()
getCategories()
