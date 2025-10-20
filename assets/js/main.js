// ===== Preloader =====
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  
  // Simulate loading time
  setTimeout(() => {
    preloader.classList.add('fade-out');
    
    // Remove preloader after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
      
      // Load sections with staggered animation
      loadSections();
    }, 500);
  }, 2000);
});

// ===== Section Loading Animation =====
function loadSections() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add('loaded');
    }, index * 100); // Stagger the animation
  });
}

// ===== DOM Elements =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');
const backToTopButton = document.getElementById('back-to-top');
const heroContent = document.querySelector('.hero-content');

// ===== Theme Toggle =====
// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Animate theme toggle
  themeToggle.classList.add('rotating');
  setTimeout(() => {
    themeToggle.classList.remove('rotating');
  }, 300);
  
  // Update WebGL colors if available
  if (window.webglBackground) {
    window.webglBackground.updateColors(newTheme);
  }
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Back to Top Button =====
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Active Link Highlighting =====
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  
  // Trigger scroll animations
  animateOnScroll();
});

// ===== Scroll-triggered Animations =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.scroll-animate');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
}

// Trigger animations on load
window.addEventListener('load', animateOnScroll);

// ===== 3D Tilt Effect for Hero Content =====

// ===== 3D Tilt Effect for Hero Content =====
if (heroContent) {
  heroContent.addEventListener('mousemove', (e) => {
    const rect = heroContent.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;
    
    heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  heroContent.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

// ===== Typed Text Animation =====
const roles = [
  "Python Developer",
  "AI & ML Enthusiast",
  "Full Stack Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.getElementById('typed-text');

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    // Remove characters
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add characters
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  // Set typing speed
  let typingSpeed = 100;
  
  if (isDeleting) {
    typingSpeed /= 2; // Faster when deleting
  }
  
  // If word is complete
  if (!isDeleting && charIndex === currentRole.length) {
    // Pause at end of word
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false;
    roleIndex++;
    if (roleIndex === roles.length) {
      roleIndex = 0;
    }
    typingSpeed = 500;
  }
  
  setTimeout(type, typingSpeed);
}

// Start typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typedTextElement) {
    setTimeout(type, 1000);
  }
});

// ===== Advanced WebGL Background System =====
class WebGLBackground {
  constructor() {
    this.canvas = document.getElementById('webgl-bg');
    this.setupWebGL();
    this.createScene();
    this.animate();
  }
  
  setupWebGL() {
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!this.gl) {
      console.warn('WebGL not supported, falling back to canvas');
      return;
    }
    
    // Set canvas size
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Enhanced Vertex shader with more advanced effects
    const vertexShaderSource = `
      attribute vec2 a_position;
      uniform vec2 u_resolution;
      uniform float u_time;
      varying vec2 v_texCoord;
      
      void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        v_texCoord = a_position;
      }
    `;
    
    // Enhanced Fragment shader with advanced noise functions and effects
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_colors[4];
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;
      
      // 2D Random
      float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      // 2D Noise
      float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        // Smooth Interpolation
        vec2 u = f*f*(3.0-2.0*f);
        
        // Mix 4 corners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
      }
      
      // Fractional Brownian Motion with more octaves
      float fbm (in vec2 st) {
        // Initial values
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        
        // Loop of octaves
        for (int i = 0; i < 8; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      // Voronoi pattern
      float voronoi(in vec2 x) {
        vec2 n = floor(x);
        vec2 f = fract(x);
        
        float distance = 8.0;
        for (int dy = -1; dy <= 1; dy++) {
          for (int dx = -1; dx <= 1; dx++) {
            vec2 g = vec2(dx, dy);
            vec2 o = vec2(random(n + g), random(n + g + vec2(5.2, 6.7)));
            vec2 r = g + o - f;
            float d = dot(r, r);
            distance = min(distance, d);
          }
        }
        return 1.0 - exp(-15.0 * distance);
      }
      
      void main() {
        vec2 uv = v_texCoord / u_resolution;
        uv.x *= u_resolution.x / u_resolution.y;
        
        // Time variations
        float time = u_time * 0.1;
        
        // Mouse interaction
        vec2 mouse = u_mouse / u_resolution;
        mouse.x *= u_resolution.x / u_resolution.y;
        
        // Create animated noise layers
        vec2 q = vec2(0.0);
        q.x = fbm(uv + 0.1 * time);
        q.y = fbm(uv + vec2(1.0));
        
        vec2 r = vec2(0.0);
        r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
        r.y = fbm(uv + 4.0 * q + vec2(8.3, 2.8) + 0.126 * time);
        
        // Add Voronoi pattern
        float vPattern = voronoi(uv * 5.0 + time * 0.5);
        
        // Add mouse influence
        float f = fbm(uv + r + mouse * 0.5) + vPattern * 0.3;
        
        // Create gradient colors with enhanced blending
        vec3 color = u_colors[0];
        color = mix(color, u_colors[1], smoothstep(0.0, 1.0, f));
        color = mix(color, u_colors[2], smoothstep(0.0, 1.0, f * f));
        color = mix(color, u_colors[3], smoothstep(0.0, 1.0, sqrt(f)));
        
        // Add some glow and pulsing effects
        float glow = 0.15 * sin(time * 2.0 + uv.x * 3.0) * sin(time * 3.0 + uv.y * 2.0);
        float pulse = 0.1 * sin(time * 0.5);
        color += glow * 0.3 + pulse * 0.1;
        
        // Add subtle grain for texture
        float grain = random(uv + time) * 0.05;
        color += grain;
        
        gl_FragColor = vec4(color, 0.9);
      }
    `;
    
    // Compile shaders
    this.vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    this.fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    // Create program
    this.program = this.createProgram(this.vertexShader, this.fragmentShader);
    
    // Get attribute and uniform locations
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.timeUniformLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.colorsUniformLocation = this.gl.getUniformLocation(this.program, 'u_colors');
    this.mouseUniformLocation = this.gl.getUniformLocation(this.program, 'u_mouse');
    
    // Create buffer
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    
    // Define positions for a rectangle
    const positions = [
      0, 0,
      this.canvas.width, 0,
      0, this.canvas.height,
      0, this.canvas.height,
      this.canvas.width, 0,
      this.canvas.width, this.canvas.height
    ];
    
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
    
    // Set initial colors based on theme
    this.updateColors(html.getAttribute('data-theme') || 'light');
    
    // Mouse position tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
  }
  
  compileShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }
  
  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program linking error:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }
  
  resize() {
    if (!this.gl) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  
  updateColors(theme) {
    if (!this.gl) return;
    
    if (theme === 'dark') {
      this.colors = [
        [0.05, 0.09, 0.16], // Dark blue
        [0.40, 0.28, 0.85], // Purple
        [0.50, 0.15, 0.65], // Magenta
        [0.15, 0.65, 0.95]  // Blue
      ];
    } else {
      this.colors = [
        [0.95, 0.96, 0.98], // Light
        [0.40, 0.28, 0.85], // Purple
        [0.50, 0.15, 0.65], // Magenta
        [0.15, 0.65, 0.95]  // Blue
      ];
    }
  }
  
  createScene() {
    if (!this.gl) return;
    
    this.startTime = Date.now();
  }
  
  render() {
    if (!this.gl) return;
    
    // Clear canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    // Use program
    this.gl.useProgram(this.program);
    
    // Set resolution
    this.gl.uniform2f(this.resolutionUniformLocation, this.canvas.width, this.canvas.height);
    
    // Set time
    const currentTime = (Date.now() - this.startTime) / 1000;
    this.gl.uniform1f(this.timeUniformLocation, currentTime);
    
    // Set mouse position
    this.gl.uniform2f(this.mouseUniformLocation, this.mouseX, this.mouseY);
    
    // Set colors
    this.gl.uniform3fv(this.colorsUniformLocation, new Float32Array(this.colors.flat()));
    
    // Set position attribute
    this.gl.enableVertexAttribArray(this.positionAttributeLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    
    // Draw
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  
  animate() {
    this.render();
    requestAnimationFrame(() => this.animate());
  }
}

// ===== Initialize Advanced Features =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize WebGL background if supported
  try {
    window.webglBackground = new WebGLBackground();
  } catch (e) {
    console.warn('WebGL initialization failed, falling back to canvas:', e);
  }
  
  // Initialize particles.js
  initParticles();
  
  console.log('Advanced portfolio loaded with professional WebGL background and particle effects');
});

// ===== Particles.js Implementation =====
function initParticles() {
  const particlesContainer = document.getElementById('particles-js');
  if (!particlesContainer) return;
  
  // Create canvas for particles
  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  particlesContainer.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = particlesContainer.clientWidth;
    canvas.height = particlesContainer.clientHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#667eea';
      this.opacity = Math.random() * 0.5 + 0.5;
    }
    
    update() {
      // Move particles
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Boundary check with wrap-around
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  // Create particles
  function initParticlesArray() {
    particles = [];
    const numberOfParticles = (canvas.width * canvas.height) / 3000;
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
  }
  
  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  // Initialize and start animation
  initParticlesArray();
  animateParticles();
  
  // Reinitialize on resize
  window.addEventListener('resize', initParticlesArray);
}

// ===== Skill Bars Animation =====
// Removed as per user request

// Trigger animation on scroll
// Removed as per user request

// Trigger animation on load
// Removed as per user request

// ===== Project Card Interactions =====
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const detailsBtn = card.querySelector('.project-details-btn');
    
    // Add hover effect to card
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    // Add click event to details button
    detailsBtn.addEventListener('click', function() {
      const projectId = card.getAttribute('data-project-id');
      showProjectDetails(projectId);
    });
  });
});

// Function to show project details (modal or expanded view)
function showProjectDetails(projectId) {
  // In a real implementation, this would show a modal with detailed project information
  // For now, we'll just show an alert with the project ID
  alert(`Showing details for project #${projectId}. In a full implementation, this would show a detailed modal.`);
}

// ===== Certificate Modal Functionality =====
document.addEventListener('DOMContentLoaded', function() {
  // Get all certification images
  const certificationImages = document.querySelectorAll('.certification-image');
  
  // Get all view certificate buttons in workshops
  const viewCertificateBtns = document.querySelectorAll('.view-certificate-btn');
  
  // Create modal HTML dynamically
  const modalHTML = `
    <div id="certificateModal" class="certificate-modal">
      <span class="certificate-modal-close">&times;</span>
      <div class="certificate-modal-content">
        <img class="certificate-modal-image" id="certificateModalImage" src="" alt="Certificate">
        <h2 class="certificate-modal-title" id="certificateModalTitle"></h2>
        <p class="certificate-modal-issuer" id="certificateModalIssuer"></p>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Get modal elements
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('certificateModalImage');
  const modalTitle = document.getElementById('certificateModalTitle');
  const modalIssuer = document.getElementById('certificateModalIssuer');
  const modalClose = document.querySelector('.certificate-modal-close');
  
  // Add click event listeners to certification images
  certificationImages.forEach(img => {
    img.addEventListener('click', function() {
      const certSrc = this.getAttribute('data-certificate');
      const altText = this.getAttribute('alt');
      
      // Extract title and issuer from alt text
      // Format: "Certificate Title from Issuer" or similar
      let title = altText.replace(' Certificate', '');
      let issuer = 'Certificate';
      
      // Try to extract issuer from alt text
      if (altText.includes(' from ')) {
        [title, issuer] = altText.split(' from ');
      } else if (altText.includes(' Certificate')) {
        title = altText.replace(' Certificate', '');
        issuer = altText.match(/Certificate from ([^.]*)/)?.[1] || 'Provider';
      } else {
        // If we can't extract properly, use the whole alt text as title
        title = altText;
      }
      
      modalImg.src = certSrc;
      modalTitle.textContent = title;
      modalIssuer.textContent = issuer;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
  
  // Add click event listeners to view certificate buttons in workshops
  viewCertificateBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const certSrc = this.getAttribute('data-certificate');
      
      // For workshops, we'll set a default title and issuer
      modalImg.src = certSrc;
      modalTitle.textContent = 'Hack the verse Hackathon';
      modalIssuer.textContent = 'CMR Technical Campus';
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
  
  // Close modal when clicking on close button
  modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Allow scrolling again
  });
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Allow scrolling again
    }
  });
  
  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Allow scrolling again
    }
  });
});
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      // Form submission (in a real app, you would send this to a server)
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}