// Native links, disclosures and media controls work without JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (menu && toggle) {
        document.documentElement.classList.add('navigation-ready');
        const setMenuOpen = (open) => {
            menu.classList.toggle('active', open);
            toggle.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        };
        toggle.addEventListener('click', () => {
            setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });
        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) setMenuOpen(false);
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
                toggle.focus();
            }
        });
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target)) setMenuOpen(false);
        });
        window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
            if (event.matches) setMenuOpen(false);
        });
    }

    const podcast = document.getElementById('podcast-audio');
    const playButton = document.getElementById('play-podcast-btn');
    const status = document.getElementById('podcast-status');
    if (podcast && playButton) {
        playButton.hidden = false;
        const updatePlayback = () => {
            const playing = !podcast.paused && !podcast.ended;
            playButton.textContent = playing ? 'Pause discussion' : 'Play discussion';
            playButton.setAttribute('aria-pressed', String(playing));
        };
        for (const event of ['play', 'pause', 'ended']) podcast.addEventListener(event, updatePlayback);
        playButton.addEventListener('click', async () => {
            if (status) status.textContent = '';
            if (!podcast.paused) {
                podcast.pause();
                return;
            }
            try {
                await podcast.play();
            } catch {
                if (status) status.textContent = 'Playback could not start. Try the audio controls or download the discussion below.';
                updatePlayback();
            }
        });
        updatePlayback();
    }
});
