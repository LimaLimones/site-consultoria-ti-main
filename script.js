document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA O CABEÇALHO ADAPTATIVO ("CAMALEÃO") ---
    const header = document.querySelector('.navbar');
    const triggerSection = document.getElementById('solucoes');

    if (header && triggerSection) {
        const observerOptions = {
            root: null,
            rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
            threshold: 0
        };
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.classList.add('header-inverted');
                } else {
                    document.body.classList.remove('header-inverted');
                }
            });
        }, observerOptions);
        headerObserver.observe(triggerSection);
    }

    // --- LÓGICA PARA O ACORDEÃO (ACCORDION) DO FAQ ---
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        faqContainer.addEventListener('click', function(e) {
            const questionButton = e.target.closest('.faq-question');
            if (!questionButton) return;
            const faqItem = questionButton.parentElement;
            faqItem.classList.toggle('active');
        });
    }
    
    // --- LÓGICA PARA ANIMAÇÃO DE ENTRADA DOS CARDS ---
    const animatedCards = document.querySelectorAll('.pilar-card');
    const cardObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 200;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedCards.forEach(card => {
        cardObserver.observe(card);
    });

    // --- NOVA LÓGICA PARA ANIMAÇÃO DE FUNDO COM PARTICLES.JS ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#6936f5" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#9dde05", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }
});