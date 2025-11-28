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

    // --- LÓGICA PARA ANIMAÇÃO DE FUNDO COM PARTICLES.JS ---
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

    // --- LÓGICA PARA CONTROLE DA JANELA MODAL ---
    const contactModal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const openModalNavBtns = document.querySelectorAll('.open-modal-nav'); // NOVO: Seleciona o botão da navbar
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    // Função para abrir o modal
    function openModal() {
        if (contactModal) {
            contactModal.classList.remove('modal-hidden');
            document.body.style.overflow = 'hidden'; // Impede a rolagem do fundo
        }
    }

    // Função para fechar o modal
    function closeModal() {
        if (contactModal) {
            contactModal.classList.add('modal-hidden');
            document.body.style.overflow = ''; // Restaura a rolagem do fundo
        }
    }

    // Listener para o botão principal da seção CTA
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    
    // NOVO: Listener para o botão da barra de navegação
    openModalNavBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o salto da âncora #
            openModal();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Fechar a modal ao clicar fora dela
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }


    // --- LÓGICA PARA VALIDAÇÃO DO FORMULÁRIO DE CONTATO DENTRO DA MODAL ---
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            let formIsValid = true;

            // Remove todas as mensagens de erro anteriores
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('input-error'));

            // Campos a validar (seleciona todos os inputs e textareas dentro do form-group)
            const fields = contactForm.querySelectorAll('.form-group input, .form-group textarea');

            fields.forEach(field => {
                const value = field.value.trim();
                const fieldName = field.id || field.name;

                // 1. Validação de Campo Vazio
                if (value === '' && field.required) {
                    displayError(field, `O campo ${fieldName.replace('_modal', '').charAt(0).toUpperCase() + fieldName.replace('_modal', '').slice(1)} é obrigatório.`);
                    formIsValid = false;
                    return; 
                }

                // 2. Validação de Formato de Email
                if (field.type === 'email' && value !== '') {
                    // Regex para validação de email básica
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
                    if (!emailRegex.test(value)) {
                        displayError(field, 'Por favor, insira um endereço de e-mail válido.');
                        formIsValid = false;
                    }
                }
            });

            // Se o formulário for válido, simula o envio e fecha o modal
            if (formIsValid) {
                console.log('Formulário Enviado com Sucesso! (Simulação)');
                alert('A sua mensagem foi enviada! Em breve entraremos em contacto.');
                contactForm.reset(); // Limpa o formulário
                closeModal(); // Fecha a janela modal
            }
        });
    }

    /**
     * Função auxiliar para mostrar a mensagem de erro.
     * @param {HTMLElement} field - O elemento do campo (input/textarea) com erro.
     * @param {string} message - A mensagem de erro a ser exibida.
     */
    function displayError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        field.classList.add('input-error');
        // Insere a mensagem de erro logo após o campo
        field.parentElement.appendChild(errorElement);
    }
});