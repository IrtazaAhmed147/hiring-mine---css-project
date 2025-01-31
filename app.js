
let body = document.getElementsByTagName("body")[0]

let circle = document.getElementById("circle")

let img = document.getElementById("circle-img")

function themebtn() {

circle.classList.toggle("circle-anime") 

if (img.src.includes("/assets/sun1.png")) {
    img.src = "/assets/moon2.png"
} else {
    img.src = "/assets/sun1.png"
}
body.classList.toggle("darktheme")

}


const getCategories = async()=> {
    try {
            const response = await fetch("https://backend-prod.app.hiringmine.com/api/categories/all")
            const res = await response.json() 
            
            if(!res.status) {
                return
            }
            let {data} = res
            console.log(data);
            data.slice(0, 8).map((value)=> {
                let li = document.createElement("li")
                li.classList.add("childbox")
                li.innerHTML=   `  <a href="https://hiringmine.com/jobsearch?category=6499f660d7d3bec5b121e02f">
                         
                         <img src="/assets/box.svg" alt="">
                         <h2>${value.name}</h2>
                         <p>${value.postCounts} Jobs</p>
                        </a>
                    `
                document.getElementById("catergories").appendChild(li)
            })
            
            
    } catch (error) {
        console.log(error);
        
    }
}

const getJobs = async()=> {
    try {
            const response = await fetch("https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false")
            const res = await response.json() 
            
            if(!res.status) {
                return
            }
            let {data} = res
            console.log(data);
            data.slice(0, 6).map((value)=> {
                let div = document.createElement("div")
                div.classList.add("cardBox")
                div.innerHTML=   `            
                <a href="https://hiringmine.com/jobsearch?jid=66967f7e058dfbf2fef3f7ed">
                    <div class="card-upperpart">
                        <div class="card-portion1">
                            <p class="companyName">${value.companyName ? value.companyName : "Anonymous"}</p>
                            <img src="/assets/icon.png" alt="">
                            </div>
                            <div class="card-portion2">
                            <p>${value.designation}</p>
                            <span>${value.payRangeStart === 0 && value.payRangeEnd === 0 ?  "No Salary Mentioned" : `${value.payRangeStart} - ${value.payRangeEnd}`}</span>
                        </div>

                    </div>

                    <div class="card-lowerpart">
                        <div class="lower-box1">
                            <p>${value.city}  ${value.country}</p>
                            <p>${value.views} views</p>
                            </div>
                            <div class="lower-box2">
                            <p>11 days ago</p>
                            <p>Posted By ${value.user.firstName}</p>
                        </div>
                    </div>

                </a>
            `
                document.getElementById("jobParentBox").appendChild(div)
            })
            
            
    } catch (error) {
        console.log(error);
        
    }
}
getJobs()
// getCategories()
