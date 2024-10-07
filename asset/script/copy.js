// Находим элементы
const phoneElement = document.getElementById('phone-number');
const copyButton = document.getElementById('copy-button');
const copyAlert = document.getElementById('copy-alert');

// Функция для копирования текста по клику на кнопку
copyButton.addEventListener('click', () => {
    // Копируем текст
    const phoneText = phoneElement.textContent;
    navigator.clipboard.writeText(phoneText).then(() => {
        // Показать плашку
        copyAlert.classList.add('show');
        
        // Скрыть плашку через 2 секунды
        setTimeout(() => {
            copyAlert.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.log('Помилка при копіюванні: ', err);
    });
});
