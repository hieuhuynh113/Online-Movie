// Sample movie data
const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: 9.0
    },
    {
        id: 2,
        title: "Inception",
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        rating: 8.8
    },
    {
        id: 3,
        title: "Interstellar",
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: 8.6
    }
];

// Function to create movie cards
function createMovieCard(movie) {
    return `
        <div class="movie-card relative group animate-fadeIn">
            <img src="${movie.image}" class="w-full h-auto rounded-lg transform group-hover:scale-105 transition duration-300" alt="${movie.title}">
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex flex-col items-center justify-center p-4">
                <h3 class="text-lg font-bold mb-2">${movie.title}</h3>
                <p class="text-sm mb-4 text-center">${movie.description.substring(0, 100)}...</p>
                <div class="flex items-center mb-4">
                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                    <span>${movie.rating}</span>
                </div>
                <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                    <i class="fas fa-play mr-2"></i> Play
                </button>
            </div>
        </div>
    `;
}

// Populate trending and popular sections
document.addEventListener('DOMContentLoaded', () => {
    const trendingSection = document.querySelector('#trending .grid');
    const popularSection = document.querySelector('#popular .grid');

    if (trendingSection && popularSection) {
        // Add movie cards to trending section
        movies.forEach(movie => {
            trendingSection.innerHTML += createMovieCard(movie);
        });

        // Add movie cards to popular section
        movies.forEach(movie => {
            popularSection.innerHTML += createMovieCard(movie);
        });
    }

    // Initialize search functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const movieCards = document.querySelectorAll('.movie-card');

            movieCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation when fetching content
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Example of loading content
function loadMoreMovies() {
    showLoading();
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        // Add more movie cards here
    }, 1500);
}

// Mobile menu toggle
const mobileMenuButton = document.querySelector('#mobile-menu-button');
const mobileMenu = document.querySelector('#mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
