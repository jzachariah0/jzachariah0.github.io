# Joshua S. Zachariah - Cybersecurity & AI Portfolio

A comprehensive portfolio website showcasing expertise in cybersecurity, artificial intelligence, and software engineering. Built with a cyber-themed aesthetic and optimized for GitHub Pages deployment.

## Features

### Core Sections
- **Hero Section**: Terminal-style typing effect with personal branding
- **About**: Personal bio highlighting National Cyber Scholar status and ECE background
- **Experience**: Interactive timeline of professional experience
- **Projects**: Filterable grid showcasing AI/ML, Cybersecurity, and Engineering projects
- **Skills**: Interactive skill tiles with proficiency levels and descriptions

### Advanced Features
- **Search Functionality**: Real-time search across projects, skills, and technologies
- **YouTube Integration**: Embedded playlist and channel statistics
- **Blog Section**: Technical articles and insights
- **Contact Form**: EmailJS-powered contact form with validation

## Design Theme

### Cyber Aesthetic
- **Color Palette**: Neon green (#00ff41), cyber blue (#00d4ff), purple (#bf00ff), red (#ff073a)
- **Typography**: Courier New monospace font for terminal feel
- **Effects**: Glow effects, hover animations, and cyber-inspired UI elements
- **Responsive**: Mobile-first design with breakpoint optimizations

### Interactive Elements
- Smooth scrolling navigation
- Project category filtering
- Hover effects and transitions
- Terminal-style interfaces
- Real-time search with filtering

## Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Custom cyber styling with Tailwind CSS
- **JavaScript**: Vanilla JS for all interactions (no frameworks)
- **Font Awesome**: Icons and visual elements
- **EmailJS**: Contact form functionality

### Data Architecture
- **JSON Data Files**: Modular content management
  - `experience.json`: Professional timeline
  - `projects.json`: Project showcase data
  - `skills.json`: Technical skills and proficiencies
  - `youtube.json`: Video content metadata

### Deployment
- **GitHub Pages**: Static site hosting
- **No Build Process**: Direct deployment compatibility
- **CDN Assets**: External resources for optimal loading

## Project Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── css/
│   └── style.css           # Custom cyber-themed styling
├── js/
│   └── script.js           # Interactive functionality
├── data/
│   ├── experience.json     # Professional experience data
│   ├── projects.json       # Project showcase data
│   ├── skills.json         # Technical skills data
│   └── youtube.json        # Video content data
├── README.md               # Project documentation
├── EMAILJS_SETUP.md        # Contact form setup guide
└── AI_GUIDE.md             # Development notes
```

## Setup Instructions

### 1. Clone and Deploy
```bash
git clone <repository-url>
cd Portfolio
# Deploy to GitHub Pages or serve locally
```

### 2. EmailJS Configuration
1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Set up email service and template
3. Update credentials in `js/script.js`:
   ```javascript
   emailjs.init("YOUR_USER_ID");
   await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
   ```
4. See `EMAILJS_SETUP.md` for detailed instructions

### 3. Content Customization
- Update personal information in HTML
- Modify data files in `/data/` directory
- Customize colors and styling in `/css/style.css`
- Add your own projects, experience, and skills

## Featured Projects

### AI/ML Projects
- **EdTech Platform**: Personalized learning with machine learning
- **Phishing Detection**: Email security using NLP and ML
- **IRBot**: Incident response automation tool

### Cybersecurity Projects
- **SOC Home Lab**: Complete security operations center setup
- **Network Security**: Monitoring and threat detection systems

### Engineering Projects
- **HBS Home Lab**: Hardware-based security implementations
- **IoT Security**: Embedded systems protection

## Key Achievements

- **National Cyber Scholar**: ISC2 recognition program
- **Certified in Cybersecurity (CC)**: ISC2 professional certification
- **ECE Honors Program**: Electrical and Computer Engineering
- **AI/ML Research**: Leadership in university research initiatives

## Interactive Features

### Search System
- Real-time filtering across all content
- Category-based search (Projects, Skills, Technologies)
- Intelligent relevance ranking
- Terminal-style interface

### Contact Integration
- EmailJS-powered form submission
- Form validation and error handling
- Success/error messaging
- Professional contact information display

### YouTube Integration
- Embedded playlist showcase
- Channel statistics display
- Video metadata presentation
- Responsive video embedding

## Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Breakpoint Optimization**: Custom layouts for different screen sizes
- **Touch-Friendly**: Mobile interaction considerations
- **Performance**: Optimized loading and rendering

## Security Considerations

- **Static Site**: No server-side vulnerabilities
- **External Services**: Secure EmailJS integration
- **Content Security**: XSS protection through proper escaping
- **Privacy**: No tracking or analytics

## Deployment

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select source branch (main/master)
3. Access via `https://username.github.io/repository-name`

### Local Development
```bash
# Serve locally using any static server
python -m http.server 8000
# or
npx serve .
```

## Performance Features

- **CDN Assets**: Fast loading external resources
- **Optimized Images**: Properly sized media files
- **Minimal JavaScript**: Vanilla JS for best performance
- **Efficient CSS**: Tailwind utilities with custom overrides

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

## Contact Information

- **Email**: joshuaszachariah@gmail.com
- **LinkedIn**: [linkedin.com/in/joshzachariah](https://linkedin.com/in/joshzachariah/)
- **Phone**: 469-858-5532

## 📄 License

This portfolio is open source and available under the MIT License. Feel free to use it as inspiration for your own portfolio!

---

**Built with care by Joshua S. Zachariah**  
*Cybersecurity Specialist & AI/ML Engineer*
