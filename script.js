document.addEventListener('DOMContentLoaded', function() {
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('.calc-button');
    let screenValue = '0';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText === 'C') {
                screenValue = '0';
            } else if (buttonText === '←') {
                screenValue = screenValue.length > 1 ? screenValue.slice(0, -1) : '0';
            } else if (buttonText === '=') {
                try {
                    screenValue = calculate(screenValue);
                } catch (e) {
                    screenValue = 'Error';
                }
            } else {
                if (screenValue === '0' || screenValue === 'Error') {
                    screenValue = buttonText;
                } else {
                    screenValue += buttonText;
                }
            }
            screen.textContent = screenValue;
        });
    });

    function calculate(expression) {
        // Reemplazo de operadores especiales por sus equivalentes válidos en JS
        expression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-') // reemplaza &minus; por -
            .replace(/–/g, '-'); // por si acaso, también guion en largo (en dashes)

        return new Function('return ' + expression)();
    }
});
