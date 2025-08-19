// Portfolio Interactive JavaScript - GitHub Pages Compatible
// Enhanced with Chart.js, Search, EmailJS, and JSON data handling

// Global variables
let projectsData = [];
let skillsData = [];
let experienceData = [];
let youtubeData = [];
let searchData = {
    projects: [],
    skills: [],
    technologies: []
};

// Chart instance for cleanup
let projectChart = null;

// Initialize portfolio when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});



async function initializePortfolio() {
    try {
        console.log('[INIT] Initializing portfolio...');
        
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID
            console.log('[INFO] Email service initialized');
        }
        
        // Load all data with error handling
        await Promise.all([
            loadProjects().catch(err => console.error('Projects load failed:', err)),
            loadSkills().catch(err => console.error('Skills load failed:', err)),
            loadExperience().catch(err => console.error('Experience load failed:', err)),
            loadYouTubeVideos().catch(err => console.error('YouTube load failed:', err))
        ]);
        
        // Initialize interactive features
        initializeSearch();
        initializeContactForm();
        initializeProjectChart();
        initializeSmoothScrolling();
        initializeTerminal();
        initializeTypingEffects();
        
        // Initialize typewriter effect
        initializeTypewriter();
        
    console.log('[OK] Portfolio initialized successfully');
    } catch (error) {
    console.error('[ERROR] Initializing portfolio failed:', error);
        showErrorMessage('Failed to initialize portfolio. Please refresh the page.');
    }
}

// Enhanced Data Loading Functions
async function loadProjects() {
    try {
    console.log('[LOAD] Loading projects...');
        const response = await fetch('./data/projects.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        projectsData = await response.json();
        
        // Validate data structure
        if (!Array.isArray(projectsData)) {
            throw new Error('Invalid projects data format');
        }
        
        renderProjects(projectsData);
        initializeProjectFilters();
        
        // Prepare search data
        searchData.projects = projectsData.map(project => ({
            type: 'project',
            title: project.title,
            description: project.description,
            category: project.category,
            technologies: project.technologies || [],
            content: `${project.title} ${project.description} ${project.category} ${(project.technologies || []).join(' ')}`
        }));
        
    console.log(`[OK] Loaded ${projectsData.length} projects`);
    } catch (error) {
    console.error('[ERROR] Loading projects failed:', error);
        const container = document.getElementById('projects-container');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center p-8">
                    <div class="text-red-400 font-mono">
                        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <p>Error loading projects data</p>
                        <p class="text-sm text-gray-400 mt-2">${error.message}</p>
                    </div>
                </div>
            `;
        }
        throw error;
    }
}

async function loadSkills() {
    try {
    console.log('[LOAD] Loading skills...');
        const response = await fetch('./data/skills.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        skillsData = await response.json();
        
        // Validate data structure
        if (!skillsData.categories || !Array.isArray(skillsData.categories)) {
            throw new Error('Invalid skills data format');
        }
        
        renderSkills(skillsData);
        
        // Prepare search data for skills
        searchData.skills = skillsData.categories.flatMap(category => 
            category.skills.map(skill => ({
                type: 'skill',
                title: skill.name,
                description: skill.description,
                category: category.name,
                level: skill.level,
                content: `${skill.name} ${skill.description} ${category.name}`
            }))
        );
        
        // Prepare technologies data from both projects and skills
        const projectTechs = projectsData.flatMap(p => p.technologies || []);
        const skillTechs = skillsData.categories.flatMap(c => c.skills.map(s => s.name));
        const allTechs = [...new Set([...projectTechs, ...skillTechs])];
        
        searchData.technologies = allTechs.map(tech => ({
            type: 'technology',
            title: tech,
            description: `Technology/Tool: ${tech}`,
            content: tech
        }));
        
    console.log(`[OK] Loaded ${skillsData.categories.length} skill categories`);
    } catch (error) {
    console.error('[ERROR] Loading skills failed:', error);
        const container = document.getElementById('skills-container');
        if (container) {
            container.innerHTML = `
                <div class="text-center p-8">
                    <div class="text-red-400 font-mono">
                        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <p>Error loading skills data</p>
                        <p class="text-sm text-gray-400 mt-2">${error.message}</p>
                    </div>
                </div>
            `;
        }
        throw error;
    }
}

async function loadExperience() {
    try {
    console.log('[LOAD] Loading experience...');
        const response = await fetch('./data/experience.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        experienceData = await response.json();
        
        // Validate data structure
        if (!Array.isArray(experienceData)) {
            throw new Error('Invalid experience data format');
        }
        
    renderExperience(experienceData);
    console.log(`[OK] Loaded ${experienceData.length} experience entries`);
    } catch (error) {
    console.error('[ERROR] Loading experience failed:', error);
        const container = document.getElementById('experience-container');
        if (container) {
            container.innerHTML = `
                <div class="text-center p-8">
                    <div class="text-red-400 font-mono">
                        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <p>Error loading experience data</p>
                        <p class="text-sm text-gray-400 mt-2">${error.message}</p>
                    </div>
                </div>
            `;
        }
        throw error;
    }
}

async function loadYouTubeVideos() {
    try {
    console.log('[LOAD] Loading YouTube data...');
        const response = await fetch('./data/youtube.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        youtubeData = await response.json();
        renderYouTubeVideos(youtubeData);
    console.log('[OK] YouTube data loaded');
    } catch (error) {
    console.error('[ERROR] Loading YouTube data failed:', error);
        const container = document.getElementById('youtube-container');
        if (container) {
            container.innerHTML = `
                <div class="text-center p-8">
                    <div class="text-red-400 font-mono">
                        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <p>Error loading YouTube data</p>
                        <p class="text-sm text-gray-400 mt-2">${error.message}</p>
                    </div>
                </div>
            `;
        }
        // Don't throw for YouTube as it's not critical
    }
}

// Enhanced Rendering Functions
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    if (!projects || projects.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center p-8">
                <div class="text-gray-400 font-mono">
                    <i class="fas fa-folder-open text-2xl mb-2"></i>
                    <p>No projects available</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = projects.map((project, index) => {
        const categoryColors = {
            'AI/ML': { primary: 'purple-400', secondary: 'purple-400/20', icon: 'fa-brain' },
            'Cybersecurity': { primary: 'red-400', secondary: 'red-400/20', icon: 'fa-shield-alt' },
            'Electrical Engineering': { primary: 'yellow-400', secondary: 'yellow-400/20', icon: 'fa-microchip' }
        };

        const colors = categoryColors[project.category] || { 
            primary: 'green-400', 
            secondary: 'green-400/20',
            icon: 'fa-folder'
        };

        return `
        <div class="cyber-card project-card p-6" data-category="${project.category}" data-index="${index}">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <i class="fas ${colors.icon} text-${colors.primary} text-xl"></i>
                    <span class="text-${colors.primary} font-mono text-sm uppercase tracking-wider">${project.category}</span>
                </div>
                <div class="flex space-x-3">
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
                           class="text-gray-400 hover:text-${colors.primary} transition-colors duration-300" 
                           title="View Source Code">
                            <i class="fab fa-github text-lg"></i>
                        </a>
                    ` : ''}
                    ${project.demo ? `
                        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" 
                           class="text-gray-400 hover:text-${colors.primary} transition-colors duration-300" 
                           title="View Live Demo">
                            <i class="fas fa-external-link-alt text-lg"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-3 font-mono hover:text-${colors.primary} transition-colors duration-300">
                ${project.title}
            </h3>
            <p class="text-gray-300 mb-4 leading-relaxed line-clamp-3">${project.description}</p>
            
            ${project.technologies && project.technologies.length > 0 ? `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => `
                        <span class="bg-${colors.secondary} text-${colors.primary} px-3 py-1 rounded-full text-xs font-mono font-bold hover:bg-${colors.primary} hover:text-black transition-all duration-300 cursor-pointer">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="flex items-center justify-between">
                <span class="text-${colors.primary} font-mono text-sm font-bold">${project.status || 'Active'}</span>
                <div class="flex items-center space-x-2">
                    ${project.impact ? `
                        <span class="text-xs text-gray-400 font-mono" title="${project.impact}">
                            <i class="fas fa-chart-line text-green-400"></i>
                        </span>
                    ` : ''}
                    <span class="text-${colors.primary} text-sm font-mono hover:scale-110 transition-transform duration-300">></span>
                </div>
            </div>
        </div>
        `;
    }).join('');

    // Add click handlers for project cards
    const projectCards = container.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const project = projects[index];
            if (project.demo) {
                window.open(project.demo, '_blank', 'noopener,noreferrer');
            } else if (project.github) {
                window.open(project.github, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

// Enhanced Chart.js Implementation
function initializeProjectChart() {
    const chartCanvas = document.getElementById('projectChart');
    if (!chartCanvas || typeof Chart === 'undefined') {
    console.warn('[WARN] Chart.js not available or canvas not found');
        return;
    }
    
    const ctx = chartCanvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (projectChart) {
        projectChart.destroy();
    }
    
    try {
        projectChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Error Reduction Achieved', 'Baseline Performance'],
                datasets: [{
                    data: [40, 60],
                    backgroundColor: [
                        '#00ff41', // Cyber green for improvement
                        '#ff073a'  // Cyber red for baseline
                    ],
                    borderColor: [
                        '#00ff41',
                        '#ff073a'
                    ],
                    borderWidth: 3,
                    hoverBorderWidth: 5,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Courier New',
                                size: 12,
                                weight: 'bold'
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'AI EDTECH PLATFORM IMPACT',
                        color: '#ffff00',
                        font: {
                            family: 'Courier New',
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#00ff41',
                        bodyColor: '#ffffff',
                        borderColor: '#00ff41',
                        borderWidth: 2,
                        titleFont: {
                            family: 'Courier New',
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: 'Courier New'
                        },
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 3,
                        hoverBorderWidth: 5
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
        
    console.log('[OK] Chart initialized successfully');
    } catch (error) {
    console.error('[ERROR] Chart initialization failed:', error);
        const container = chartCanvas.parentElement;
        if (container) {
            container.innerHTML = `
                <div class="text-center text-red-400 font-mono p-4">
                    <i class="fas fa-chart-pie text-2xl mb-2"></i>
                    <p>Chart unavailable</p>
                </div>
            `;
        }
    }
}

// Enhanced Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchFilters = document.querySelectorAll('.search-filter');
    
    if (!searchInput) {
        console.warn('[WARN] Search input not found');
        return;
    }
    
    // Debounce search input
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(handleSearch, 300);
    });
    
    searchFilters.forEach(filter => {
        filter.addEventListener('click', handleFilterChange);
    });
    
    // Initialize with first filter active
    const firstFilter = document.querySelector('.search-filter');
    if (firstFilter && !document.querySelector('.search-filter.active')) {
        firstFilter.classList.add('active');
    }
    
    console.log('[OK] Search initialized');
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeFilter = document.querySelector('.search-filter.active');
    const filterType = activeFilter ? activeFilter.dataset.type : 'all';
    
    if (query.length < 2) {
        displaySearchResults([]);
        return;
    }
    
    let results = [];
    
    try {
        if (filterType === 'all' || filterType === 'projects') {
            results.push(...searchData.projects.filter(item => 
                item.content.toLowerCase().includes(query)
            ));
        }
        
        if (filterType === 'all' || filterType === 'skills') {
            results.push(...searchData.skills.filter(item => 
                item.content.toLowerCase().includes(query)
            ));
        }
        
        if (filterType === 'all' || filterType === 'technologies') {
            results.push(...searchData.technologies.filter(item => 
                item.content.toLowerCase().includes(query)
            ));
        }
        
        // Enhanced sorting by relevance
        results.sort((a, b) => {
            const aExact = a.title.toLowerCase() === query;
            const bExact = b.title.toLowerCase() === query;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            const aStarts = a.title.toLowerCase().startsWith(query);
            const bStarts = b.title.toLowerCase().startsWith(query);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            
            const aIncludes = a.title.toLowerCase().includes(query);
            const bIncludes = b.title.toLowerCase().includes(query);
            if (aIncludes && !bIncludes) return -1;
            if (!aIncludes && bIncludes) return 1;
            
            return 0;
        });
        
        displaySearchResults(results.slice(0, 12)); // Increased limit
    } catch (error) {
        console.error('[ERROR] Search error:', error);
        displaySearchResults([]);
    }
}

function handleFilterChange(event) {
    event.preventDefault();
    
    // Update active filter
    document.querySelectorAll('.search-filter').forEach(filter => {
        filter.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Re-run search with new filter
    handleSearch();
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (results.length === 0) {
        const query = document.getElementById('search-input')?.value || '';
        container.innerHTML = `
            <div class="text-center text-gray-400 font-mono py-12">
                <i class="fas fa-search text-red-400 text-3xl mb-4"></i>
                <p class="text-lg">${query ? `No results found for "${query}"` : 'Start typing to search database...'}</p>
                <p class="text-sm mt-2">Try searching for projects, skills, or technologies</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map(result => {
        const typeColors = {
            'project': { color: 'purple-400', icon: 'fa-folder' },
            'skill': { color: 'green-400', icon: 'fa-cog' },
            'technology': { color: 'blue-400', icon: 'fa-wrench' }
        };
        const config = typeColors[result.type] || { color: 'red-400', icon: 'fa-question' };
        
        return `
            <div class="bg-black/70 border border-${config.color}/30 rounded-lg p-6 backdrop-blur-sm hover:border-${config.color} transition-all duration-300 group cursor-pointer">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <i class="fas ${config.icon} text-${config.color} text-lg"></i>
                        <span class="text-${config.color} font-mono text-xs uppercase tracking-wider font-bold">${result.type}</span>
                    </div>
                    ${result.level ? `<span class="text-gray-400 text-sm font-mono font-bold">${result.level}%</span>` : ''}
                </div>
                
                <h4 class="text-white font-mono font-bold mb-3 group-hover:text-${config.color} transition-colors text-lg">
                    ${result.title}
                </h4>
                
                <p class="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    ${result.description}
                </p>
                
                ${result.category ? `
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-${config.color}/20 text-${config.color} px-3 py-1 rounded-full font-mono font-bold">
                            ${result.category}
                        </span>
                        <span class="text-${config.color} text-lg font-mono group-hover:scale-110 transition-transform duration-300">></span>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Enhanced Contact Form with EmailJS
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.warn('[WARN] Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Transmitting...';
        submitButton.disabled = true;
        
        try {
            const formData = {
                from_name: this.querySelector('[name="name"]')?.value || '',
                from_email: this.querySelector('[name="email"]')?.value || '',
                subject: this.querySelector('[name="subject"]')?.value || '',
                message: this.querySelector('[name="message"]')?.value || ''
            };
            
            // Validate form data
            if (!formData.from_name.trim() || !formData.from_email.trim() || !formData.message.trim()) {
                throw new Error('Please fill in all required fields');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.from_email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
                showContactMessage('Message transmitted successfully. Awaiting response...', 'success');
                this.reset();
            } else {
                throw new Error('Email service not available');
            }
            
        } catch (error) {
            console.error('[ERROR] Contact form error:', error);
            showContactMessage(`Transmission failed: ${error.message}`, 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    console.log('[OK] Contact form initialized');
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('border-red-400');
    
    // Validate based on field type
    if (field.name === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('border-red-400');
            return false;
        }
    }
    
    if (field.required && !value) {
        field.classList.add('border-red-400');
        return false;
    }
    
    return true;
}

function clearFieldError(event) {
    event.target.classList.remove('border-red-400');
}

function showContactMessage(message, type) {
    const container = document.getElementById('contact-message');
    if (!container) return;
    
    const bgColor = type === 'success' ? 'bg-green-900/60 border-green-400' : 'bg-red-900/60 border-red-400';
    const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    
    container.innerHTML = `
        <div class="${bgColor} border-2 ${textColor} rounded-lg p-4 font-mono text-sm backdrop-blur-sm">
            <i class="fas ${icon} mr-2"></i>
            ${message}
        </div>
    `;
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        if (container.innerHTML.includes(message)) {
            container.innerHTML = '';
        }
    }, 8000);
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
    
    console.log('[OK] Smooth scrolling initialized');
}

// Enhanced Typing Effect
function typeWriter(element, text, speed = 80) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #00ff41';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor effect
            setTimeout(() => {
                element.style.borderRight = '2px solid transparent';
                setTimeout(() => {
                    element.style.borderRight = '2px solid #00ff41';
                }, 500);
            }, 1000);
        }
    }
    
    type();
}

// Utility Functions
function showErrorMessage(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'fixed top-4 right-4 bg-red-900/90 border border-red-400 text-red-400 px-6 py-4 rounded-lg font-mono text-sm z-50 backdrop-blur-sm';
    errorContainer.innerHTML = `
        <i class="fas fa-exclamation-triangle mr-2"></i>
        ${message}
    `;
    
    document.body.appendChild(errorContainer);
    
    setTimeout(() => {
        errorContainer.remove();
    }, 5000);
}

// Cleanup function for page unload
window.addEventListener('beforeunload', function() {
    if (projectChart) {
        projectChart.destroy();
    }
});

// Note: Removed duplicate legacy implementations of loadExperience/loadYouTubeVideos without emojis

// Rendering Functions
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map(project => {
        const categoryColors = {
            'AI/ML': { primary: 'purple-400', secondary: 'purple-400/20' },
            'Cybersecurity': { primary: 'red-400', secondary: 'red-400/20' },
            'Electrical Engineering': { primary: 'yellow-400', secondary: 'yellow-400/20' }
        };

        const colors = categoryColors[project.category] || { primary: 'green-400', secondary: 'green-400/20' };

        return `
        <div class="cyber-card project-card p-6" data-category="${project.category}">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-folder text-${colors.primary} text-xl"></i>
                    <span class="text-${colors.primary} font-mono text-sm uppercase tracking-wider">${project.category}</span>
                </div>
                <div class="flex space-x-2">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="text-gray-400 hover:text-${colors.primary} transition-colors">
                        <i class="fab fa-github text-lg"></i>
                    </a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="text-gray-400 hover:text-${colors.primary} transition-colors">
                        <i class="fas fa-external-link-alt text-lg"></i>
                    </a>` : ''}
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-3 font-mono">${project.title}</h3>
            <p class="text-gray-300 mb-4 leading-relaxed">${project.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies.map(tech => `
                    <span class="bg-${colors.secondary} text-${colors.primary} px-3 py-1 rounded-full text-xs font-mono font-bold">
                        ${tech}
                    </span>
                `).join('')}
            </div>
            
            <div class="flex items-center justify-between">
                <span class="text-${colors.primary} font-mono text-sm">${project.status}</span>
                <span class="text-${colors.primary} text-sm font-mono">></span>
            </div>
        </div>
        `;
    }).join('');
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = skills.categories.map(category => {
        const categoryColors = {
            'Programming Languages': { primary: 'green-400', secondary: 'green-400/20' },
            'Cybersecurity Tools': { primary: 'red-400', secondary: 'red-400/20' },
            'Cloud & DevOps': { primary: 'blue-400', secondary: 'blue-400/20' },
            'AI/ML & Data Science': { primary: 'purple-400', secondary: 'purple-400/20' },
            'Hardware & Engineering': { primary: 'yellow-400', secondary: 'yellow-400/20' }
        };

        const colors = categoryColors[category.name] || { primary: 'green-400', secondary: 'green-400/20' };

        return `
        <div class="skill-category mb-12">
            <h3 class="text-2xl font-bold text-${colors.primary} mb-6 font-mono text-center">
                <span class="text-white">[</span>${category.name.toUpperCase()}<span class="text-white">]</span>
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                ${category.skills.map(skill => `
                    <div class="skill-tile group cursor-pointer" title="${skill.description}">
                        <div class="text-2xl text-${colors.primary} mb-2 group-hover:scale-110 transition-transform duration-300">
                            <i class="${skill.icon}"></i>
                        </div>
                        <h4 class="font-mono text-sm text-white mb-2 group-hover:text-${colors.primary} transition-colors">${skill.name}</h4>
                        
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                        </div>
                        
                        <span class="text-xs text-gray-400 font-mono">${skill.level}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
        `;
    }).join('');
}

function renderExperience(experience) {
    const container = document.getElementById('experience-container');
    if (!container) return;

    container.innerHTML = experience.map((job, index) => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 class="text-xl font-bold text-cyan-400 font-mono">${job.title}</h3>
                    <span class="text-gray-400 font-mono text-sm">${job.duration}</span>
                </div>
                <h4 class="text-lg text-green-400 font-mono mb-3">${job.company}</h4>
                <p class="text-gray-300 mb-4 leading-relaxed">${job.description}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 class="text-red-400 font-mono font-bold mb-2">Key Achievements:</h5>
                        <ul class="text-gray-300 space-y-1">
                            ${job.achievements.map(achievement => `
                                <li class="flex items-start">
                                    <span class="text-green-400 mr-2">▸</span>
                                    <span class="text-sm">${achievement}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h5 class="text-purple-400 font-mono font-bold mb-2">Technologies:</h5>
                        <div class="flex flex-wrap gap-2">
                            ${job.technologies.map(tech => `
                                <span class="bg-purple-400/20 text-purple-400 px-2 py-1 rounded text-xs font-mono">
                                    ${tech}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderYouTubeVideos(data) {
    const container = document.getElementById('youtube-container');
    if (!container) return;

    container.innerHTML = `
        <div class="mb-8">
            <div class="youtube-stats rounded-lg p-6 mb-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div class="text-2xl font-bold text-red-400 font-mono">${data.channelStats.subscribers}</div>
                        <div class="text-gray-400 text-sm font-mono">Subscribers</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-green-400 font-mono">${data.channelStats.videos}</div>
                        <div class="text-gray-400 text-sm font-mono">Videos</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-blue-400 font-mono">${data.channelStats.views}</div>
                        <div class="text-gray-400 text-sm font-mono">Total Views</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-purple-400 font-mono">${data.channelStats.hours}</div>
                        <div class="text-gray-400 text-sm font-mono">Watch Hours</div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${data.featuredVideos.map(video => `
                    <div class="youtube-card">
                        <div class="aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/${video.videoId}"
                                title="${video.title}"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                                class="w-full h-full">
                            </iframe>
                        </div>
                        <div class="p-4">
                            <h4 class="font-mono font-bold text-white mb-2">${video.title}</h4>
                            <p class="text-gray-400 text-sm mb-3">${video.description}</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-gray-500 font-mono">${video.duration}</span>
                                <span class="text-xs text-green-400 font-mono">${video.views} views</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Project Filtering
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

// Search Functionality
function initializeSearchLegacy() {
    const searchInput = document.getElementById('search-input');
    const searchFilters = document.querySelectorAll('.search-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    searchFilters.forEach(filter => {
        filter.addEventListener('click', handleFilterChange);
    });
}

function handleSearchLegacy() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const activeFilter = document.querySelector('.search-filter.active')?.dataset.type || 'all';
    
    if (query.length < 2) {
        displaySearchResults([]);
        return;
    }
    
    let results = [];
    
    if (activeFilter === 'all' || activeFilter === 'projects') {
        results.push(...searchData.projects.filter(item => 
            item.content.toLowerCase().includes(query)
        ));
    }
    
    if (activeFilter === 'all' || activeFilter === 'skills') {
        results.push(...searchData.skills.filter(item => 
            item.content.toLowerCase().includes(query)
        ));
    }
    
    if (activeFilter === 'all' || activeFilter === 'technologies') {
        results.push(...searchData.technologies.filter(item => 
            item.content.toLowerCase().includes(query)
        ));
    }
    
    // Sort by relevance
    results.sort((a, b) => {
        const aExact = a.title.toLowerCase().includes(query);
        const bExact = b.title.toLowerCase().includes(query);
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return 0;
    });
    
    displaySearchResults(results.slice(0, 10));
}

function handleFilterChangeLegacy(event) {
    document.querySelectorAll('.search-filter').forEach(filter => {
        filter.classList.remove('active');
    });
    
    event.target.classList.add('active');
    handleSearch();
}

function displaySearchResultsLegacy(results) {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (results.length === 0) {
        const query = document.getElementById('search-input').value;
        container.innerHTML = `
            <div class="text-center text-gray-400 font-mono py-8">
                <i class="fas fa-search text-red-400 text-2xl mb-2"></i>
                <p>${query ? 'No results found for "' + query + '"' : 'Start typing to search database...'}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map(result => {
        const typeColors = {
            'project': 'purple-400',
            'skill': 'green-400',
            'technology': 'blue-400'
        };
        const color = typeColors[result.type] || 'red-400';
        
        return `
            <div class="bg-black/60 border border-${color}/30 rounded-lg p-4 backdrop-blur-sm hover:border-${color} transition-all duration-300 group">
                <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-${result.type === 'project' ? 'folder' : result.type === 'skill' ? 'cog' : 'wrench'} text-${color}"></i>
                        <span class="text-${color} font-mono text-xs uppercase tracking-wider">${result.type}</span>
                    </div>
                    ${result.level ? `<span class="text-gray-400 text-xs font-mono">${result.level}%</span>` : ''}
                </div>
                
                <h4 class="text-white font-mono font-bold mb-2 group-hover:text-${color} transition-colors">
                    ${result.title}
                </h4>
                
                <p class="text-gray-300 text-sm leading-relaxed mb-3">
                    ${result.description}
                </p>
                
                ${result.category ? `
                    <div class="flex items-center justify-between">
                        <span class="text-xs bg-${color}/20 text-${color} px-2 py-1 rounded font-mono">
                            ${result.category}
                        </span>
                        <span class="text-${color} text-xs font-mono">></span>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Contact Form with EmailJS
function initializeContactFormLegacy() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        try {
            const formData = {
                from_name: this.querySelector('[name="name"]').value,
                from_email: this.querySelector('[name="email"]').value,
                subject: this.querySelector('[name="subject"]').value,
                message: this.querySelector('[name="message"]').value
            };
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
                showContactMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error('EmailJS not loaded');
            }
            
        } catch (error) {
            console.error('Error sending email:', error);
            showContactMessage('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

function showContactMessageLegacy(message, type) {
    const container = document.getElementById('contact-message');
    if (!container) return;
    
    const bgColor = type === 'success' ? 'bg-green-900/50 border-green-400' : 'bg-red-900/50 border-red-400';
    const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';
    
    container.innerHTML = `
        <div class="${bgColor} border ${textColor} rounded-lg p-4 font-mono text-sm">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} mr-2"></i>
            ${message}
        </div>
    `;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Chart.js Implementation
function initializeProjectChartLegacy() {
    const chartCanvas = document.getElementById('projectChart');
    if (!chartCanvas || typeof Chart === 'undefined') return;
    
    const ctx = chartCanvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Error Reduction', 'Baseline'],
            datasets: [{
                data: [40, 60],
                backgroundColor: [
                    '#00ff41', // Cyber green for improvement
                    '#ff073a'  // Cyber red for baseline
                ],
                borderColor: [
                    '#00ff41',
                    '#ff073a'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Courier New',
                            size: 12
                        },
                        padding: 20
                    }
                },
                title: {
                    display: true,
                    text: 'PROJECT IMPACT: 40% ERROR REDUCTION',
                    color: '#ffff00',
                    font: {
                        family: 'Courier New',
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            elements: {
                arc: {
                    borderWidth: 2
                }
            }
        }
    });
}

// Typing Effect
function typeWriterLegacy(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Smooth scrolling for navigation links
// Removed older duplicate smooth scrolling listener

// Terminal Animation Functions
function initializeTerminal() {
    const terminalText = document.getElementById('terminal-text');
    if (!terminalText) return;
    
    const commands = [
        { command: 'whoami', response: 'joshua.zachariah' },
        { command: 'pwd', response: '/home/joshua/portfolio' },
        { command: 'cat about.txt', response: 'AI Security Innovator & Digital Transformation Author' },
        { command: 'ls achievements/', response: 'amazon-bestseller.pdf  nonprofit-founder.cert  cyber-scholar.award' },
        { command: 'grep -r "expertise" ./skills/', response: './skills/ai-cybersecurity.txt\n./skills/ground-to-cloud.txt\n./skills/innovation-strategy.txt' },
        { command: 'echo $STATUS', response: 'ACTIVELY_SEEKING_OPPORTUNITIES' },
        { command: 'ping collaboration.ready', response: '64 bytes from joshua: icmp_seq=1 ttl=64 time=0.1ms\nREADY FOR STRATEGIC PARTNERSHIPS' }
    ];
    
    let currentCommand = 0;
    const maxLines = 12;
    
    function typeCommand() {
        // Clear if too many lines
        const lines = terminalText.children;
        if (lines.length >= maxLines) {
            terminalText.innerHTML = '';
        }
        
        if (currentCommand >= commands.length) {
            // Restart after a pause
            setTimeout(() => {
                terminalText.innerHTML = '';
                currentCommand = 0;
                typeCommand();
            }, 4000);
            return;
        }
        
        const cmd = commands[currentCommand];
        const line = document.createElement('div');
        line.classList.add('terminal-line');
        
        const prompt = document.createElement('span');
        prompt.classList.add('terminal-prompt');
        prompt.textContent = 'joshua@portfolio:~$ ';
        
        const command = document.createElement('span');
        command.classList.add('terminal-command');
        
        line.appendChild(prompt);
        line.appendChild(command);
        terminalText.appendChild(line);
        
        terminalText.scrollTop = terminalText.scrollHeight;
        
        // Type the command with realistic speed
        typeText(command, cmd.command, 80, () => {
            setTimeout(() => {
                const responseLine = document.createElement('div');
                responseLine.classList.add('terminal-response');
                
                // Handle multi-line responses
                if (cmd.response.includes('\n')) {
                    const lines = cmd.response.split('\n');
                    lines.forEach((line, index) => {
                        const lineElement = document.createElement('div');
                        lineElement.textContent = line;
                        lineElement.style.marginLeft = '0px';
                        responseLine.appendChild(lineElement);
                    });
                } else {
                    responseLine.textContent = cmd.response;
                }
                
                terminalText.appendChild(responseLine);
                terminalText.scrollTop = terminalText.scrollHeight;
                
                currentCommand++;
                setTimeout(typeCommand, 1500);
            }, 300);
        });
    }
    
    // Start the terminal animation after a brief delay
    setTimeout(typeCommand, 1500);
}

function initializeTypewriter() {
    const texts = [
        'Electrical & Computer Engineering Honors Student',
        'AI/ML Research & Cybersecurity Engineer',
        'National Cyber Scholar',
        '#1 New Release Author',
        'Tech Content Creator',
        'Global CS Non-Profit Founder',
        'Mathematics Educator',
        'Robotics Research Team Lead',
        'Technology Sales Consultant'
    ];
    
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            speed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500; // Pause before next text
        }
        
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

function initializeTypingEffects() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        setTimeout(() => {
            typeText(element, text, 80);
        }, index * 1000);
    });
}

function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}
