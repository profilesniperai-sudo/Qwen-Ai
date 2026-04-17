// Menu mobile burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animation du burger
    burger.classList.toggle('toggle');
});

// Fermer le menu mobile quand on clique sur un lien
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Changement de style de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Gestion du formulaire de réservation
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData.entries());
    
    // Validation de la date (doit être future)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Veuillez sélectionner une date future.');
        return;
    }
    
    // Simulation d'envoi de réservation
    console.log('Réservation soumise:', data);
    
    // Message de confirmation
    alert(`Merci ${data.name} ! Votre demande de réservation pour ${data.guests} personne(s) le ${data.date} à ${data.time} a été reçue. Nous vous confirmerons par email sous 24h.`);
    
    // Reset du formulaire
    reservationForm.reset();
});

// Définir la date minimum pour la réservation (aujourd'hui)
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Animation au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.querySelectorAll('.menu-category, .about-text, .contact-item, .reservation-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Compensation pour la navbar fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Effet de parallaxe sur la section hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que la page est prête
    console.log('Site Le Gourmet Français chargé avec succès!');
    
    // Ajouter une classe active au premier élément de navigation
    const firstNavLink = document.querySelector('.nav-links li:first-child a');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
});

// Gestion de l'affichage dynamique des heures disponibles
const timeSelect = document.getElementById('time');
const dateInputEl = document.getElementById('date');

dateInputEl.addEventListener('change', () => {
    const selectedDate = new Date(dateInputEl.value);
    const dayOfWeek = selectedDate.getDay();
    
    // Vérifier si c'est lundi (fermé)
    if (dayOfWeek === 1) {
        alert('Le restaurant est fermé le lundi. Veuillez choisir un autre jour.');
        dateInputEl.value = '';
        timeSelect.value = '';
        return;
    }
    
    // Mettre à jour les heures disponibles selon le jour
    timeSelect.innerHTML = '<option value="">Sélectionner</option>';
    
    const hours = [
        '12:00', '12:30', '13:00', '13:30',
        '19:00', '19:30', '20:00', '20:30', '21:00'
    ];
    
    hours.forEach(hour => {
        const option = document.createElement('option');
        option.value = hour;
        option.textContent = hour;
        timeSelect.appendChild(option);
    });
});
