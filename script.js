    // Custom cursor functionality - only run on desktop
    document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 991) {
        const cursor = document.querySelector('.custom-cursor');
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .clickable, .theme-toggle, .nav-link');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('cursor-hover');
            });
        });
        
        // Handle cursor visibility when leaving/entering window
        document.addEventListener('mouseout', function() {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'flex';
        });
    }
});

        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const icon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', function() {
            themeToggle.classList.add('active');
            
            if(icon.classList.contains('fa-moon')) {
                // Switch to light theme
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                document.body.classList.add('light-theme');
            } else {
                // Switch to dark theme
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                document.body.classList.remove('light-theme');
            }
            
            // Remove active class after animation completes
            setTimeout(() => {
                themeToggle.classList.remove('active');
            }, 2000);
        });

        // Typing animation functionality - responsive text lengths for mobile
        const typingText = document.getElementById('typing-text');
        const textArray = ["Trainee Network Administrator", "Cybersecurity Enthusiast", "Tech Explorer"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let erasingDelay = 50;
        let newTextDelay = 2000;

        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingDelay = newTextDelay;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }
            
            setTimeout(type, typingDelay);
        }

        // Start the typing animation
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(type, 1000);
        });

        // Smooth scrolling and active section management
        document.addEventListener('DOMContentLoaded', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Set home as active by default
            setActiveLink('#home');
            
            // Click handler for nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    // Only scroll if there's a valid target section
                    if (targetId && targetId !== '#') {
                        const targetSection = document.querySelector(targetId);
                        
                        if (targetSection) {
                            // Close mobile navbar if open
                            const navbarCollapse = document.querySelector('.navbar-collapse');
                            if (navbarCollapse.classList.contains('show')) {
                                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                                bsCollapse.hide();
                            }
                            
                            // Calculate proper offset based on screen size
                            const offset = window.innerWidth < 992 ? 60 : 80;
                            
                            window.scrollTo({
                                top: targetSection.offsetTop - offset,
                                behavior: 'smooth'
                            });
                            
                            // Update URL without refreshing
                            history.pushState(null, null, targetId);
                            
                            // Update active link
                            setActiveLink(targetId);
                        }
                    }
                });
            });
    
            // Scroll handler for active section detection
            window.addEventListener('scroll', function() {
                let current = '';
                const scrollOffset = window.innerWidth < 992 ? 120 : 150;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= (sectionTop - scrollOffset)) {
                        current = section.getAttribute('id');
                    }
                });
                
                if (current) {
                    setActiveLink(`#${current}`);
                }
            });
            
            // Helper function to set active link
            function setActiveLink(targetId) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const underline = link.querySelector('.nav-underline');
                    if (underline) underline.remove();
                    
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                        
                        // Create and append underline
                        const underline = document.createElement('span');
                        underline.className = 'nav-underline';
                        link.appendChild(underline);
                        
                        // Trigger reflow to restart animation
                        void underline.offsetWidth;
                    }
                });
            }
            
            // Handle browser back/forward buttons
            window.addEventListener('popstate', function() {
                const hash = window.location.hash;
                if (hash) {
                    const section = document.querySelector(hash);
                    if (section) {
                        const offset = window.innerWidth < 992 ? 60 : 80;
                        
                        window.scrollTo({
                            top: section.offsetTop - offset,
                            behavior: 'smooth'
                        });
                        setActiveLink(hash);
                    }
                }
            });
        });

        // Navbar animation on scroll with responsive adjustments
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.padding = window.innerWidth < 768 ? '0.3rem 0' : '0.5rem 0';
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = window.innerWidth < 768 ? '0.7rem 0' : '1rem 0';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });

        // Add resize event listener to handle responsive changes
        window.addEventListener('resize', function() {
            // Show/hide custom cursor based on screen width
            const cursor = document.querySelector('.custom-cursor');
            if (window.innerWidth <= 991) {
                cursor.style.display = 'none';
            } else {
                cursor.style.display = 'flex';
            }
            
            // Adjust navbar padding based on screen width
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.padding = window.innerWidth < 768 ? '0.3rem 0' : '0.5rem 0';
            } else {
                navbar.style.padding = window.innerWidth < 768 ? '0.7rem 0' : '1rem 0';
            }
        });

        // Replace your existing certification slideshow script with this:

        document.addEventListener('DOMContentLoaded', function() {
            const certContainer = document.querySelector('.certifications-container');
            const certItems = document.querySelectorAll('.certifications-container .col-md-6');
            let currentIndex = 0;
            let slideInterval;
            
            // Hide all cards initially except first 3
            function initCertSlider() {
                certItems.forEach((item, index) => {
                    if (index < 3) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Add dot navigation if we have more than 3 certifications
                if (certItems.length > 3) {
                    addDotNavigation();
                    startAutoSlide();
                }
            }
            
            // Add dot navigation to the container
            function addDotNavigation() {
                const dotsNav = document.createElement('div');
                dotsNav.className = 'cert-dots-nav text-center mt-4';
                
                // Create a dot for each certification
                for (let i = 0; i < certItems.length; i++) {
                    const dot = document.createElement('span');
                    dot.className = 'cert-dot';
                    dot.dataset.index = i;
                    
                    // Style the dots
                    dot.style.display = 'inline-block';
                    dot.style.width = '12px';
                    dot.style.height = '12px';
                    dot.style.backgroundColor = i < 3 ? 'var(--primary-color)' : 'rgba(59, 130, 246, 0.3)';
                    dot.style.borderRadius = '50%';
                    dot.style.margin = '0 5px';
                    dot.style.cursor = 'pointer';
                    dot.style.transition = 'all 0.3s ease';
                    
                    dot.addEventListener('click', function() {
                        goToCert(parseInt(this.dataset.index));
                        resetAutoSlide();
                    });
                    
                    dotsNav.appendChild(dot);
                }
                
                certContainer.parentNode.insertBefore(dotsNav, certContainer.nextSibling);
            }
            
            // Start automatic slideshow
            function startAutoSlide() {
                slideInterval = setInterval(nextCert, 3000); // Change certification every 3 seconds
            }
            
            // Reset timer when manually changing slides
            function resetAutoSlide() {
                clearInterval(slideInterval);
                startAutoSlide();
            }
            
            // Go to specific certification
            function goToCert(certIndex) {
                // Calculate which 3 certifications to show (current, next, next+1)
                const indicesToShow = [
                    certIndex,
                    (certIndex + 1) % certItems.length,
                    (certIndex + 2) % certItems.length
                ];
                
                // Hide all items
                certItems.forEach(item => {
                    item.style.display = 'none';
                });
                
                // Show the selected 3 certifications
                indicesToShow.forEach(index => {
                    certItems[index].style.display = 'block';
                });
                
                // Update dots
                document.querySelectorAll('.cert-dot').forEach((dot, index) => {
                    dot.style.backgroundColor = indicesToShow.includes(index) 
                        ? 'var(--primary-color)' 
                        : 'rgba(59, 130, 246, 0.3)';
                });
                
                currentIndex = certIndex;
            }
            
            // Show next certification (rotating one by one)
            function nextCert() {
                const nextIndex = (currentIndex + 1) % certItems.length;
                goToCert(nextIndex);
            }
            
            // Initialize the slider
            initCertSlider();
        });

        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Contact Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    // For now, we'll just log it and show a success message
    console.log({name, email, subject, message});
    
    // Create a sweet alert or similar notification
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success mt-3';
    successAlert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Thank you for your message! I'll get back to you soon.
    `;
    
    this.parentNode.insertBefore(successAlert, this.nextSibling);
    this.reset();
    
    setTimeout(() => {
        successAlert.remove();
    }, 5000);
});