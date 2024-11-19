// Simulated user database
let users = JSON.parse(localStorage.getItem('users')) || [];

// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
    }
    return currentUser;
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            favorites: [],
            ratings: {}
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        window.location.href = 'index.html';
    });
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Add movie to favorites
function toggleFavorite(movieId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return;

    const favoriteIndex = users[userIndex].favorites.indexOf(movieId);
    if (favoriteIndex === -1) {
        users[userIndex].favorites.push(movieId);
    } else {
        users[userIndex].favorites.splice(favoriteIndex, 1);
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    
    // Update UI
    const favoriteBtn = document.querySelector(`[data-favorite="${movieId}"]`);
    if (favoriteBtn) {
        favoriteBtn.classList.toggle('text-red-600');
    }
}

// Rate movie
function rateMovie(movieId, rating) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return;

    users[userIndex].ratings[movieId] = rating;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

    // Update UI
    const ratingStars = document.querySelectorAll(`[data-rating="${movieId}"] .star`);
    ratingStars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('text-yellow-400');
        } else {
            star.classList.remove('text-yellow-400');
        }
    });
}

// Get user's favorite movies
function getFavorites() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.favorites : [];
}

// Get user's movie ratings
function getRatings() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.ratings : {};
}

// Social login handlers (to be implemented with actual OAuth)
function googleLogin() {
    // Implement Google OAuth login
    console.log('Google login clicked');
}

function facebookLogin() {
    // Implement Facebook OAuth login
    console.log('Facebook login clicked');
}
