// Story page translations
const storyTranslations = {
    en: {
        // First section
        scrollDown: "Scroll Down",
        whereEverything: "Where everything",
        began: "BEGAN",

        // Second section
        nonnaOriana: "NONNA ORIANA",
        openedFirst: "opened the first",
        pizzeria: "PIZZERIA",
        inA: "in a",
        smallBar: "small bar in ",
        veneto: "VENETO",

        traPizze: "Between pizzas, chaos and bigger",
        grandi: "DREAMS",
        piccolaPizzeria: "than a small pizzeria, a family",
        unaFamiglia: "WAS GROWING",        



        // Third section
        after: "After",
        fifteenYears: "15 YEARS",
        inVeneto: "in Veneto Oriana",
        decidedToMove: "decided to move to",
        aosta: "AOSTA",
        quote1: {
            line1: "Sometimes changing home",
            line2: "brings fresh energy!"
        },

        // Fourth section
        inAosta: "Settled In Aosta",
        orianaCreate: "Oriana created",
        pizzeriaAvalon: "AVALON",
        withTheHelpOfHer: "with the help of her",
        childrens: "childrens",

        theName: "The name ",
        avalon2: "AVALON",
        wasATribute: "was a tribute to her favourite",
        book: "BOOK: ",
        theMistsOfAvalon: "The Mists of Avalon",

        // Fifth section
        soniaAndJean: "Years later, Sonia",
        jeanPaul: "and Jean Paul transform",
        avalon: "Avalon",
        intoTruly: "into a truly",
        specialPlace: "special place",
        
       

        // Sixth section
        journeyContinues: "The journey continues!",
        moreToDiscover: "There's more to discover",
        menu: "Menu",
        game: "Game"
    },


    
    it: {
        // First section
        scrollDown: "Scorri in giù",
        whereEverything: "Dove tutto è",
        began: "INIZIATO",

        // Second section
        nonnaOriana: "NONNA ORIANA",
        openedFirst: "ha aperto la prima",
        pizzeria: "PIZZERIA",
        inA: "in un",
        smallBar: "piccolo bar in",
        veneto: "VENETO",

        traPizze: "Tra pizze, confusione e sogni più",
        grandi: "GRANDI",
        piccolaPizzeria: "di una piccola pizzeria, cresceva",
        unaFamiglia: "UNA FAMIGLIA",

        // Third section
        after: "Dopo",
        fifteenYears: "15 ANNI",
        inVeneto: "in Veneto Oriana",
        decidedToMove: "si è trasferita ad",
        aosta: "AOSTA",
        quote1: {
            line1: "A volte cambiare casa",
            line2: "porta nuova energia!"
        },

        // Fourth section
        inAosta: "stabilita ad Aosta",
        orianaCreate: "Oriana crea",
        pizzeriaAvalon: "AVALON",
        withTheHelpOfHer: "con l'aiuto dei suoi",
        childrens: "figli",
        
        theName: "Il nome",
        avalon2: "AVALON",
        wasATribute: "era un omaggio al suo",
        book: "LIBRO PREFERITO: ",
        theMistsOfAvalon: "Le Nebbie di Avalon",
        
        // Fifth section
        soniaAndJean: "Anni dopo, Sonia",
        jeanPaul: "e Jean Paul trasformano",
        avalon: "Avalon",
        intoTruly: "in un posto",
        specialPlace: "speciale",
       

        // Sixth section
        journeyContinues: "Il viaggio continua!",
        moreToDiscover: "C'è tanto altro da scoprire",
        menu: "Menu",
        game: "Gioco"
    },
    fr: {
        // First section
        scrollDown: "Défiler vers le bas",
        whereEverything: "Le point de",
        began: "départ",

        // Second section
        nonnaOriana: "NONNA ORIANA",
        openedFirst: "a ouvert la première",
        pizzeria: "PIZZERIA",
        inA: "dans un",
        smallBar: "petit bar à",
        veneto: "VÉNÉTIE",

        traPizze: "Entre pizzas, chaos et rêves plus ",
        grandi: "GRANDS",
        piccolaPizzeria: "qu'une petite pizzeria, grandissait ",
        unaFamiglia: "UNE FAMILLE",


        // Third section
        after: "Après",
        fifteenYears: "15 ANS",
        inVeneto: "en Vénétie Oriana",
        decidedToMove: "a  déménager à",
        aosta: "AOSTE",
        quote1: {
            line1: "Parfois, changer de maison",
            line2: "apporte une nouvelle énergie!"
        },

        // Fourth section
        inAosta: "En Aoste",
        orianaCreate: "Oriana crée",
        pizzeriaAvalon: "AVALON",
        withTheHelpOfHer: "avec l'aide de ses",
        childrens: "enfants",

        theName: "Le nom ",
        avalon2: "AVALON",
        wasATribute: "était un hommage à son",
        book: "LIVRE PRÉFÉRÉ: ",
        theMistsOfAvalon: "Les Brumes d'Avalon",

        // Fifth section
        soniaAndJean: "Sonia et",
        jeanPaul: "Jean Paul trasforment",
        avalon: "Avalon",
        intoTruly: "en un endroit",
        specialPlace: "vraiment spécial",
       

        // Sixth section
        journeyContinues: "Le voyage continue!",
        moreToDiscover: "Il y a encore tant à découvrir",
        menu: "Menu",
        game: "Jeu"
    }
};

// Function to update story content based on selected language
function updateStoryContent(lang) {
    // Get all elements that need translation
    const elements = {
        // First section
        scrollDown: document.querySelector('.first .scroll-down span'),
        whereEverything: document.querySelector('.first .main-title h1:not(.began)'),
        began: document.querySelector('.first .main-title h1.began'),
        
        // Second section
        nonnaOriana: document.getElementById('nonna-oriana'),
        openedFirst: document.getElementById('opened-first'),
        pizzeria: document.getElementById('pizzeria'),
        inA: document.getElementById('in-a'),
        smallBar: document.getElementById('small-bar'),
        veneto: document.getElementById('veneto'),

        traPizze: document.getElementById('tra-pizze'),
        grandi: document.getElementById('grandi'),
        piccolaPizzeria: document.getElementById('piccola-pizzeria'),
        unaFamiglia: document.getElementById('una-famiglia'),
        
        // Third section
        after: document.getElementById('after'),
        fifteenYears: document.getElementById('fifteen-years'),
        inVeneto: document.getElementById('in-veneto'),
        decidedToMove: document.getElementById('decided-to-move'),
        aosta: document.getElementById('aosta'),
        quote1Line1: document.querySelector('.third .quote p:nth-of-type(1)'),
        quote1Line2: document.querySelector('.third .quote p:nth-of-type(2)'),
        
        // Fourth section
        inAosta: document.getElementById('in-aosta'),
        pizzeriaAvalon: document.getElementById('pizzeria-avalon'),
        orianaCreate: document.getElementById('oriana-create'),
        withTheHelpOfHer: document.getElementById('with-the-help-of-her'),
        her: document.getElementById('her'),
        childrens: document.getElementById('childrens'),

        theName: document.getElementById('the-name'),
        avalon2: document.getElementById('avalon-2'),
        wasATribute: document.getElementById('was-a-tribute'),
        book: document.getElementById('book'),
        theMistsOfAvalon: document.getElementById('the-mists-of-avalon'),
        
        
        // Fifth section
        soniaAndJean: document.getElementById('sonia-and-jean'),
        jeanPaul: document.getElementById('jean-paul'),
        avalon: document.getElementById('avalon'),
        intoTruly: document.getElementById('into-truly'),
        specialPlace: document.getElementById('special-place'),
        clickToSee: document.querySelector('.fifth .quote3 p:nth-of-type(1)'),
        theTransformation: document.querySelector('.fifth .quote3 p:nth-of-type(2)'),
        
        // Sixth section
        journeyContinues: document.querySelector('.sixth .final1'),
        moreToDiscover: document.querySelector('.sixth .final2'),
        menu: document.querySelector('.sixth .menu-button'),
        game: document.querySelector('.sixth .game-button')
    };

    // Update each element with the translated text
    if (elements.scrollDown) elements.scrollDown.textContent = storyTranslations[lang].scrollDown;
    if (elements.whereEverything) elements.whereEverything.textContent = storyTranslations[lang].whereEverything;
    if (elements.began) elements.began.textContent = storyTranslations[lang].began;
    if (elements.nonnaOriana) elements.nonnaOriana.textContent = storyTranslations[lang].nonnaOriana;
    if (elements.openedFirst) elements.openedFirst.textContent = storyTranslations[lang].openedFirst;
    if (elements.pizzeria) elements.pizzeria.textContent = storyTranslations[lang].pizzeria;
    if (elements.inA) elements.inA.textContent = storyTranslations[lang].inA;
    if (elements.smallBar) elements.smallBar.textContent = storyTranslations[lang].smallBar;
    if (elements.veneto) elements.veneto.textContent = storyTranslations[lang].veneto;
    if (elements.traPizze) elements.traPizze.textContent = storyTranslations[lang].traPizze;
    if (elements.grandi) elements.grandi.textContent = storyTranslations[lang].grandi;
    if (elements.piccolaPizzeria) elements.piccolaPizzeria.textContent = storyTranslations[lang].piccolaPizzeria;
    if (elements.unaFamiglia) elements.unaFamiglia.textContent = storyTranslations[lang].unaFamiglia;
    if (elements.after) elements.after.textContent = storyTranslations[lang].after;
    if (elements.fifteenYears) elements.fifteenYears.textContent = storyTranslations[lang].fifteenYears;
    if (elements.inVeneto) elements.inVeneto.textContent = storyTranslations[lang].inVeneto;
    if (elements.decidedToMove) elements.decidedToMove.textContent = storyTranslations[lang].decidedToMove;
    if (elements.aosta) elements.aosta.textContent = storyTranslations[lang].aosta;
    if (elements.quote1Line1) elements.quote1Line1.textContent = storyTranslations[lang].quote1.line1;
    if (elements.quote1Line2) elements.quote1Line2.textContent = storyTranslations[lang].quote1.line2;
    if (elements.inAosta) elements.inAosta.textContent = storyTranslations[lang].inAosta;
    if (elements.pizzeriaAvalon) elements.pizzeriaAvalon.textContent = storyTranslations[lang].pizzeriaAvalon;
    if (elements.orianaCreate) elements.orianaCreate.textContent = storyTranslations[lang].orianaCreate;
    if (elements.withTheHelpOfHer) elements.withTheHelpOfHer.textContent = storyTranslations[lang].withTheHelpOfHer;
    if (elements.childrens) elements.childrens.textContent = storyTranslations[lang].childrens;
    if (elements.her) elements.her.textContent = storyTranslations[lang].her;

    if (elements.theName) elements.theName.textContent = storyTranslations[lang].theName;
    if (elements.avalon2) elements.avalon2.textContent = storyTranslations[lang].avalon2;
    if (elements.wasATribute) elements.wasATribute.textContent = storyTranslations[lang].wasATribute;
    if (elements.book) elements.book.textContent = storyTranslations[lang].book;
    if (elements.theMistsOfAvalon) elements.theMistsOfAvalon.textContent = storyTranslations[lang].theMistsOfAvalon;

    if (elements.soniaAndJean) elements.soniaAndJean.textContent = storyTranslations[lang].soniaAndJean;
    if (elements.jeanPaul) elements.jeanPaul.textContent = storyTranslations[lang].jeanPaul;
    if (elements.avalon) elements.avalon.textContent = storyTranslations[lang].avalon;
    if (elements.intoTruly) elements.intoTruly.textContent = storyTranslations[lang].intoTruly;
    if (elements.specialPlace) elements.specialPlace.textContent = storyTranslations[lang].specialPlace;
    if (elements.clickToSee) elements.clickToSee.textContent = storyTranslations[lang].clickToSee;
    if (elements.theTransformation) elements.theTransformation.textContent = storyTranslations[lang].theTransformation;
    if (elements.journeyContinues) elements.journeyContinues.textContent = storyTranslations[lang].journeyContinues;
    if (elements.moreToDiscover) elements.moreToDiscover.textContent = storyTranslations[lang].moreToDiscover;
    if (elements.menu) elements.menu.textContent = storyTranslations[lang].menu;
    if (elements.game) elements.game.textContent = storyTranslations[lang].game;
}

// Listen for language changes
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language from localStorage or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    updateStoryContent(currentLang);

    // Listen for language changes
    window.addEventListener('languageChanged', (event) => {
        updateStoryContent(event.detail.language);
    });
}); 