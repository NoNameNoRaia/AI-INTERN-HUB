// Generate subtle falling petals for the "Japanese" feel
document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;
    
    const petalCount = 18;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize properties
        const size = Math.random() * 12 + 6; // 6px to 18px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 6 + 6; // 6s to 12s
        const delay = Math.random() * 5; // 0s to 5s
        const rotation = Math.random() * 360;
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}%`;
        petal.style.transform = `rotate(${rotation}deg)`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        petalsContainer.appendChild(petal);
    }
});
