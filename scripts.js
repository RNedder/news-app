const apiKey = process.env.NEWS_API_KEY; 

const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        displayNews(data.articles); // calls displayNews function
    } catch (error) {
        console.error('There was an error!', error);
    }
}

function displayNews(articles) { // pass in articles to iterate through and populate into divs
    const newsDiv = document.getElementById('news');

    for (const article of articles) {
        const articleDiv = document.createElement('div'); // creates new div for each article

        const title = document.createElement('h4'); // creates new h4 element for the headline and appends to the article
        title.textContent = article.title;

        const date = document.createElement('h5'); // creates new h5 element for the date 
        date.textContent = article.publishedAt;

        const description = document.createElement('p'); // creates new p element for the description
        description.textContent = article.description;

        const url = document.createElement('p'); // creates new p element for the url
        url.textContent = article.url;

        articleDiv.appendChild(title); // appends information to the articleDiv  date, description, url
        articleDiv.appendChild(date);
        articleDiv.appendChild(description);
        articleDiv.appendChild(url);

        newsDiv.appendChild(articleDiv); // append the article to the newsDiv
    }
    // append articles to the newsDiv

}

fetchNews();