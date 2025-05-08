const toggle = document.getElementById('toggle');
const pricingCards = document.querySelectorAll('.pricing-card');
const currencySelect = document.getElementById('currency');
const unitSelect = document.getElementById('unit');

// Mock exchange rates
const exchangeRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.80
};

// Storage unit conversion factors (relative to GB)
const unitFactors = {
    MB: 1000,    // 1 GB = 1000 MB
    GB: 1,       // Base unit
    TB: 0.001    // 1 TB = 1000 GB
};

// Smooth number transition
function animatePrice(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = start + (end - start) * progress;
        element.textContent = value.toFixed(2);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Update prices with animation
function updatePrices(isYearly) {
    const currency = currencySelect.value;
    const discount = isYearly ? 0.8 : 1; // 20% discount for yearly

    pricingCards.forEach((card) => {
        const priceElement = card.querySelector('.price');
        const basePrice = parseFloat(card.querySelector('.price').dataset.basePrice);
        const convertedPrice = basePrice * exchangeRates[currency] * discount;
        const currentPrice = parseFloat(priceElement.textContent.match(/[0-9.]+/)[0]);

        animatePrice(priceElement.firstChild, currentPrice, convertedPrice, 500);
        
        const period = isYearly ? '/year' : '/month';
        priceElement.innerHTML = `${currency} ${convertedPrice.toFixed(2)}<span>${period}</span>`;
    });
}

// Update storage units
function updateStorageUnits() {
    const unit = unitSelect.value;
    pricingCards.forEach((card) => {
        const storageElement = card.querySelector('.storage');
        const baseStorageGB = parseFloat(card.dataset.baseStorage); // Base storage in GB
        let convertedStorage;

        // Convert from GB to target unit
        if (unit === 'MB') {
            convertedStorage = baseStorageGB * unitFactors.MB;
        } else if (unit === 'TB') {
            convertedStorage = baseStorageGB * unitFactors.TB;
        } else {
            convertedStorage = baseStorageGB;
        }

        // Format number based on unit
        const formattedStorage = unit === 'MB' ? Math.round(convertedStorage) : convertedStorage.toFixed(2).replace(/\.00$/, '');
        storageElement.textContent = formattedStorage;
        storageElement.parentElement.textContent = `${formattedStorage} ${unit} Storage`;
    });
}

// Initialize base storage
pricingCards.forEach((card) => {
    const storageElement = card.querySelector('.storage');
    card.dataset.baseStorage = storageElement.textContent;
});

// Event listeners
toggle.addEventListener('change', () => {
    updatePrices(toggle.checked);
    pricingCards.forEach((card) => {
        card.classList.add('price-updated');
        setTimeout(() => card.classList.remove('price-updated'), 500);
    });
});

currencySelect.addEventListener('change', () => {
    updatePrices(toggle.checked);
});

unitSelect.addEventListener('change', () => {
    updateStorageUnits();
});

// Initial animation
pricingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Button click animation
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            alert('Sign up clicked!'); // Replace with actual signup logic
        }, 200);
    });
});
