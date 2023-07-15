 //loader
 let loader = document.getElementById("loader");
 let mainApp = document.querySelector(".app");
 window.addEventListener("load", ()=>{
    loader.style.display = "none";
    mainApp.style.position = "fixed";
 })
 
 
 let newsApi ="https://newsapi.org/v2/top-headlines?country=us&apiKey=4debdc3eb8c24810baa671a9de53fc37&category=";
 
 let app = document.querySelector(".app");

 let screen = {
    main:app.querySelector(".main-screen"),
    news:app.querySelector(".news-screen")
 };

let categories = ["General", "Business", "Entertainment", "Technology","Health" ,"Science", "Sports"];
for (let i = 0; i < categories.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = categories[i];
    div.addEventListener("click", function(){
        screen.main.querySelector(".categories .active").classList.remove("active");
        div.classList.add("active");
        fetchCategoryNews(categories[i]); 
          
    });
    if(i==0){
        div.classList.add("active");
        fetchCategoryNews(categories[i]);
    }
    screen.main.querySelector(".categories").appendChild(div); 


}

async function fetchCategoryNews(category){
    screen.main.querySelector(".news-list").innerHTML = "";
    try{
     let res  = await fetch(newsApi+category.toLowerCase()); 
     let data = await res.json();
     let  news = data.articles;
       console.log(news);
     for(let i = 0; i < news.length;i++){
        let div = document.createElement("div");
        div.classList.add("item");
        div.addEventListener("click",function(){
    showFullNews(news[i]); 
        });
        div.innerHTML =`
        <div class="thumbnail">
        <img src="${news[i].urlToImage}">
        </div>
        <div class="details">
        <h2>${news[i].title}</h2>
        <p>${news[i].description}</p>
        </div>
        `;
        screen.main.querySelector(".news-list").appendChild(div);
     }
    }catch(msg){

    }
}
   function showFullNews(news){
        window.location.href= news.url;
    }

//service worker
if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("serviceworker.js").then(registration =>{
        console.log("serviceworker.js registered");
        console.log(registration);

    }).catch(error =>{
        console.log("SW registration error");
        console.log(error);
    })
}



