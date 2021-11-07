'use strict';
const sourceURL = 'https://api.tvmaze.com/search/shows' 
const fetchShows = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

const form = document.querySelector('#search-form');
const query = document.querySelector('#query')
const target = document.querySelector('#target');

form.addEventListener('submit', async (event) => {
	event.preventDefault(); //Not set default action
	const url = form.action + '?q=' + query.value;
	const tvShows = await fetchShows(url);
	createShowCards(tvShows);
});

const createShowCards = (tvShows) => {
	target.innerHTML = '';
	tvShows.forEach((show) => {
		let showContent = show.show;
		const article = document.createElement('article');

		const header = document.createElement('header');

		const h2 = document.createElement('h2');
		h2.innerHTML = showContent.name;

		header.appendChild(h2);

		const figure = document.createElement('figure');
		const img = document.createElement('img');
		figure.appendChild(img);
		if (showContent.image !== null) {
			img.src = showContent.image.medium;
			img.alt = showContent.name;
		} else {
			img.src = 'http://placekitten.com/210/295';
			img.alt = 'image not available';
		};
		article.appendChild(header);
		article.appendChild(figure);

		const p = document.createElement('p');
		p.innerHTML = showContent.summary;
		article.appendChild(p);

		if(showContent.officialSite !== null){
			const a = document.createElement('a');
			a.innerHTML = 'Visit site';
			a.href = showContent.officialSite;
			article.appendChild(a)
		}

		target.appendChild(article);
	});
};
