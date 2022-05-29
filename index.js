const courses = {
    'de': [
        {
            file: 'schulung-allgemein-1806',
            name: 'Allgemein'
        },
        {
            file: 'schulung-sanitat-bula-mobile-einheiten-1950',
            name: 'Mobile Einheiten'
        },
        {
            file: 'schulung-sanitat-notfallpraxis-und-sanitatsposten-1921',
            name: 'Notfallpraxis und Sanitätsposten'
        },
    ],
    'fr': [
        {
            file: 'fr-schulung-allgemein-1983',
            name: 'TODO (Allgemein)'
        },
        {
            file: 'fr-schulung-sanitat-bula-mobile-einheiten-2019',
            name: 'TODO (Mobile Einheiten)'
        },
        {
            file: 'fr-schulung-sanitat-notfallpraxis-und-sanitatsposten-1985',
            name: 'TODO (Notfallpraxis und Sanitätsposten)'
        },
    ],
    'it': [
        {
            file: 'it-schulung-allgemein-1984',
            name: 'TODO (Allgemein)'
        },
        {
            file: 'it-schulung-sanitat-bula-mobile-einheiten-1979',
            name: 'TODO (Mobile Einheiten)'
        },
        {
            file: 'it-schulung-sanitat-notfallpraxis-und-sanitatsposten-2028',
            name: 'TODO (Notfallpraxis und Sanitätsposten)'
        },
    ]
}
const langs = ['de', 'de', 'de', 'fr', 'fr', 'fr', 'it', 'it', 'it'];
const names = ['Allgemein', 'Mobile Einheiten', 'Notfallpraxis und Sanitätsposten', 'Allgemein', 'Mobile Einheiten', 'Notfallpraxis und Sanitätsposten', 'Allgemein', 'Mobile Einheiten', 'Notfallpraxis und Sanitätsposten'];
const titles = {
    'de': 'Schulung Sanität Bula',
    'fr': 'Formation Sanitaire Cafe',
    'it': 'Formazione Sanità Cafe',
}
const back = {
    'de': 'Zurück zur Übersicht',
    'fr': 'Retour à la vue d\'ensemble',
    'it': 'Torna alla panoramica',
}

window.addEventListener('load', (_event) => {
    const lang = getLang();
    if (lang) {
        const h1 = document.getElementById('title');
        document.title = titles[lang];
        h1.innerText = titles[lang];
    }
    const nav = document.getElementById('courses');
    const course = getCourseFromUrl(lang);
    if (course !== null) {
        const el = document.getElementById('h5p-container');
        new H5PStandalone.H5P(el, getCourseOptions(lang, course));
        const header = nav.firstElementChild;
        if (lang) {
            header.innerHTML = `<h1><a href="./?lang=${lang}">← ${back[lang] || '←'}</a></h1>`;
            ['de','fr','it'].forEach( l => {
                const a = document.createElement('a');
                a.href=`/?lang=${l}&course=${course}`;
                a.innerText = l.toUpperCase();
                header.appendChild(a);
            });
        } else {
            header.firstElementChild.outerHTML.innerHTML = `<a href="./">←</a>`;
        }
    } else {
        if (!lang || lang === 'de') {
            const de = createLangDiv('Deutsch');
            nav.appendChild(de);
            courses.de.forEach(
                (_c, i) => de.appendChild(createCourseLink(i, 'de'))
            );
        }
        if (!lang || lang === 'fr') {
            const fr = createLangDiv('Français');
            nav.appendChild(fr);
            courses.fr.forEach(
                (_c, i) => fr.appendChild(createCourseLink(i, 'fr'))
            );
        }
        if (!lang || lang === 'it') {
            const it = createLangDiv('Italiano');
            nav.appendChild(it);
            courses.it.forEach(
                (_c, i) => it.appendChild(createCourseLink(i, 'it'))
            );
        }
    }
});

function getLang() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('lang')) {
        const lang = searchParams.get('lang').toLowerCase();
        if (lang === 'de' || lang === 'fr' || lang === 'it') {
            return lang;
        }
    }
    return null;

}
function getCourseFromUrl(lang) {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('course')) {
        const index = Number.parseInt(searchParams.get('course'));
        if (!Number.isNaN(index) && courses[lang].length > index) {
            return index;
        }
        else {
            console.error('Could not load course', index);
        }
    }
    return null;
}
function getCourseOptions(lang, index) {
    const course = courses[lang][index].file;
    const options = {
        h5pJsonPath: `/${course}`,
        frameJs: '/h5p-standalone-assets/frame.bundle.js',
        frameCss: '/h5p-standalone-assets/styles/h5p.css',
    }
    return options;
}

function createLangDiv(text) {
    const div = document.createElement('div');
    const deh = document.createElement('h3');
    div.classList.add('lang-block');
    deh.innerText = text;
    div.appendChild(deh);
    return div;
}

function createCourseLink(i, lang) {
    const div = document.createElement('div');
    div.classList.add('link-canvas');

    const block = document.createElement('div');
    block.classList.add('link-block');
    div.appendChild(block);

    const la = document.createElement('span');
    la.classList.add('triangle');
    block.appendChild(la);

    const a = document.createElement('a');
    block.appendChild(a);
    a.appendChild(document.createTextNode(courses[lang][i].name));
    a.href = `/?course=${i}&lang=${lang}`;

    return div;
}