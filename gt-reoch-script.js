/**
 * G.T. Reoch Author Page JavaScript
 * Professional functionality and interactions
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeVideoHandling();
    initializeStatsAnimation();
    initializeTooltips();
});

// Navigation Functionality
function initializeNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        // Always keep header black with gold text
        header.style.background = '#000';
        header.style.backdropFilter = 'none';
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Skip any elements within published-novels section
            if (entry.target.closest('.published-novels')) {
                return;
            }
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation - explicitly excluding published-novels section
    const animatedElements = document.querySelectorAll('.work-card, .about-text, .stat');
    animatedElements.forEach(el => {
        // Skip if element is within published-novels section
        if (el.closest('.published-novels')) {
            return;
        }
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Remove any scroll event listeners that might affect published-novels section
window.addEventListener('load', function() {
    const publishedSection = document.querySelector('.published-novels');
    if (publishedSection) {
        publishedSection.style.transform = 'none';
        publishedSection.style.willChange = 'auto';
        publishedSection.style.position = 'static';
        
        // Remove any existing scroll event listeners
        const scrollEvents = ['scroll', 'wheel', 'touchmove'];
        scrollEvents.forEach(eventType => {
            publishedSection.addEventListener(eventType, function(e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }, { passive: false });
        });
    }
});

// Video Handling
function initializeVideoHandling() {
    const video = document.querySelector('#book-trailer');
    const videoContainer = document.querySelector('.video-container');
    
    if (video) {
        // Ensure video loads properly
        video.load();
        
        // Add comprehensive event listeners for video functionality
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });
        
        video.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded - Duration:', this.duration);
        });
        
        video.addEventListener('loadeddata', function() {
            console.log('Video data loaded');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can start playing');
        });
        
        video.addEventListener('canplaythrough', function() {
            console.log('Video can play through without stopping');
        });
        
        // Play/pause functionality
        video.addEventListener('click', function(e) {
            // Only toggle play/pause if not clicking on controls
            if (e.target === this) {
                if (this.paused) {
                    this.play().catch(err => {
                        console.log('Play failed:', err);
                        showNotification('Unable to play video. Please check your browser settings.', 'error');
                    });
                } else {
                    this.pause();
                }
            }
        });
        
        // Volume and mute controls
        video.addEventListener('volumechange', function() {
            console.log('Volume changed:', this.volume, 'Muted:', this.muted);
        });
        
        // Playback events
        video.addEventListener('play', function() {
            console.log('Video started playing');
            // Hide overlay when playing
            const overlay = videoContainer.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        video.addEventListener('pause', function() {
            console.log('Video paused');
            // Show overlay when paused
            const overlay = videoContainer.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        video.addEventListener('ended', function() {
            console.log('Video ended');
            // Show overlay when ended
            const overlay = videoContainer.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Progress tracking
        video.addEventListener('timeupdate', function() {
            const progress = (this.currentTime / this.duration) * 100;
            // Could add progress bar functionality here if needed
        });
        
        // Handle video errors with detailed logging
        video.addEventListener('error', function(e) {
            console.error('Video error:', e);
            const error = this.error;
            let errorMessage = 'Unknown video error';
            
            if (error) {
                switch (error.code) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        errorMessage = 'Video playback was aborted';
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        errorMessage = 'Network error occurred while loading video';
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        errorMessage = 'Video decoding error';
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorMessage = 'Video format not supported';
                        break;
                }
            }
            
            console.error('Video error details:', errorMessage);
            
            const container = this.parentElement;
            container.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                    background: var(--background-light);
                    color: var(--text-light);
                    text-align: center;
                    border-radius: var(--border-radius);
                    padding: 2rem;
                ">
                    <div>
                        <h3>Video Unavailable</h3>
                        <p>The book trailer could not be loaded.</p>
                        <p style="font-size: 0.9rem; color: var(--text-muted);">${errorMessage}</p>
                        <a href="assets/scripted-in-al-qaeda-ink.mp4" 
                           style="color: var(--accent-color); text-decoration: underline;"
                           download>Download Video</a>
                    </div>
                </div>
            `;
        });
        
        // Keyboard controls for accessibility
        video.addEventListener('keydown', function(e) {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    if (this.paused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.currentTime = Math.max(0, this.currentTime - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.currentTime = Math.min(this.duration, this.currentTime + 10);
                    break;
                case 'KeyM':
                    e.preventDefault();
                    this.muted = !this.muted;
                    break;
            }
        });
        
        // Mobile-specific handling
        if ('ontouchstart' in window) {
            video.addEventListener('touchstart', function(e) {
                // Prevent default to avoid conflicts
                e.preventDefault();
            });
        }
        
        // Test video can be played
        video.addEventListener('loadedmetadata', function() {
            // Test if video can play
            const playPromise = this.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Auto-pause after testing
                    this.pause();
                    this.currentTime = 0;
                    console.log('Video playback test successful');
                }).catch(err => {
                    console.log('Video playback test failed:', err);
                });
            }
        });
    }
}

// Stats Animation
function initializeStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
        
        animated = true;
    }
    
    // Animate when stats section comes into view
    const statsSection = document.querySelector('.author-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Tooltips
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--primary-color);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }
}

// Add CSS for animations
const animationCSS = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-menu a.active {
        color: var(--accent-color) !important;
        font-weight: 600;
    }
    
    .work-card:hover .work-image img {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
    
    .author-photo:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for external use
window.GTReochSite = {
    showNotification,
    showTooltip,
    hideTooltip
};

// Console message for developers
console.log('🎭 G.T. Reoch Author Page loaded successfully!');
console.log('📚 Professional website showcasing literary works');
console.log('✨ Built with modern web technologies'); 