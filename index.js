// Initialization
const breakingImg = document.querySelector("#breaking-img");
const breakingNewsTitle = document.querySelector("#breaking-news .title");
const breakingNewsDesc = document.querySelector("#breaking-news .description");

// fetchimg news data from website data
const apiKey = "5c6ae400ed564f22a61c2af155db00c2";

const fetchDataNews = async (category, pageSize) => {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=id&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
        const data = await fetch(url)
        const response = await data.json()
        return (response.articles)
    } catch (err) {
        console.log(err);
    }
}

// adding breaking news from api
    fetchDataNews("business",3)
        .then(data => {
            breakingImg.innerHTML = `<img src="${data[1].urlToImage}" alt="Breaking Image" />`;
            breakingNewsTitle.innerHTML = `<a href="${data[1].url}" target="_blank" ><h2>${data[1].title}</h2></a>`;
            breakingNewsDesc.innerHTML = data[1].description;
            console.log(data);
        })

