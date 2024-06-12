const toggle = document.getElementById('toggle');
const pricingCards = document.querySelectorAll('.pricing-card');
const currencySelect = document.getElementById('currency');
const unitSelect = document.getElementById('unit');

toggle.addEventListener('change', () => {
    pricingCards.forEach((card) => {
        const price = card.querySelector('p');
        if (toggle.checked) {
            price.textContent = price.textContent.replace('/month', '/year');
        } else {
            price.textContent = price.textContent.replace('/year', '/month');
        }
    });
});

currencySelect.addEventListener('change', () => {
    pricingCards.forEach((card) => {
        const price = card.querySelector('p');
        const currency = currencySelect.value;
        price.textContent = price.textContent.replace(/[A-Z]{3}/, currency);
    });
});

unitSelect.addEventListener('change', () => {
    pricingCards.forEach((card) => {
        const storage = card.querySelector('ul li:nth-child(2)');
        const unit = unitSelect.value;
        storage.textContent = storage.textContent.replace(/[A-Z]{2}/, unit);
    });
});