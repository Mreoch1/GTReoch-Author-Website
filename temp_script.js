    <script>
        // Mobile menu toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.addEventListener('click', function() {
                    mobileMenuToggle.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });
                
                // Close menu when clicking on a link
                const navLinks = navMenu.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenuToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    });
                });
            }
            
            // Podcast play button functionality
            const playButton = document.getElementById('play-podcast-btn');
            const audio = document.getElementById('podcast-audio');
            
            if (playButton && audio) {
                playButton.addEventListener('click', function() {
                    if (audio.paused) {
                        audio.play();
                        playButton.classList.add('playing');
                        playButton.innerHTML = '<span style="font-size: 1.2rem; margin-right: 8px;">⏸</span>Pause Podcast';
                    } else {
                        audio.pause();
                        playButton.classList.remove('playing');
                        playButton.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                            </svg>
                            Play Podcast
                        `;
                    }
                });
                
                // Update button when audio ends
                audio.addEventListener('ended', function() {
                    playButton.classList.remove('playing');
                    playButton.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                        </svg>
                        Play Podcast
                    `;
                });
            }
        });
