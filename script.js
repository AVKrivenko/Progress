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

    function resetAnimation() {
        // Удаляем текущую анимацию
        progressBarFill.style.animation = '';
        const dynamicAnimation = document.getElementById('dynamicAnimation');
        if (dynamicAnimation) {
            dynamicAnimation.remove();
        }
    }

    valueInput.addEventListener('input', function() {
        let value = parseInt(valueInput.value, 10);

        // Корректируем значение, если оно выходит за пределы 0-100
        if (isNaN(value)) {
            value = 0; // Если введено не число, устанавливаем 0
        } else if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }

        valueInput.value = value; // Обновляем значение в поле ввода
        updateProgress(value); // Обновляем прогресс-бар

        // Сбрасываем анимацию, если она активна
        if (animateCheckbox.checked) {
            resetAnimation();

            // Применяем новую анимацию
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
            const styleSheet = document.createElement('style');
            styleSheet.id = 'dynamicAnimation';
            styleSheet.innerHTML = keyframes;
            document.head.appendChild(styleSheet);
            progressBarFill.style.animation = 'fillAnimation 1s linear forwards';
        }
    });

    animateCheckbox.addEventListener('change', function() {
        if (animateCheckbox.checked) {
            const value = parseInt(valueInput.value, 10);
            resetAnimation();

            // Применяем анимацию
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
            const styleSheet = document.createElement('style');
            styleSheet.id = 'dynamicAnimation';
            styleSheet.innerHTML = keyframes;
            document.head.appendChild(styleSheet);
            progressBarFill.style.animation = 'fillAnimation 1s linear forwards';
        } else {
            resetAnimation();
        }
    });

    hideCheckbox.addEventListener('change', function() {
        if (hideCheckbox.checked) {
            progressContainer.classList.add('hidden');
        } else {
            progressContainer.classList.remove('hidden');
        }
    });
});