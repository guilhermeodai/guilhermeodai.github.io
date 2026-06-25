(function () {
    const track = document.querySelector('.hero-carousel');
    if (!track) return;

    const originals = Array.from(track.children);
    
    // Clona até ter largura suficiente pra cobrir pelo menos 2x o viewport
    function fillTrack() {
        const minWidth = window.innerWidth * 3;
        while (track.scrollWidth < minWidth) {
            originals.forEach(img => track.appendChild(img.cloneNode(true)));
        }
    }

    const speed = 1;
    let x = 0;
    let halfWidth = 0;

    function getHalfWidth() {
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return originals.reduce((acc, img) => acc + img.offsetWidth + gap, 0);
    }

    function tick() {
        x -= speed;
        if (Math.abs(x) >= halfWidth) {
            x = 0;
        }
        track.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(tick);
    }

    window.addEventListener('load', () => {
        fillTrack();
        halfWidth = getHalfWidth();
        requestAnimationFrame(tick);
    });
})();