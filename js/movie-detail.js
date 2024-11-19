// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const currentMovieId = urlParams.get('id');

// Sample movie data (replace with actual API calls)
const movieData = {
    id: 1,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    backdrop_path: "https://image.tmdb.org/t/p/original/hqkIcbrOHL60u7suJWFHVPj9vOG.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-18",
    runtime: 152,
    vote_average: 9.0,
    genres: ["Action", "Crime", "Drama", "Thriller"],
    director: "Christopher Nolan",
    writers: ["Jonathan Nolan", "Christopher Nolan"],
    cast: [
        {
            name: "Christian Bale",
            character: "Bruce Wayne / Batman",
            profile_path: "https://image.tmdb.org/t/p/w200/qCpZn2e3dimwbryLnqxZuI88PTi.jpg"
        },
        {
            name: "Heath Ledger",
            character: "Joker",
            profile_path: "https://image.tmdb.org/t/p/w200/5Y9HnU0risgBYeHPFx3JyaZnw6E.jpg"
        },
        {
            name: "Aaron Eckhart",
            character: "Harvey Dent",
            profile_path: "https://image.tmdb.org/t/p/w200/kJ4hTL0eRKsS8ssK3V3l9PJfCG1.jpg"
        }
    ],
    similar_movies: [
        {
            id: 2,
            title: "Batman Begins",
            poster_path: "https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJd2UL.jpg",
            vote_average: 8.2
        },
        {
            id: 3,
            title: "The Dark Knight Rises",
            poster_path: "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
            vote_average: 8.4
        }
    ]
};

// Populate movie details
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const currentUser = checkAuth();
    if (!currentUser) return;

    // Set movie details
    document.getElementById('movie-backdrop').src = movieData.backdrop_path;
    document.getElementById('movie-poster').src = movieData.poster_path;
    document.getElementById('movie-title').textContent = movieData.title;
    document.getElementById('movie-year').textContent = new Date(movieData.release_date).getFullYear();
    document.getElementById('movie-runtime').textContent = `${movieData.runtime} min`;
    document.getElementById('movie-rating').textContent = `★ ${movieData.vote_average}`;
    document.getElementById('movie-overview').textContent = movieData.overview;
    document.getElementById('movie-director').textContent = movieData.director;
    document.getElementById('movie-writers').textContent = movieData.writers.join(', ');
    document.getElementById('movie-release-date').textContent = new Date(movieData.release_date).toLocaleDateString();

    // Add genres
    const genresContainer = document.getElementById('movie-genres');
    movieData.genres.forEach(genre => {
        const genreTag = document.createElement('span');
        genreTag.className = 'px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300';
        genreTag.textContent = genre;
        genresContainer.appendChild(genreTag);
    });

    // Add cast members
    const castContainer = document.getElementById('movie-cast');
    movieData.cast.forEach(member => {
        const castCard = document.createElement('div');
        castCard.className = 'bg-gray-800 rounded-lg overflow-hidden';
        castCard.innerHTML = `
            <img src="${member.profile_path}" alt="${member.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-semibold">${member.name}</h3>
                <p class="text-sm text-gray-400">${member.character}</p>
            </div>
        `;
        castContainer.appendChild(castCard);
    });

    // Add similar movies
    const similarMoviesContainer = document.getElementById('similar-movies');
    movieData.similar_movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card relative group';
        movieCard.innerHTML = `
            <img src="${movie.poster_path}" class="w-full h-auto rounded-lg transform group-hover:scale-105 transition duration-300" alt="${movie.title}">
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex flex-col items-center justify-center p-4">
                <h3 class="text-lg font-bold mb-2">${movie.title}</h3>
                <div class="flex items-center mb-4">
                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                    <span>${movie.vote_average}</span>
                </div>
                <a href="movie-detail.html?id=${movie.id}" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                    View Details
                </a>
            </div>
        `;
        similarMoviesContainer.appendChild(movieCard);
    });

    // Check if movie is in favorites
    const favorites = getFavorites();
    const favoriteBtn = document.querySelector('[onclick="toggleFavorite(currentMovieId)"]');
    if (favorites.includes(currentMovieId)) {
        favoriteBtn.querySelector('i').classList.add('text-red-600');
    }

    // Check user's rating
    const ratings = getRatings();
    if (ratings[currentMovieId]) {
        const stars = document.querySelectorAll('.star');
        for (let i = 0; i < ratings[currentMovieId]; i++) {
            stars[i].classList.add('text-yellow-400');
        }
    }
});
