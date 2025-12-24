document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Course Modal Dynamic Content
    const courseModal = document.getElementById('courseModal');
    if (courseModal) {
        courseModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget;

            // Extract info from data-* attributes
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            const iconClass = button.getAttribute('data-icon');
            const colorClass = button.getAttribute('data-color');

            // Update the modal's content.
            const modalTitle = courseModal.querySelector('.modal-title');
            const modalDescription = courseModal.querySelector('#courseModalDescription');
            const modalIcon = courseModal.querySelector('#courseModalIcon');

            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Reset icon classes and add new ones
            modalIcon.className = '';
            modalIcon.className = `${iconClass} fa-3x ${colorClass}`;

            // Update title color
            modalTitle.className = 'modal-title fw-bold ' + colorClass;
        });
    }

    // Optional: Trigger modal automatically on load if needed (currently not requested, but good for testing)
    // const applyModal = new bootstrap.Modal(document.getElementById('applyModal'));
    // setTimeout(() => {
    //     applyModal.show();
    // }, 3000);
});
