var cookies = document.cookie.split(';');
var currentArray = [];
var historyArray = [];

async function getDetails(id, type, season, episode) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options);
    const responseJson = await response.json();

    if (type === "tv")
        currentArray.unshift({
            id: responseJson.id,
            title: responseJson.name ,
            img: responseJson.poster_path,
            season: season,
            episode: episode
        });
    else {
        historyArray.unshift({
            id: responseJson.id,
            title: responseJson.title,
            img: responseJson.poster_path
        });
    }
}

getAllDetails = async () => {
    for (var cookie of cookies) {
        cookie = cookie.trim();
        var attributes = cookie.split('=');
        var id = attributes[0];

        var details = attributes[1].split(',');
        var mediaType = details[0];
        var season = details[1];
        var episode = details[2];
        
        await getDetails(id, mediaType, season, episode)
    }

    buildCurrentGrid();
    buildHistoryGrid();
}


buildCurrentGrid = () => {
    const grid = document.querySelector('#current');
    grid.innerHTML = '';

    currentArray.forEach(element => {
        const div = document.createElement("div");

        const link = document.createElement('a');
        link.href = `./watch.html?id=${element.id}&type=tv&sea=${element.season}&ep=${element.episode}`;

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${element.img}`;
        img.alt = element.title;

        const title = document.createElement('h3');
        title.innerText = `${element.title} - Season ${element.season}, Episode ${element.episode}`;

        const remove = document.createElement('button');
        remove.innerText = 'Remove';
        remove.onclick = () => {
            document.cookie = `${element.id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            location.reload();
        }
        remove.classList.add('button', 'remove-button');

        link.appendChild(img);
        div.appendChild(link);
        div.appendChild(title);
        grid.appendChild(div);
        div.appendChild(remove);
    });
}

buildHistoryGrid = () => {
    const grid = document.querySelector('#history');
    grid.innerHTML = '';

    historyArray.forEach(element => {
        const div = document.createElement("div");

        const link = document.createElement('a');
        link.href = `./watch.html?id=${element.id}&type=movie`;

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${element.img}`;
        img.alt = element.title;

        const title = document.createElement('h3');
        title.innerText = element.title;

        const remove = document.createElement('button');
        remove.innerText = 'Remove';
        remove.onclick = () => {
            document.cookie = `${element.id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            location.reload();
        }
        remove.classList.add('button', 'remove-button');

        link.appendChild(img);
        div.appendChild(link);
        div.appendChild(title);
        grid.appendChild(div);
        div.appendChild(remove);
    });
}

getAllDetails();
