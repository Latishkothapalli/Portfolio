# Latish kothapalli - Personal Portfolio

A modern, responsive portfolio website with advanced animations and interactions, featuring an enhanced dynamic home page background.

## Project Structure

```
my_portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── favicon.ico
└── README.md
```

## Features

- **Modern Design**: Clean, responsive layout with dark/light theme toggle
- **Enhanced Home Page**: Advanced dynamic background with particle system
- **Responsive Layout**: Fully responsive design that works on all devices
- **Touch Support**: Mobile-friendly with touch gestures
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Performance Optimized**: Lightweight code with efficient animations

## Technologies Used

- **HTML5**: Semantic markup for better accessibility
- **CSS3**: Flexbox, Grid, Custom Properties, and modern styling techniques
- **Vanilla JavaScript**: For interactivity without framework dependencies
- **GSAP**: GreenSock Animation Platform for advanced animations
- **ScrollTrigger**: GSAP plugin for scroll-based animations

## Sections

1. **Home**: Enhanced with dynamic particle background
2. **About**: Personal introduction
3. **Qualifications**: Educational background
4. **Experience**: Professional experience
5. **Projects**: Portfolio showcase
6. **Certifications**: Professional credentials
7. **Skills**: Technical skills
8. **Workshops**: Professional development activities
9. **Interests**: Personal hobbies and passions
10. **Contact**: Contact form with validation

## Home Page Enhancements

The home page features an advanced dynamic background system with:

- **Canvas-based Particle System**: 100+ particles with orbital movements
- **Gradient Background**: Shifting color gradients for visual interest
- **Mouse Interaction**: Particles react to mouse movements
- **Connection Lines**: Dynamic lines between nearby particles
- **Glow Effects**: Particles with outer glow for depth
- **Performance Optimized**: 60fps animations with efficient rendering

## Animations

This portfolio implements several advanced animations:

- **GSAP ScrollTrigger**: Animates elements as they come into view
- **Entrance Animations**: Staggered animations for hero text and buttons
- **Progress Bar Animations**: Skill bars that animate when scrolled into view
- **Counter Animations**: Animated numbers for statistics
- **Hover Effects**: Interactive project cards with elevation effects
- **Theme Transitions**: Smooth transitions when toggling between dark/light modes

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in your browser to view the portfolio

To run locally with a server (recommended for full functionality):

### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Using Node.js (if installed):
```bash
# Install live-server globally if you haven't already
npm install -g live-server

# Run the server
live-server
```

### Using PHP (if installed):
```bash
php -S localhost:8000
```

## Customization

To customize this portfolio:

1. **Content**: Edit the HTML files to update personal information
2. **Styling**: Modify `assets/css/styles.css` to change colors, fonts, and layout
3. **Animations**: Adjust animation parameters in `assets/js/main.js`
4. **Images**: Replace placeholder images in `assets/images/`

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Reduced motion support for users with motion sensitivity
- Sufficient color contrast for readability
- Responsive design for all screen sizes

## Browser Support

This portfolio works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Lightweight codebase (~100KB total)
- Efficient animations using GSAP
- CSS containment for better rendering performance
- Lazy loading for images
- Optimized for Core Web Vitals

## License

This project is open source and available under the MIT License.

## Author

Latish kothapalli

Feel free to use this portfolio as a template for your own personal website. Please customize the content and design to make it your own.
