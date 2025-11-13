# G.T. Reoch - Professional Author Website

A clean, professional author website designed to showcase G.T. Reoch's literary works, upcoming publications, and connect with readers worldwide.

**Live Site:** https://gtreoch.com

## 🌟 Features

### Core Sections
- **Hero Section** with video trailer placement
- **Published Works** showcasing available novels with detailed synopses
- **Audio Sample** featuring Chapter 2: Seeds of Darkness audio narration
- **Reader Reviews** displaying beta reader feedback
- **Behind the Scenes** with author interviews and exclusive content
- **Upcoming Works** showcasing latest releases
- **About the Author** with professional biography and statistics

### Professional Design
- Clean, modern typography using Cinzel, Inter, and Cormorant Garamond
- Responsive design that works on all devices
- Professional color palette (Jungle Black Gold Green theme)
- Smooth animations and scroll effects
- Interactive elements and form handling

### Technical Features
- Fully responsive CSS Grid and Flexbox layout
- Modern JavaScript with ES6+ features
- Smooth scrolling navigation
- Video integration with error handling
- Audio player for chapter samples
- Animated statistics counters
- Cookie consent banner
- SEO-friendly semantic HTML structure
- Security headers and optimized caching

## 📁 File Structure

```
GTReoch-Author-Website/
├── index.html                    # Main HTML page
├── behind-the-scenes.html        # Author interview page
├── privacy-policy.html          # Privacy policy
├── terms-conditions.html         # Terms and conditions
├── cookie-policy.html            # Cookie policy
├── gt-reoch-styles.css           # Complete CSS styling
├── gt-reoch-script.js            # Interactive JavaScript
├── netlify.toml                  # Netlify configuration
├── _redirects                    # URL redirects
├── robots.txt                    # SEO robots file
├── sitemap.xml                   # SEO sitemap
├── README-GT-Reoch.md            # This documentation
└── assets/
    ├── Scripted-in-Al-Qaeda-Ink.mp4              # Book trailer video
    ├── Albatross.mp4                             # Albatross book trailer
    ├── Scripted in Al Qaeda Ink Final Cover Art 4_16.jpg  # Book cover
    ├── By G.T. Reoch.jpg                         # Albatross book cover
    ├── Seeds of Darkness Ch2.m4a                # Chapter 2 audio sample
    ├── image.png                                 # Author photo
    └── google3ff6106d5253549e.html              # Google verification
```

## 🚀 Current Content

### Published Works
- **Scripted in Al Qaeda Ink** - Political thriller, available on Kindle
- **Albatross: A Paul Banter Story** - Thriller, available on Kindle

### Audio Content
- **Chapter 2: Seeds of Darkness** - Audio sample from "Scripted in Al Qaeda Ink"
- Audio file: `assets/Seeds of Darkness Ch2.m4a`

### Video Content
- Book trailers for both published novels
- Videos are optimized for web playback

### Content Customization

#### Author Biography
Edit the "About the Author" section in `index.html`:
- Update the biography text in the About section
- Modify author statistics (published works, upcoming works, debut year)
- Adjust the description to match actual experience

#### Published Works
Customize the published books section:
- Update book synopses and descriptions
- Modify Amazon links as needed
- Replace book cover images in the assets folder

#### Audio Samples
To add or update audio samples:
1. Place M4A or MP3 files in the `assets/` folder
2. Update the audio source in the Audio Sample section
3. Modify chapter titles and descriptions as needed

## 🎨 Customization

### Color Scheme
The site uses a Jungle Black Gold Green color palette with CSS custom properties:

```css
:root {
    --primary-color: #1a2f1a;          /* Deep Forest Green */
    --secondary-color: #0d1a0d;        /* Almost Black Green */
    --accent-color: #d4af37;           /* Rich Gold */
    --text-color: #1a1a1a;             /* Near Black */
    --background-light: #f4f6f4;       /* Very Light Green-Tinted */
    --background-white: #ffffff;       /* Pure White */
}
```

### Typography
- **Headers**: Cinzel (elegant serif)
- **Body Text**: Inter (modern sans-serif)
- **Accent Text**: Cormorant Garamond (literary serif)
- Font sizes are responsive and use rem units

### Layout Breakpoints
- Desktop: 1024px and above
- Tablet: 768px - 1024px
- Mobile: 480px - 768px
- Small Mobile: Below 480px

## 📧 Contact

### Current Contact Method
- **Email**: Gtreoch@yahoo.com (linked in footer)
- Direct email link available in navigation footer

### Future Form Integration
If you want to add a contact form in the future, consider:
- Netlify Forms (works automatically with Netlify deployment)
- EmailJS for client-side email sending
- Backend integration with server-side handling

## 🎬 Media Specifications

### Video Settings
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9
- **Duration**: 30 seconds - 3 minutes recommended
- **File Size**: Under 50MB for web optimization
- **Current Videos**: 
  - `Scripted-in-Al-Qaeda-Ink.mp4`
  - `Albatross.mp4`

### Audio Settings
- **Format**: M4A (AAC codec) or MP3
- **Sample Rate**: 44.1kHz recommended
- **Bitrate**: 128kbps or higher
- **Current Audio**: `Seeds of Darkness Ch2.m4a`

### Media Fallback
The site includes error handling for media loading issues and will display appropriate fallback messages if files cannot be loaded.

## 📱 Mobile Optimization

### Responsive Features
- Collapsible navigation on mobile devices
- Optimized touch targets and spacing
- Readable typography on small screens
- Efficient loading and performance

### Performance
- Optimized CSS with minimal redundancy
- Efficient JavaScript with event delegation
- Lazy loading ready for images
- Print stylesheet included

## 🔧 Browser Support

### Supported Browsers
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Progressive Enhancement
- Core functionality works without JavaScript
- CSS Grid with Flexbox fallbacks
- Modern features degrade gracefully

## 📈 SEO Features

- Semantic HTML structure
- Meta tags ready for content
- Alt text placeholders for images
- Proper heading hierarchy
- Schema.org markup ready

## 🚢 Deployment Options

### Netlify (Recommended)
1. Connect GitHub repository
2. Deploy automatically
3. Forms work out of the box
4. Free HTTPS included

### GitHub Pages
1. Push to GitHub repository
2. Enable Pages in settings
3. Site available at username.github.io/repo-name

### Traditional Web Hosting
1. Upload files via FTP
2. Ensure server supports HTML/CSS/JS
3. Configure email form handling separately

## 📞 Support

For questions about customization or technical issues:
- Email: Technical support can be provided for setup
- Documentation: This README covers most common scenarios
- Updates: Check for updates to improve functionality

## 📄 License

This author website template is created specifically for G.T. Reoch. All design and code elements are provided for the author's use in promoting their literary works.

---

**Built with modern web technologies for a professional literary presence.**
*Clean design. Engaging content. Professional results.* 