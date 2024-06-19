function printDivContent(className) {
    var divToPrint = document.querySelector('.' + className);
    var newWin = window.open('', 'Print-Window');

    newWin.document.open();
    newWin.document.write('<html><head><title>Print</title></head><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();

    setTimeout(function () {
        newWin.close();
    }, 10);
}

function printDocument() {
    var printContents = document.querySelector('.document-container').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore original content
}


//опрацювання зображення
document.getElementById('imageContainer').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
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
            inputField.addEventListener('keyup', function(event) {
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