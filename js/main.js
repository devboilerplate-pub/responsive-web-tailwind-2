// DOM Elements
const archiveGrid = document.getElementById('archive-grid');
const popularGrid = document.getElementById('popular-grid');
const categoryNav = document.getElementById('category-nav');
const emptyState = document.getElementById('empty-state');
const filterStatus = document.getElementById('filter-status');
const filterTitle = document.getElementById('filter-title');
const clearFilterBtn = document.getElementById('clear-filter-btn');
const sortSelect = document.getElementById('sort-select');

const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');
const closeSearchBtn = document.getElementById('close-search-btn');
const searchInput = document.getElementById('search-input');

const favsBtn = document.getElementById('favs-btn');
const favCount = document.getElementById('fav-count');

// Modal Elements
const modal = document.getElementById('recipe-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalFavBtn = document.getElementById('modal-fav-btn');

// Menu Elements
const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const menuBackdrop = document.getElementById('menu-backdrop');
const closeMenuBtn = document.getElementById('close-menu-btn');

// State
let currentCategory = '전체';
let searchQuery = '';
let currentSort = 'default';
let favorites = JSON.parse(localStorage.getItem('recipeArchiveFavs')) || [];
let showOnlyFavorites = false;

// Initialize
function init() {
    setupCategories();
    setupHero();
    setupEventListeners();
    updateFavCount();
    renderArchive();
    renderPopular();
}

// Extract unique categories
function getCategories() {
    const cats = new Set(recipes.map(r => r.category));
    return ['전체', ...Array.from(cats)];
}

// Setup Category Nav
function setupCategories() {
    const categories = getCategories();
    categoryNav.innerHTML = categories.map(cat => `
        <button class="category-btn text-xs uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-colors ${cat === currentCategory ? 'text-tomato border-b-2 border-tomato pb-1' : 'text-deepgreen/60 hover:text-deepgreen'}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
                b.classList.add('text-deepgreen/60');
            });
            e.target.classList.remove('text-deepgreen/60');
            e.target.classList.add('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
            
            currentCategory = e.target.dataset.category;
            showOnlyFavorites = false;
            searchInput.value = '';
            searchQuery = '';
            renderArchive();
        });
    });
}

// Setup Hero (Use the first featured recipe or ID 1)
function setupHero() {
    const heroBtn = document.getElementById('hero-cta');
    if(heroBtn) {
        heroBtn.addEventListener('click', () => openModal(1));
    }
}

// Generate Editorial Classes based on index
function getEditorialClasses(index) {
    // Creating an asymmetric pattern
    const pattern = index % 5;
    if (pattern === 0) {
        // Large
        return {
            container: "col-span-12 md:col-span-8 lg:col-span-6 recipe-card group cursor-pointer",
            imageWrapper: "aspect-square md:aspect-[4/3] w-full recipe-image-wrapper mb-4",
            title: "text-3xl font-editorial mb-2 group-hover:text-tomato transition-colors"
        };
    } else if (pattern === 3) {
        // Medium
        return {
            container: "col-span-12 md:col-span-6 lg:col-span-4 recipe-card group cursor-pointer",
            imageWrapper: "aspect-square w-full recipe-image-wrapper mb-4",
            title: "text-2xl font-editorial mb-2 group-hover:text-tomato transition-colors"
        };
    } else {
        // Small/Tall
        return {
            container: "col-span-12 md:col-span-4 lg:col-span-3 recipe-card group cursor-pointer",
            imageWrapper: "aspect-[4/5] w-full recipe-image-wrapper mb-4",
            title: "text-xl font-editorial mb-2 group-hover:text-tomato transition-colors"
        };
    }
}

// Render Recipe Card HTML
function generateRecipeCard(recipe, styleClasses) {
    const isFav = favorites.includes(recipe.id);
    return `
        <article class="${styleClasses.container}" onclick="openModal(${recipe.id})">
            <div class="${styleClasses.imageWrapper} relative">
                <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover">
                <button class="absolute top-4 right-4 p-2 bg-ivory/80 backdrop-blur-sm rounded-full text-deepgreen hover:text-tomato transition-colors ${isFav ? 'text-tomato' : ''}" onclick="toggleFavorite(event, ${recipe.id})">
                    <svg class="w-4 h-4" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
            </div>
            <div class="flex items-center gap-3 mb-2">
                <span class="text-[10px] uppercase tracking-widest text-tomato font-bold">${recipe.category}</span>
                <span class="w-1 h-1 bg-deepgreen/20 rounded-full"></span>
                <span class="text-[10px] uppercase tracking-widest text-deepgreen/60">${recipe.cookingTime}</span>
            </div>
            <h3 class="${styleClasses.title}">${recipe.title}</h3>
        </article>
    `;
}

// Render Archive Grid
function renderArchive() {
    let filtered = [...recipes];

    if (showOnlyFavorites) {
        filtered = filtered.filter(r => favorites.includes(r.id));
        filterStatus.classList.remove('hidden');
        filterTitle.innerHTML = `찜한 레시피 <span class="text-sm font-sans text-deepgreen/50 ml-2">(${filtered.length})</span>`;
    } else {
        if (currentCategory !== '전체') {
            filtered = filtered.filter(r => r.category === currentCategory);
        }
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(r => 
                r.title.toLowerCase().includes(query) || 
                r.ingredients.some(i => i.toLowerCase().includes(query))
            );
            filterStatus.classList.remove('hidden');
            filterTitle.innerHTML = `"${searchQuery}" 검색 결과 <span class="text-sm font-sans text-deepgreen/50 ml-2">(${filtered.length})</span>`;
        } else if (currentCategory !== '전체') {
            filterStatus.classList.remove('hidden');
            filterTitle.innerHTML = `${currentCategory} <span class="text-sm font-sans text-deepgreen/50 ml-2">(${filtered.length})</span>`;
        } else {
            filterStatus.classList.add('hidden');
        }
    }

    // Sorting
    if (currentSort === 'time') {
        filtered.sort((a, b) => parseInt(a.cookingTime) - parseInt(b.cookingTime));
    } else if (currentSort === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filtered.length === 0) {
        archiveGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        archiveGrid.innerHTML = filtered.map((recipe, index) => {
            const styles = getEditorialClasses(index);
            return generateRecipeCard(recipe, styles);
        }).join('');
    }
}

// Render Popular (Simple grid, just grab last 4)
function renderPopular() {
    const popRecipes = recipes.slice(-4);
    popularGrid.innerHTML = popRecipes.map(recipe => {
        const isFav = favorites.includes(recipe.id);
        return `
            <article class="group cursor-pointer" onclick="openModal(${recipe.id})">
                <div class="aspect-square w-full mb-3 overflow-hidden relative">
                    <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
                <h4 class="font-editorial text-lg group-hover:text-tomato transition-colors line-clamp-2">${recipe.title}</h4>
            </article>
        `;
    }).join('');
}

// Favorites Logic
function toggleFavorite(e, id) {
    if(e) e.stopPropagation();
    
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    
    localStorage.setItem('recipeArchiveFavs', JSON.stringify(favorites));
    updateFavCount();
    
    // Re-render to update icon states
    if (showOnlyFavorites) {
        renderArchive();
    } else {
        // Quick DOM update for hearts without re-rendering entire grid
        if(e) {
            const svg = e.currentTarget.querySelector('svg');
            const isFav = favorites.includes(id);
            if(isFav) {
                svg.setAttribute('fill', 'currentColor');
                e.currentTarget.classList.add('text-tomato');
            } else {
                svg.setAttribute('fill', 'none');
                e.currentTarget.classList.remove('text-tomato');
            }
        }
    }
    
    // If modal is open for this recipe, update its button too
    if (!modal.classList.contains('hidden') && currentModalRecipeId === id) {
        updateModalFavButton(id);
    }
}

function updateFavCount() {
    if (favorites.length > 0) {
        favCount.textContent = favorites.length;
        favCount.classList.remove('opacity-0');
    } else {
        favCount.classList.add('opacity-0');
    }
}

// Modal Logic
let currentModalRecipeId = null;

function openModal(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    currentModalRecipeId = id;
    
    // Populate Data
    document.getElementById('modal-image').src = recipe.image;
    document.getElementById('modal-category').textContent = recipe.category;
    document.getElementById('modal-title').textContent = recipe.title;
    document.getElementById('modal-time').textContent = recipe.cookingTime;
    document.getElementById('modal-diff').textContent = recipe.difficulty;
    document.getElementById('modal-serv').textContent = recipe.servings;
    document.getElementById('modal-desc').textContent = recipe.description;
    
    document.getElementById('modal-ingredients').innerHTML = recipe.ingredients.map(ing => `
        <li class="flex items-start gap-3 text-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-tomato mt-1.5 flex-shrink-0"></span>
            <span class="text-deepgreen/90 leading-relaxed">${ing}</span>
        </li>
    `).join('');
    
    document.getElementById('modal-steps').innerHTML = recipe.steps.map((step, idx) => `
        <div class="flex gap-4">
            <div class="font-editorial text-4xl text-deepgreen/20 font-bold leading-none">${String(idx+1).padStart(2, '0')}</div>
            <p class="text-deepgreen/90 leading-relaxed pt-1">${step}</p>
        </div>
    `).join('');
    
    updateModalFavButton(id);

    // Show Modal
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    
    // Animation trigger
    setTimeout(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalContent.classList.remove('translate-x-full');
    }, 10);
}

function updateModalFavButton(id) {
    const isFav = favorites.includes(id);
    const svg = modalFavBtn.querySelector('svg');
    const text = document.getElementById('modal-fav-text');
    
    if (isFav) {
        svg.setAttribute('fill', 'currentColor');
        modalFavBtn.classList.add('text-tomato');
        text.textContent = '찜 완료';
    } else {
        svg.setAttribute('fill', 'none');
        modalFavBtn.classList.remove('text-tomato');
        text.textContent = '찜하기';
    }
}

function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalContent.classList.add('translate-x-full');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        currentModalRecipeId = null;
    }, 500); // Wait for transition
}

// Event Listeners
function setupEventListeners() {
    // Search UI
    searchBtn.addEventListener('click', () => {
        searchContainer.classList.remove('hidden');
        searchInput.focus();
    });
    
    closeSearchBtn.addEventListener('click', () => {
        searchContainer.classList.add('hidden');
        searchInput.value = '';
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchQuery = e.target.value.trim();
            currentCategory = '전체';
            showOnlyFavorites = false;
            
            // Reset nav UI
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
                b.classList.add('text-deepgreen/60');
            });
            document.querySelector('.category-btn[data-category="전체"]').classList.add('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
            
            searchContainer.classList.add('hidden');
            renderArchive();
        }
    });

    // Favorites filter
    favsBtn.addEventListener('click', () => {
        showOnlyFavorites = true;
        searchQuery = '';
        currentCategory = '전체';
        
        // Reset nav UI
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
            b.classList.add('text-deepgreen/60');
        });
        
        renderArchive();
    });

    // Clear filter
    clearFilterBtn.addEventListener('click', () => {
        showOnlyFavorites = false;
        searchQuery = '';
        currentCategory = '전체';
        
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
            b.classList.add('text-deepgreen/60');
        });
        document.querySelector('.category-btn[data-category="전체"]').classList.add('text-tomato', 'border-b-2', 'border-tomato', 'pb-1');
        
        renderArchive();
    });

    // Sort
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderArchive();
    });

    // Modal
    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    modalFavBtn.addEventListener('click', () => {
        if (currentModalRecipeId) toggleFavorite(null, currentModalRecipeId);
    });



    // Menu Logic
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('hidden');
            document.body.classList.add('modal-open');
            setTimeout(() => {
                menuBackdrop.classList.remove('opacity-0');
            }, 10);
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
            const action = e.target.dataset.action;
            setTimeout(() => {
                if (action === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (action === 'archive') {
                    document.getElementById('archive-grid').scrollIntoView({ behavior: 'smooth' });
                } else if (action === 'popular') {
                    document.getElementById('popular-grid').scrollIntoView({ behavior: 'smooth' });
                } else if (action === 'favs') {
                    favsBtn.click();
                    document.getElementById('filter-status').scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    });
}

function closeMenu() {
    if (!menuBackdrop || !menuOverlay) return;
    menuBackdrop.classList.add('opacity-0');
    setTimeout(() => {
        menuOverlay.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }, 300);
}

// Start
document.addEventListener('DOMContentLoaded', init);
