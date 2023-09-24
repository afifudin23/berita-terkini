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
const navbar = document.querySelector("nav .bar");
const menu = document.querySelector("nav ul");

// make toggle Navbar
navbar.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menu.classList.toggle("active-menu");
});

// making header sticky
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// fetching news data from website data
const apiKey = "8ecc17b24e804a35834a552d95e6c49d";

const fetchDataNews = async (category) => {
    const data = await fetch("../db/db.json");
    const response = await data.json();
    return response[category];
};

fetchDataNews("general").then((data) => {
    console.log(data);
});

// adding breaking news from api
fetchDataNews("general").then((data) => {
    breakingImg.innerHTML = `<img src="${data[0].pathImg}" alt="Breaking Image" />`;
    breakingNewsTitle.innerHTML = /*html*/ `
                            <a href="${data[0].url}" target="_blank" >
                                <h2>${data[0].title}</h2>
                            </a>`;
    breakingNewsDesc.innerHTML = data[0].desc;
});

// adding top headlines
fetchDataNews("general").then((data) => {
    let html = "";
    let title = "";
    data.map((e, i) => {
        if (i == 0) {
            return true;
        }
        if (e.title.length < 100) {
            title = e.title;
        } else {
            title = `${e.title.slice(0, 100)}...`;
        }
        html += /*html*/ `
            <div class="news">
                <div class="img"><img src="${e.pathImg}" alt="top image" /></div>
                <div class="text">
                    <div class="title"><a href="${e.url}" target="_blank" >${title}</a></div>
                </div>
            </div>`;
        return true;
    });
    topNews.innerHTML = html;
});

// adding sub news
const addSubNews = (subNews, category) => {
    fetchDataNews(category).then((data) => {
        let html = "";
        let title = "";
        let desc = "";
        data.map((e) => {
            if (e.title.length < 50) {
                title = e.title;
            } else {
                title = `${e.title.slice(0, 50)}...`;
            }
            if (e.desc.length < 75) {
                desc = e.desc;
            } else {
                desc = `${e.desc.slice(0, 75)}...`;
            }
            html += /*html*/ `
                    <div class="news-card">
                        <div class="img"><img src="${e.pathImg}" alt="top image" /></div>
                        <div class="text">
                            <div class="title"><a href="${e.url}" target="_blank" >${title}</a></div>
                            <div class="desc">${desc}</div>
                        </div>
                    </div>`;
            return true;
        });
        subNews.innerHTML = html;
    });
};
addSubNews(healthNews, "health");
addSubNews(businessNews, "business");
addSubNews(sportsNews, "sports");
addSubNews(technologyNews, "technology");
