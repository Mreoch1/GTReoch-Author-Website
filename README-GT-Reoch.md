# G.T. Reoch - Professional Author Website

A clean, professional author website designed to showcase G.T. Reoch's literary works, upcoming publications, and connect with readers worldwide.

## 🌟 Features

### Core Sections
- **Hero Section** with video trailer placement
- **About the Author** with professional biography
- **Upcoming Works** showcasing future publications
- **Contact Form** for reader engagement
- **Newsletter Signup** for reader updates

### Professional Design
- Clean, modern typography using Playfair Display and Source Sans Pro
- Responsive design that works on all devices
- Professional color palette with elegant styling
- Smooth animations and scroll effects
- Interactive elements and form handling

### Technical Features
- Fully responsive CSS Grid and Flexbox layout
- Modern JavaScript with ES6+ features
- Smooth scrolling navigation
- Form validation and submission handling
- Video integration with error handling
- Animated statistics counters
- Notification system for user feedback
- SEO-friendly semantic HTML structure

## 📁 File Structure

```
gt-reoch-author-page/
├── gt-reoch-author.html      # Main HTML page
├── gt-reoch-styles.css       # Complete CSS styling
├── gt-reoch-script.js        # Interactive JavaScript
├── README-GT-Reoch.md        # This documentation
└── assets/
    ├── Scripted in Al Qaeda Ink.mp4                    # Book trailer video
    ├── Scripted in Al Qaeda Ink Final Cover Art 4_16.jpg  # Book cover
    ├── author-photo-placeholder.jpg (to be added)
    ├── placeholder-book-1.jpg (to be added)
    ├── placeholder-book-2.jpg (to be added)
    └── placeholder-book-3.jpg (to be added)
```

## 🚀 Setup Instructions

### 1. Video Integration
To add your book trailer video:
1. Place your MP4 video file in the project directory
2. Name it `book-trailer.mp4` or update the HTML src attribute
3. Optionally add a poster image as `placeholder-poster.jpg`

### 2. Images
Replace the placeholder images with actual content:
- `author-photo-placeholder.jpg` - Professional author headshot (300x300px recommended)
- `placeholder-book-1.jpg` - Book cover for "The Echoing Chambers"
- `placeholder-book-2.jpg` - Book cover for "Digital Shadows"  
- `placeholder-book-3.jpg` - Book cover for "The Last Garden"
- `placeholder-poster.jpg` - Video poster frame

### 3. Content Customization

#### Author Biography
Edit the "About the Author" section in `gt-reoch-author.html`:
- Update the biography text
- Modify author statistics (published works, readers, genres)
- Adjust the description to match actual experience

#### Upcoming Works
Customize the upcoming books section:
- Update book titles, genres, and descriptions
- Modify release dates and status badges
- Replace placeholder images with actual book covers

#### Contact Information
- Email is set to `Gtreoch@yahoo.com` as requested
- Modify other contact details as needed
- Update form handling for actual email integration

## 🎨 Customization

### Color Scheme
The site uses CSS custom properties for easy color customization:

```css
:root {
    --primary-color: #2c3e50;      /* Navy blue */
    --secondary-color: #34495e;     /* Darker blue */
    --accent-color: #e74c3c;        /* Red accent */
    --text-color: #333333;          /* Dark gray */
    --background-light: #f8f9fa;    /* Light gray */
}
```

### Typography
- **Headers**: Playfair Display (serif)
- **Body Text**: Source Sans Pro (sans-serif)
- Font sizes are responsive and use rem units

### Layout Breakpoints
- Desktop: 1024px and above
- Tablet: 768px - 1024px
- Mobile: 480px - 768px
- Small Mobile: Below 480px

## 📧 Form Integration

### Current Setup
Forms currently use JavaScript simulation for demonstration. To integrate with actual email services:

#### Option 1: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to forms
3. Forms will automatically work with Netlify's form handling

#### Option 2: EmailJS
1. Set up EmailJS account
2. Update JavaScript to use EmailJS SDK
3. Configure email templates

#### Option 3: Backend Integration
1. Set up backend server (Node.js, PHP, etc.)
2. Update form action attributes
3. Implement server-side email handling

## 🎬 Video Specifications

### Recommended Video Settings
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9
- **Duration**: 30 seconds - 3 minutes recommended
- **File Size**: Under 50MB for web optimization

### Video Fallback
The site includes error handling for video loading issues and will display a "Coming Soon" message if the video file is not available.

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