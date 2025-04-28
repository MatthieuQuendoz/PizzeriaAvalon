document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const languageLinks = document.querySelectorAll('.dropdown-content a');
    const navButtons = document.querySelectorAll('.nav-button');

    // Translations for navigation buttons
    const translations = {
        en: {
            menu: 'Menu',
            game: 'The game',
            story: 'Our Story'
        },
        it: {
            menu: 'Menu',
            game: 'Il gioco',
            story: 'La nostra storia'
        },
        fr: {
            menu: 'Menu',
            game: 'Le jeu',
            story: 'Notre histoire'
        }
    };

    // Function to update navigation buttons text
    const updateNavButtons = (lang) => {
        navButtons.forEach(button => {
            const buttonType = button.getAttribute('href').replace('.html', '');
            if (translations[lang] && translations[lang][buttonType]) {
                button.textContent = translations[lang][buttonType];
            }
        });
    };

    // Set initial language from localStorage or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    const currentLangText = Array.from(languageLinks)
        .find(link => link.dataset.lang === currentLang)
        ?.textContent.trim() || 'English 🇬🇧';
    
    dropdownButton.innerHTML = `
        <span>${currentLangText}</span>
        <span class="dropdown-arrow">▼</span>
    `;

    // Update navigation buttons with initial language
    updateNavButtons(currentLang);

    // Toggle dropdown on click (for mobile devices)
    dropdownButton.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-dropdown')) {
            dropdownContent.style.display = 'none';
        }
    });

    // Handle language selection
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.currentTarget.dataset.lang;
            const langText = e.currentTarget.textContent.trim();

            // Update button content
            dropdownButton.innerHTML = `
                <span>${langText}</span>
                <span class="dropdown-arrow">▼</span>
            `;

            // Close dropdown
            dropdownContent.style.display = 'none';

            // Save language to localStorage
            localStorage.setItem('language', lang);

            // Update navigation buttons
            updateNavButtons(lang);

            // Emit language changed event
            const event = new CustomEvent('languageChanged', {
                detail: { language: lang }
            });
            window.dispatchEvent(event);
        });
    });
}); 