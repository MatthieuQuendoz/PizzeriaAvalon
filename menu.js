// Get the current language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Ensure the language is one of the supported languages
const supportedLanguages = ['en', 'it', 'fr'];
if (!supportedLanguages.includes(currentLanguage)) {
    currentLanguage = 'en';
    localStorage.setItem('language', currentLanguage);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch menu data
        const response = await fetch('data/menu.json');
        const data = await response.json();
        
        // Generate navigation buttons and sections
        generateMenu(data.categories);
        
        // Setup navigation and scroll behavior
        setupNavigation();

        // Listen for language changes
        window.addEventListener('languageChanged', (event) => {
            if (supportedLanguages.includes(event.detail.language)) {
                currentLanguage = event.detail.language;
                localStorage.setItem('language', currentLanguage);
                updateMenuLanguage(data.categories);
            }
        });
        
        // Generate marquee dei ringraziamenti
        generateThanksMarquee();
    } catch (error) {
        console.error('Error loading menu:', error);
    }
});

function generateMenu(categories) {
    const nav = document.querySelector('.categories');
    const main = document.querySelector('.menu-content');
    
    // Clear existing content
    nav.innerHTML = '';
    main.innerHTML = '';
    
    // Generate navigation buttons and sections
    categories.forEach((category, index) => {
        // Add navigation button
        const button = document.createElement('button');
        button.className = `category-button ${index === 0 ? 'active' : ''}`;
        button.setAttribute('data-section', category.id);
        button.textContent = category.name[currentLanguage];
        nav.appendChild(button);

        // Create section
        const section = document.createElement('section');
        section.className = 'menu-section';
        section.id = category.id;
        
        // Add marquee
        const marqueeDiv = document.createElement('div');
        marqueeDiv.className = 'marquee';
        marqueeDiv.innerHTML = `
            <div class="marquee-content" id="${category.id}MarqueeContent">
            </div>
        `;
        section.appendChild(marqueeDiv);
        
        // Add items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'items-container';
        
        // Add menu items
        category.items.forEach(item => {
            itemsContainer.appendChild(createMenuItem(item));
        });
        
        section.appendChild(itemsContainer);
        main.appendChild(section);
        
        // Generate marquee content
        generateMarqueeForCategory(category.id);
    });
}

function createMenuItem(item) {
    const article = document.createElement('article');
    article.className = 'menu-item';
    
    article.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-title">${item.name}</h3>
                <span class="menu-item-price">€${item.price.toFixed(2)}</span>
            </div>
            <p class="menu-item-description">${item.description[currentLanguage]}</p>
            <button class="add-button">${getAddButtonText(currentLanguage)}</button>
        </div>
    `;
    
    return article;
}

function updateMenuLanguage(categories) {
    // Update category buttons
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach((button, index) => {
        button.textContent = categories[index].name[currentLanguage];
    });

    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        const titleContainer = title.parentNode;
        const titleElements = titleContainer.querySelectorAll('.section-title span');
        titleElements.forEach((span, langIndex) => {
            span.textContent = categories[index].name[supportedLanguages[langIndex]];
        });
    });

    // Update menu item descriptions and buttons
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((menuItem, index) => {
        const categoryIndex = Math.floor(index / categories[0].items.length);
        const itemIndex = index % categories[0].items.length;
        const item = categories[categoryIndex].items[itemIndex];
        
        const description = menuItem.querySelector('.menu-item-description');
        const addButton = menuItem.querySelector('.add-button');
        
        description.textContent = item.description[currentLanguage];
        addButton.textContent = getAddButtonText(currentLanguage);
    });
}

function getAddButtonText(language) {
    const texts = {
        'en': 'Add',
        'it': 'Aggiungi',
        'fr': 'Ajouter'
    };
    return texts[language] || texts['en'];
}

function setupNavigation() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const sections = document.querySelectorAll('.menu-section');

    // Intersection Observer for sections
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const activeButton = document.querySelector(`.category-button[data-section="${sectionId}"]`);
                
                if (activeButton) {
                    categoryButtons.forEach(button => button.classList.remove('active'));
                    activeButton.classList.add('active');
                    scrollCategoryIntoView(activeButton);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Scroll to section
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                const offset = 120; // Adjust this value to control how much of the video remains visible
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollCategoryIntoView(button) {
    const categories = document.querySelector('.categories');
    const containerRect = categories.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    const isFullyVisible = 
        buttonRect.left >= containerRect.left &&
        buttonRect.right <= containerRect.right;

    if (!isFullyVisible) {
        const scrollLeft = 
            buttonRect.left -
            containerRect.left -
            (containerRect.width - buttonRect.width) / 2;
        
        categories.scrollTo({
            left: categories.scrollLeft + scrollLeft,
            behavior: 'smooth'
        });
    }
} 



const categoryMarquees = {
    entries: {
        words: ["•", "Antipasti", "•", "Entries", "•", "Entrées"],
        id: "entriesMarquee"
    },
    "popular-pizzas": {
        words: ["•", "Pizze popolari", "•", "Popular Pizzas", "•", "Pizzas Populaires"],
        id: "redPizzasMarquee"
    },
    "classic-pizzas": {
        words: ["•", "Pizze classiche", "•", "Classic Pizzas", "•", "Pizzas Classiques"],
        id: "whitePizzasMarquee"
    },
    desserts: {
        words: ["•", "Dolci", "•", "Desserts", "•", "Desserts"],
        id: "dessertsMarquee"
    },
    drinks: {
        words: ["•", "Bevande", "•", "Drinks", "•", "Boissons"],
        id: "drinksMarquee"
    },
    thanks: {
        words: ["•", "Grazie", "•", "Thank You", "•", "Merci"],
        id: "thanksMarquee"
    }
};

function generateMarqueeForCategory(categoryId) {
    const marqueeContent = document.getElementById(`${categoryId}MarqueeContent`);
    if (!marqueeContent || !categoryMarquees[categoryId]) return;

    const words = categoryMarquees[categoryId].words;
    
    // Pulisce il contenuto esistente
    marqueeContent.innerHTML = '';
    
    // Crea il contenuto una volta
    let isFirstSetRed = true;
    const content = Array(4).fill(null).map(() => {
        isFirstSetRed = !isFirstSetRed;
        return words.reduce((acc, word, index) => {
            const pairIndex = Math.floor(index / 2);
            const isRed = isFirstSetRed ? (pairIndex % 2 === 0) : (pairIndex % 2 === 1);
            const color = isRed ? '#b53328' : '#2e1c1b';
            return acc + `<span class="word" style="color: ${color}">${word}</span>`;
        }, '');
    }).join('');
    
    marqueeContent.innerHTML = content;
    
    // Aggiungi event listener per il click
    marqueeContent.addEventListener('click', function() {
        this.classList.toggle('reverse');
    });
}

// Funzione per generare il marquee dei ringraziamenti
function generateThanksMarquee() {
    generateMarqueeForCategory('thanks');
}
