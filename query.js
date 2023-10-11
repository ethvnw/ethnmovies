const query = new URLSearchParams(window.location.search).get('name');
document.title = `${query} - search results | ethanw.online`;
document.querySelector('input[name="name"]').value = query;

fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
.then(response => response.json())
.then(response => buildGrild(response.results))
.catch(err => console.error(err));

buildGrild = (data) => {
  if (data.length === 0) {
    const grid = document.querySelector('.grid');
    const h1 = document.createElement('h1');
    h1.innerText = "No results found";
    grid.appendChild(h1);

  } else {
    document.querySelector(".lds-ring").classList.remove(".lds-ring");
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    
    data.forEach(element => {
        const div = document.createElement("div");

        const link = document.createElement('a');
        if (element.media_type === 'movie') 
          link.href = `./watch.html?id=${element.id}&type=${element.media_type}`;
        else      
          link.href = `./watch.html?id=${element.id}&type=${element.media_type}&sea=1&ep=1`;

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
        img.alt = element.original_name;

        const title = document.createElement('h3');
        title.innerText = element.title || element.name;

        link.appendChild(img);
        div.appendChild(link);
        div.appendChild(title);
        grid.appendChild(div);
    })
  };
}