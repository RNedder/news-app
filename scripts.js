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
    newsDiv.class = 'article';

    for (const article of articles) {
        const articleDiv = document.createElement('div'); // creates new div for each article
        articleDiv.class = 'col-12 col-md-6 col-lg-3';
        articleDiv.style = 'width: 18rem;';

        articleDiv.innerHTML = `
            <div class='card'>
                <img class='card-img-top img-fit' src='${article.urlToImage}' alt='...'>
                <div class='card-body'>
                    <h5 class='card-title'>${article.title}</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>${formatDate(article.publishedAt)}
                    <p class='card-text text-dark'>${standardizeDescription(article.description)}...</p>
                    <div class='text-end'>
                        <a href='${article.url}' class='btn btn-outline-danger'>Read the Article</a>
                    </div>
                </div>
            </div>
        `

        newsDiv.appendChild(articleDiv); // append the article to the newsDiv
    }
    // append articles to the newsDiv

}

// standardizes the description size and changes the text if 'null'
function standardizeDescription(description) {
    if(description === "null") {
        description = 'No description available.';
        return description;
    } else if(description.length > 150) {
        description = description.substring(0,150);
        return description;
    } else {
        return description;
    }
}

// formats date
function formatDate(date) {
    date = date.substring(0,10);
    return date;
}

fetchNews();