// Initialization
const breakingImg = document.querySelector("#breaking-img");
const breakingNewsTitle = document.querySelector("#breaking-news .title");
const breakingNewsDesc = document.querySelector("#breaking-news .description");
const topNews = document.querySelector(".right .top-news");
const healthNews = document.querySelector("#health .news-box");
const businessNews = document.querySelector("#business .news-box");
const sportsNews = document.querySelector("#sports .news-box");
const technologyNews = document.querySelector("#technology .news-box");
const header = document.getElementsByTagName("header")[0];

// making header sticky
window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
})

// fetchimg news data from website data
const apiKey = "8ecc17b24e804a35834a552d95e6c49d";

const fetchDataNews = async (category, pageSize) => {
    try {
        // const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=tennis&countries=id`;
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&country=us&apiKey=${apiKey}`;
        const data = await fetch(url);
        const response = await data.json();
        return response.articles;
    } catch (err) {
        console.log(err);
    }
};

// adding breaking news from api
fetchDataNews("business", 5).then((data) => {
    breakingImg.innerHTML = `<img src="${data[0].urlToImage}" alt="Breaking Image" />`;
    breakingNewsTitle.innerHTML = `<a href="${data[0].url}" target="_blank" ><h2>${data[0].title}</h2></a>`;
    breakingNewsDesc.innerHTML = data[0].description;
});

// adding top headlines
fetchDataNews("general", 20).then((data) => {
    let html = "";
    let title = "";
    data.map((e) => {
        if (e.title.length < 70){
            title = e.title;
        } else {
            title = e.title.slice(0, 70) + "...";
        }
        html += `<div class="news">
                    <div class="img"><img src="${e.urlToImage}" alt="top image" /></div>
                    <div class="text">
                        <div class="title"><a href="${e.url}" target="_blank" >${title}</a></div>
                    </div>
                </div>`;
    });
    topNews.innerHTML = html;
});

// adding sub news
const addSubNews = (subNews, category, pageSize) => {
    fetchDataNews(category, pageSize).then((data) => {
        let html = "";
        let title = ""
        data.map((e) => {
            if (e.title.length < 50){
                title = e.title;
            } else {
                title = e.title.slice(0,50) + "...";
            }
            html += `<div class="news-card">
                        <div class="img"><img src="${e.urlToImage}" alt="top image" /></div>
                        <div class="text">
                            <div class="title"><a href="${e.url}" target="_blank" >${title}</a></div>
                        </div>
                    </div>`;
        });
        subNews.innerHTML = html;
    });
}
addSubNews(healthNews, "health", 5);
addSubNews(businessNews, "business", 5);
addSubNews(sportsNews, "sports", 5);
addSubNews(technologyNews, "technology", 5);