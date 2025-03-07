
document.addEventListener('DOMContentLoaded', function() {
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.getElementById('progressText');
    const progressContainer = document.querySelector('.progress-container');
    const valueInput = document.getElementById('valueInput');
    const animateCheckbox = document.getElementById('animateCheckbox');
    const hideCheckbox = document.getElementById('hideCheckbox');

    const circumference = 565.48; // 2 * π * r (r = 90)


    function updateProgress(value) {
        const offset = circumference - (value / 100) * circumference;
        progressBarFill.style.strokeDashoffset = offset;
        progressText.textContent = `${value}%`;
    }
    
    valueInput.addEventListener('input', function() {
        const value = Math.min(100, Math.max(0, parseInt(valueInput.value, 10)));
        const offset = circumference - (value / 100) * circumference;
        progressBarFill.style.strokeDashoffset = offset;
        progressText.textContent = `${value}%`;
    });


    animateCheckbox.addEventListener('change', function() {
        if (animateCheckbox.checked) {
            // Сбрасываем прогресс-бар на 0
            progressBarFill.style.strokeDashoffset = circumference;
           
    
            // Получаем текущее значение Value
            const value = parseInt(valueInput.value, 10);
    
            // Создаем анимацию заполнения
            const keyframes = `
                @keyframes fillAnimation {
                    from {
                        stroke-dashoffset: ${circumference};
                    }
                    to {
                        stroke-dashoffset: ${circumference - (value / 100) * circumference};
                    }
                }
            `;
    
            // Добавляем анимацию в стили
            const styleSheet = document.createElement('style');
            styleSheet.id = 'dynamicAnimation';
            styleSheet.innerHTML = keyframes;
            document.head.appendChild(styleSheet);
    
            // Применяем анимацию к прогресс-бару
            progressBarFill.style.animation = 'fillAnimation 1s linear forwards';
        } else {
            // Удаляем анимацию
            progressBarFill.style.animation = '';
            const dynamicAnimation = document.getElementById('dynamicAnimation');
            if (dynamicAnimation) {
                dynamicAnimation.remove();
            }
        }
    });

    hideCheckbox.addEventListener('change', function() {
        if (hideCheckbox.checked) {
            progressBarFill.classList.add('hidden');
        } else {
            progressBarFill.classList.remove('hidden');
        }
    });
});