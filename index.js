window.addEventListener('load', (_event) => {

    const el = document.getElementById('h5p-container');
    const searchParams = new URLSearchParams(window.location.search);
    const courses = [
        'schulung-allgemein-1806',
        'schulung-sanitat-bula-mobile-einheiten-1950',
        'schulung-sanitat-notfallpraxis-und-sanitatsposten-1921',
        'fr-schulung-allgemein-1983',
        'fr-schulung-sanitat-bula-mobile-einheiten-2019',
        'fr-schulung-sanitat-notfallpraxis-und-sanitatsposten-1985',
        'it-schulung-allgemein-1984',
        'it-schulung-sanitat-bula-mobile-einheiten-1979',
        'it-schulung-sanitat-notfallpraxis-und-sanitatsposten-2028'
    ];
    const langs = ['de', 'de', 'de', 'fr', 'fr', 'fr', 'it', 'it', 'it'];
    const names = ['Allgemein','Mobile Einheiten','Notfallpraxis und Sanitätsposten','Allgemein','Mobile Einheiten','Notfallpraxis und Sanitätsposten','Allgemein','Mobile Einheiten','Notfallpraxis und Sanitätsposten'];
    let loaded = false;
    if (searchParams.has('schulung')) {
        const index = Number.parseInt(searchParams.get('schulung'));
        if (!Number.isNaN(index) && courses.length > index) {
            const course = courses[index];
            const options = {
                h5pJsonPath: `/${course}`,
                frameJs: '/h5p-standalone-assets/frame.bundle.js',
                frameCss: '/h5p-standalone-assets/styles/h5p.css',
            }
            new H5PStandalone.H5P(el, options);
            loaded = true;
        }
        else {
            console.error('Could not load course', index);
        }
    }
    const nav = document.getElementById('courses');
    if (loaded) {
        nav.innerHTML = '<a href="./">Zurück zur Übersicht</a>';
    } else {
        const de = createLangDiv('Deutsch');
        const fr = createLangDiv('Français');
        const it = createLangDiv('Italiano');
        nav.appendChild(de);
        nav.appendChild(fr);
        nav.appendChild(it);
        const langDivs = { de, fr, it };

        courses.forEach(
            (_c, i) => {
                const div = document.createElement('div');
                div.classList.add('link-canvas');
                const block = document.createElement('div');
                block.classList.add('link-block');
                div.appendChild(block);
                const a = document.createElement('a');
                const la = document.createElement('span');
                //la.appendChild(document.createTextNode('❱'));
                la.classList.add('triangle');
                block.appendChild(la);
                block.appendChild(a);
                a.appendChild(document.createTextNode(names[i]));
                a.href = `/?schulung=${i}`;
                langDivs[langs[i]].appendChild(div);
            }
        );
    }
});

function createLangDiv(text) {
    const div = document.createElement('div');
    const deh = document.createElement('h3');
    div.classList.add('lang-block');
    deh.innerText = text;
    div.appendChild(deh);
    return div;
}
