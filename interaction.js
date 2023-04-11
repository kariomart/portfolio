const hoverImage = document.querySelector('.hover-image');
const tableRows = document.querySelectorAll('tbody tr');
const table = document.querySelector('table');
const myDiv = document.querySelector('#project-div');
const rows = document.querySelectorAll('tr:not(.header)');
const backbutton = document.getElementById('backtotablebutton');

let selected = false;



rows.forEach(row => {
    row.addEventListener('mouseover', () => {
        rows.forEach(r => {
            if (r !== row) {
                r.style.opacity = '0.5';
            }
        });
    });

    row.addEventListener('mouseout', () => {
        rows.forEach(r => {
            r.style.opacity = '1';
        });
    });
});

backbutton.addEventListener('mousedown', () => {
    console.log("backbutton pressed");
    const selectedRow = null; // initialize as null
    table.classList.remove('moved-down');
    selected = false;
});

table.addEventListener('animationend', () => {
    myDiv.style.display = 'block';
});

tableRows.forEach(row => {
    row.addEventListener('mouseover', () => {
        if (!selected) {
            const imgUrl = row.dataset.img;
            hoverImage.style.backgroundImage = `url(${imgUrl})`;
        }
    });

    row.addEventListener('mousedown', () => {
        const selectedRow = null; // initialize as null
        table.classList.add('moved-down');
        selected = true;
        const imgUrl = row.dataset.img;
        hoverImage.style.backgroundImage = `url(${imgUrl})`;
    });

    row.addEventListener('mouseout', () => {
        console.log(selected);
        if (!selected) {
            hoverImage.style.backgroundImage = '';
        }
    });
});

