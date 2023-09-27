const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQyZDUzZWE3ODU2MjlkZDljNWQ3MzE2MDczYTc2MyIsInN1YiI6IjY0ZTdhZWJlMDZmOTg0MDBjYTU0ZGY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6-Fwa8nHbJ3KS7PPwcZzZIHfERO0rpPKxKR30L7fcxs'
    }
};



var button = document.getElementById("randomBtn");

button.onclick = () => {
    var page = Math.trunc(Math.random()*500);
    
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`, options)
    .then(response => response.json())
    .then(response => randomMov(response.results))
    .catch(err => console.error(err));
    
}

randomMov = (data) => {
    var movie = Math.trunc(Math.random()*19);
    window.location.href = "./watch.html?id=" + data[movie].id + "&type=movie";
}
