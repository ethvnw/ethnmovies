const id = new URLSearchParams(window.location.search).get('id');
const type = new URLSearchParams(window.location.search).get('type');

const video = document.querySelector('.video');
const player = document.createElement('iframe');
player.src = `https://vidsrc.me/embed/${type}?tmdb=${id}`;
player.allowFullscreen = true;

video.appendChild(player);