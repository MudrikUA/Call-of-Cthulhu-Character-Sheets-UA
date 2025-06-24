function printDivContent() {
    // var divToPrint = document.querySelector('.' + 'document-container');
    // var newWin = window.open('', 'Print-Window');

    // newWin.document.open();
    // newWin.document.write('<html><head><title>Print</title></head><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    // newWin.document.close();

    // setTimeout(function () {
    //     newWin.close();
    // }, 10);
    document.body.style.justifyContent = 'normal';
    document.body.style.alignItems = 'normal';
    document.querySelector('.print-btn').style.visibility = 'hidden';
    window.print();
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.querySelector('.print-btn').style.visibility = 'visible';
}

function printDocument() {
    // var printContents = document.querySelector('.document-container').innerHTML;
    // var originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
    // window.location.reload(); // Reload the page to restore original content
}


//опрацювання зображення
document.getElementById('imageContainer').addEventListener('click', function () {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Завантажене зображення';
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxHeight = '100%';
            img.style.maxWidth = '100%';
            img.style.display = 'block';
            document.getElementById('imageContainer').innerHTML = '';
            document.getElementById('imageContainer').appendChild(img);
            document.getElementById('imageContainer').style.backgroundColor = '#ebd2ba';
        }
        reader.readAsDataURL(file);

    }
});


// Отримуємо всі елементи з класом .input-field
const inputFields = document.querySelectorAll('.input-field');

// Функція для зменшення та збільшення розміру тексту в полі вводу
function adjustFontSize(inputField) {
    const initialFontSize = parseFloat(window.getComputedStyle(inputField).fontSize);
    const maxWidth = inputField.clientWidth - 10; // Враховуємо відступ справа
    let currentFontSize = initialFontSize;

    // Функція для зміни розміру тексту
    function resizeText() {
        const textWidth = getTextWidth(inputField.value, currentFontSize + 'px ' + window.getComputedStyle(inputField).fontFamily);

        // Перевірка, чи текст не перевищує максимальний розмір
        if (textWidth > maxWidth && currentFontSize > 5) {
            currentFontSize--;
        } else if (currentFontSize < initialFontSize) {
            currentFontSize++;
        }

        // Обмеження мінімального та максимального розміру
        if (currentFontSize < 5) currentFontSize = 5; // Мінімальний розмір шрифту
        if (currentFontSize > initialFontSize) currentFontSize = initialFontSize; // Початковий розмір шрифту

        inputField.style.fontSize = currentFontSize + 'px';
    }

    // Виклик функції при введенні тексту
    inputField.addEventListener('input', resizeText);

    // Відновлення початкового розміру при видаленні тексту
    inputField.addEventListener('keyup', function (event) {
        if (event.keyCode === 8 || event.keyCode === 46) { // Backspace або Delete
            resizeText();
        }
    });

    // Визначення ширини тексту для заданого розміру шрифту і шрифту
    function getTextWidth(text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const width = context.measureText(text).width;
        canvas.remove();
        return width;
    }
}

// Застосовуємо функцію для кожного поля вводу
inputFields.forEach(adjustFontSize);

//збереження координат кліку курсору в буфер обміну
// document.addEventListener('DOMContentLoaded', function () {
//     const container = document.querySelector('.document-container');
//     const output = document.getElementById('output');

//     container.addEventListener('click', recordClick);

//     function recordClick(event) {
//         const rect = container.getBoundingClientRect();
//         const offsetX = Math.round(event.clientX - rect.left);
//         const offsetY = Math.round(event.clientY - rect.top);

//         const coordinates = `top: ${offsetY}px; left: ${offsetX}px;`;

//         output.textContent = coordinates;

//         navigator.clipboard.writeText(coordinates)
//             .then(() => console.log('Координати скопійовані в буфер обміну:', coordinates))
//             .catch(err => console.error('Помилка копіювання в буфер обміну:', err));
//     }
// });

document.querySelectorAll('.Stat').forEach((skill) => {
    skill.addEventListener('change', function (event) {
        var targetElement = event.target;
        if (isNaN(targetElement.value) && targetElement.value !== '') {
            return;
        } else if (targetElement.value === '') {
            clearFiledChild(targetElement, 'Stat');
            return;
        }

        clearFiledChild(targetElement, 'Stat');

        const computedStyle = window.getComputedStyle(targetElement);
        const targetElementStyles = {
            top: computedStyle.top,
            left: computedStyle.left,
            width: computedStyle.width,
            height: computedStyle.height
        };
        addCalcStat('Stat', targetElement, targetElementStyles, 5, 2);
        addCalcStat('Stat', targetElement, targetElementStyles, 2, 1);

        //bonus dmg and build
        if (targetElement.dataset.id === '1' &&
            document.querySelector('.Stat[data-id="5"]').value) {
            fillBonusDmgAndBuild(targetElement.value, document.querySelector('.Stat[data-id="5"]').value);
        } else if (targetElement.dataset.id === '5' &&
            document.querySelector('.Stat[data-id="1"]').value) {
            fillBonusDmgAndBuild(document.querySelector('.Stat[data-id="1"]').value, targetElement.value);
        }

        //hp
        if (targetElement.dataset.id === '2' &&
            document.querySelector('.Stat[data-id="5"]').value) {
            fillHp(targetElement.value, document.querySelector('.Stat[data-id="5"]').value);
        } else if (targetElement.dataset.id === '5' &&
            document.querySelector('.Stat[data-id="2"]').value) {
            fillHp(document.querySelector('.Stat[data-id="2"]').value, targetElement.value);
        }

        //movement
        if (targetElement.dataset.id === '1' &&
            document.querySelector('.Stat[data-id="5"]').value &&
            document.querySelector('.Stat[data-id="3"]').value) {

            fillMovement(targetElement.value, document.querySelector('.Stat[data-id="3"]').value, document.querySelector('.Stat[data-id="5"]').value);

        } else if (targetElement.dataset.id === '5' &&
            document.querySelector('.Stat[data-id="1"]').value &&
            document.querySelector('.Stat[data-id="3"]').value) {
            fillMovement(document.querySelector('.Stat[data-id="1"]').value, document.querySelector('.Stat[data-id="3"]').value, targetElement.value);

        } else if (targetElement.dataset.id === '3' &&
            document.querySelector('.Stat[data-id="1"]').value &&
            document.querySelector('.Stat[data-id="5"]').value) {
            fillMovement(document.querySelector('.Stat[data-id="1"]').value, targetElement.value, document.querySelector('.Stat[data-id="5"]').value);

        }
    });
})



document.querySelectorAll('.skill').forEach((skill) => {
    skill.addEventListener('change', function (event) {
        var targetElement = event.target;
        if (isNaN(targetElement.value) && targetElement.value !== '') {
            return;
        } else if (targetElement.value === '') {
            clearFiledChild(targetElement, 'skill');
            return;
        }

        clearFiledChild(targetElement, 'skill');

        const computedStyle = window.getComputedStyle(targetElement);
        const targetElementStyles = {
            top: computedStyle.top,
            left: computedStyle.left,
            width: computedStyle.width,
            height: computedStyle.height
        };
        addCalcStat('skill', targetElement, targetElementStyles, 5, 2);
        addCalcStat('skill', targetElement, targetElementStyles, 2, 1);
    });
})

document.querySelector('.age').addEventListener('change', function (event) {
    var targetElement = event.target;
    if (isNaN(targetElement.value) && targetElement.value === '') {
        return;
    }

    if (document.querySelector('.Stat[data-id="1"]').value &&
        document.querySelector('.Stat[data-id="5"]').value &&
        document.querySelector('.Stat[data-id="3"]').value) {

        fillMovement(document.querySelector('.Stat[data-id="1"]').value, document.querySelector('.Stat[data-id="3"]').value, document.querySelector('.Stat[data-id="5"]').value);

    }
});

function clearFiledChild(targetElement, type) {
    var elements = document.querySelectorAll('.' + type + '-child[data-id="' + targetElement.dataset.id + '"]')
    elements.forEach(function (el) {
        el.remove();
    });
}

function addCalcStat(type, targetElement, targetElementStyles, div, pos) {
    var leftOffset = type === 'skill' ? 32 : 39;
    var targetElementValue = targetElement.value;
    var newElement = document.createElement('input');
    newElement.dataset.id = targetElement.dataset.id;
    newElement.value = Math.floor(parseInt(targetElementValue, 10) / div);
    newElement.style.top = parseInt(targetElementStyles.top, 10) + 'px';
    newElement.style.left = parseInt(targetElementStyles.left, 10) + leftOffset * pos + 'px';
    newElement.style.width = targetElementStyles.width;
    newElement.style.height = targetElementStyles.height;
    newElement.type = 'text';
    newElement.className = 'input-field ' + type + "-child";
    newElement.disabled = true;
    targetElement.insertAdjacentElement('afterend', newElement);

    if (div === 5 && targetElement.dataset.id === '6') {
        document.querySelector('.magic').value = newElement.value;
    }

    if (div === 2 && targetElement.dataset.id === '6') {
        document.querySelector('.sanity').value = targetElementValue;
    }

    if (div === 5 && targetElement.dataset.id === '6') {
        document.querySelector('.insane').value = +targetElementValue - +newElement.value;
    }

    if (div === 2 && targetElement.dataset.id === '3') {
        document.querySelectorAll('.agila-normal').forEach(function (el) { el.value = targetElementValue / 5 });
        document.querySelectorAll('.agila-super').forEach(function (el) { el.value = newElement.value / 5 });
    } else if (div === 5 && targetElement.dataset.id === '3') {
        document.querySelectorAll('.agila-extrime').forEach(function (el) { el.value = newElement.value / 5 });
    }
}

function fillBonusDmgAndBuild(stat1, stat2) {
    var bonusDamege, build;
    var a = +stat1 + +stat2;
    if (2 <= a && a <= 64) {
        bonusDamege = '-2';
        build = '-2';
    } else if (65 <= a && a <= 84) {
        bonusDamege = '-1';
        build = '-1';
    } else if (85 <= a && a <= 124) {
        bonusDamege = '0';
        build = '0';
    } else if (125 <= a && a <= 164) {
        bonusDamege = '+1к4';
        build = '1';
    } else if (165 <= a && a <= 204) {
        bonusDamege = '+1к6';
        build = '2';
    } else if (205 <= a) {
        var bonus = Math.floor((a - 205) / 80)
        bonusDamege = "+" + (2 + bonus) + 'к6';
        build = (3 + bonus).toString();
    }

    document.querySelector('.build').value = build;
    document.querySelector('.bonus-dmg').value = bonusDamege;
}

function fillHp(stat1, stat2) {
    var hp = Math.floor((+stat1 + +stat2) / 10);
    document.querySelector('.hp').value = hp;
}

function fillMovement(str, dex, siz) {
    var movement = 0;
    if (+str < +siz && +dex < +siz) {
        movement = 7;
    } else if (+str > +siz && +dex > +siz) {
        movement = 9;
    } else {
        movement = 8;
    }

    movement = ageSpeedDebuff(movement);
    document.querySelector('.move').value = movement;
}

function ageSpeedDebuff(movement) {
    var age = document.querySelector('.age').value
    if (age && !isNaN(age)) {
        age = +age;
        if (40 <= age && age <= 49) {
            movement -= 1;
        } else if (50 <= age && age <= 59) {
            movement -= 2;
        } else if (60 <= age && age <= 69) {
            movement -= 3;
        } else if (70 <= age && age <= 79) {
            movement -= 4;
        } else if (80 <= age) {
            movement -= 5;
        }
    }
    return movement;
}