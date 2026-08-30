import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';

// ===== GEMINI API KEY =====
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const KB = {
  projects: "Malik has built <b>QR Kavach</b> (Laravel + React vehicle QR identity system with JWT auth &amp; real-time alerts), <b>SmartQueue</b> (Spring Boot + React AI-ready queue system), a <b>real-time chat app</b> (Socket.IO + MongoDB) and an <b>AI Image Studio</b> using Stable Diffusion XL.",
  journey: "Malik completed his <b>MCA at AICAIT Pune</b> (2024–2026, CGPA 9.00) after a <b>BBACA at Abeda Inamdar Senior College</b> (2021–2024, CGPA 8.379). Alongside, he did a React.js internship at The Entrepreneurship Network with LOR.",
  skills: "Core toolkit: <b>Java, React.js, Node.js, MySQL, JWT auth, Git, GitHub, CI/CD, Kubernetes,  Agile Methodologies, Socket.IO.</b>",
  certifications: "Malik holds certifications in: <b>Oracle Certified Professional (Java SE)</b>, <b>AWS Certified Cloud Practitioner</b>, <b>Google IT Support Professional Certificate</b>, <b>Meta Backend Developer Certificate</b>, and academic certifications in DSA, Web Dev, and DBMS.",
  contact: "You can reach Malik via <b>LinkedIn (linkedin.com/in/malikahmad17)</b> or check his work on <b>GitHub (github.com/MalikAhmad-17)</b>. <b>demo: https://ai-image-studio-chi.vercel.app</b>. Based in Pune, Maharashtra."
};

// ===== PROJECTS DATA =====
const PROJECTS = {
  'proj-qr': {
    id: 'proj-qr',
    title: 'QR Kavach',
    tagline: 'QR-based Vehicle Identity & Safety System',
    description: 'Complete vehicle identity verification and safety ecosystem with QR codes, smart cards, alerts system, and admin panel.',
    
    introduction: `QR Kavach is a web-based application developed to provide a seamless and efficient way to manage, generate, and scan QR codes for vehicle identity verification. With the advancement of technology and increased need for smart surveillance and tracking, traditional manual vehicle registration methods have become outdated. This system bridges the gap by offering a digital solution that is fast, reliable, and user-friendly.`,
    
    scope: `The system is designed to meet the needs of both administrators and end users. It can be used by Residential societies and parking authorities, Government vehicle departments, and Individual vehicle owners.`,
    
    objectives: [
      'To automate the QR code generation process',
      'To provide real-time access to vehicle information',
      'To reduce manual effort and errors',
      'To ensure secure data handling',
      'To improve operational satisfaction',
      'To provide an efficient management system for administrators'
    ],
    
    modules: [
      'Authentication Module - Handles user registration and login via JWT',
      'Admin Module - Manages vehicle records, controls user data, monitors QR scan activity',
      'Vehicle Management Module - Stores, updates, and deletes vehicle records',
      'QR Code Module - Generates unique QR codes per vehicle, validates QR codes on scan',
      'Scan Module - Handles QR code scan requests via public API',
      'Database Module - Stores all system data, ensures data integrity'
    ],
    
    futureEnhancements: [
      'Dedicated mobile application for Android and iOS',
      'Real-time CCTV integration and IoT-based automatic QR scanning',
      'GPS-based vehicle tracking feature',
      'AI-based anomaly detection',
      'Two-factor authentication (2FA)',
      'Email and SMS notifications',
      'Cloud deployment on AWS or Azure'
    ],
    
    conclusion: `QR Kavach is a practical and scalable solution that meets the basic requirements of QR-based vehicle identification. With further improvements and advanced features, it can be developed into a fully functional commercial application.`,

    images: [
      '/images/qr-kavach/dashboard.png',
      '/images/qr-kavach/dashboard1.png',
      '/images/qr-kavach/vehicles.png',
      '/images/qr-kavach/qr-codes.png',
      '/images/qr-kavach/qr-codes1.png',
      '/images/qr-kavach/alerts.png',
      '/images/qr-kavach/user_dashboard.png',
      '/images/qr-kavach/smart_cards.png',
      '/images/qr-kavach/fuel_Price.png',
      '/images/qr-kavach/smart-cards1.png',
      '/images/qr-kavach/send_alert.png',
      '/images/qr-kavach/edit_vehicle.png',
      '/images/qr-kavach/coupons.png',
      '/images/qr-kavach/documents.png'
    ],
    
    diagrams: [
      { name: 'E-R Diagram', src: '/images/qr-kavach/diagrams/e-r_diagram.png' },
      { name: 'DFD Level 0', src: '/images/qr-kavach/diagrams/dfd_level_0.png' },
      { name: 'DFD Level 1', src: '/images/qr-kavach/diagrams/dfd_level_1.png' },
      { name: 'System Architecture', src: '/images/qr-kavach/diagrams/system_architecture.png' },
      { name: 'Flow Chart', src: '/images/qr-kavach/diagrams/flow_chart.png' },
      { name: 'Use Case Diagram', src: '/images/qr-kavach/diagrams/use_case_diagram.png' },
      { name: 'Activity Diagram', src: '/images/qr-kavach/diagrams/activity_diagram.png' },
      { name: 'Sequence Diagram', src: '/images/qr-kavach/diagrams/sequence_diagram.png' },
      { name: 'Component Diagram', src: '/images/qr-kavach/diagrams/component_diagram.png' },
      { name: 'Deployment Diagram', src: '/images/qr-kavach/diagrams/deployment_diagram.png' }
    ],
    
    techStack: ['React.js', 'Laravel', 'MySQL', 'JWT', 'Tailwind CSS', 'Vite'],
    
    features: [
      'Vehicle QR Code Generation & Management',
      'Smart Card Digital Identity System with QR',
      'Real-time Vehicle Alerts (No Parking, Accident, Lights ON, Window Open, Emergency)',
      'Admin Dashboard with Complete Control',
      'City-wise Fuel Price Management',
      'Product Ordering (QR Stickers, Smart Cards)',
      'Document Upload (RC, License, Insurance)',
      'Coupon Management System with Discount Codes',
      'Multi-Role Access (Super Admin, Sub Admin, Users)',
      'OTP-based Authentication',
      'JWT Secure Authentication',
      'Reports & Logs Management',
      'Banner Management for App Home/Offers',
      'FAQ Management with Categories',
      'State/City/Location Masters'
    ],
    
    links: {
      github: 'https://github.com/MalikAhmad-17/qr-kavach'
    }
  },
  
  'proj-queue': {
    id: 'proj-queue',
    title: 'SmartQueue',
    tagline: 'AI-ready Real-time Queue Management',
    description: 'Real-time queue management system with AI-ready capabilities and multi-role UI.',
    longDescription: 'SmartQueue is an AI-ready real-time queue management system designed for businesses to manage customer queues efficiently. Features include multi-role dashboard, AI-powered wait time predictions, analytics, and customer notifications.',
    images: ['/images/smartqueue/Working_smartqueue.jpg'],
    diagrams: [],
    techStack: ['Spring Boot', 'React', 'PostgreSQL', 'Redis'],
    features: [
      'Real-time queue management',
      'Multi-role dashboard (Admin, User, Support)',
      'AI-powered wait time predictions',
      'Analytics and reporting',
      'Customer notifications'
    ],
    links: {
      github: 'https://github.com/MalikAhmad-17/smartqueue'
    }
  },
  
  'proj-chat': {
    id: 'proj-chat',
    title: 'Real-time Chat App',
    tagline: 'Live Messaging Platform',
    description: 'Socket-based live messaging with JWT-secured sessions and persistent chat history.',
    longDescription: 'A complete real-time chat application built with Socket.IO, featuring JWT authentication, chat history persistence in MongoDB, and online/offline status.',
    images: ['/images/chat-app/Working_real_time_chat.jpg'],
    diagrams: [],
    techStack: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    features: [
      'Real-time messaging with Socket.IO',
      'JWT authentication and session management',
      'Chat history persistence in MongoDB',
      'Online/offline user status',
      'Typing indicators'
    ],
    links: {
      github: 'https://github.com/MalikAhmad-17/chat-app'
    }
  },
  
  'proj-image': {
  id: 'proj-image',
  title: 'Darkroom Studio',
  tagline: 'AI Image Studio — Real Darkroom Experience',
  description: 'AI-powered text-to-image generation app with 5 film rolls, real darkroom feel, and professional editing tools.',
  
  introduction: `Darkroom Studio is an AI-powered image generation web application that replicates the real darkroom experience. Users write prompts (like "a girl in a cyberpunk city"), AI generates images, and the process gives a film developing feel. Multiple styles/rolls are available including Realistic, Anime, 3D, Oil Paint, and Custom. The application uses Pollinations.ai API for free image generation with no API key required.`,
  
  scope: `The application is designed for AI enthusiasts, designers, photographers, developers, and students. It provides a professional darkroom theme with 5 unique film rolls, developing animation, spot retouch, loupe zoom, and mobile responsiveness — all without requiring any API key.`,
  
  objectives: [
    'To provide a real darkroom experience for AI image generation',
    'To offer 5 different film rolls/styles (Realistic, Anime, 3D, Oil Paint, Custom)',
    'To include professional editing tools (retouch, grain, exposure control)',
    'To be completely free with no API key required',
    'To deliver a professional UI with animations',
    'To make AI image generation accessible to everyone'
  ],
  
  modules: [
    'Image Generation Module - Text-to-image using Pollinations.ai API',
    'Film Roll Module - 5 different styles with unique outputs',
    'Developing Animation - Real darkroom developing feel',
    'Spot Retouch Module - Simple click + prompt fix',
    'Loupe Zoom Module - Grain-level inspection',
    'Exposure Control Module - Adjust image brightness and contrast',
    'Gallery Module - Save and manage generated images'
  ],
  
  futureEnhancements: [
    'User Accounts - Save images and history',
    'Better AI APIs - Replicate, DALL-E, Stable Diffusion integration',
    'Social Sharing - Instagram, Twitter share',
    'Image Editing - Crop, filter, resize',
    'Video Generation - AI video generation',
    'Custom Models - Fine-tuned AI models',
    'Collaboration - Multi-user editing'
  ],
  
  conclusion: `Darkroom Studio is a complete, professional, free AI image generator that delivers a real darkroom experience. It's the perfect combination of React, AI APIs, and UI/UX design, making it an ideal tool for creative professionals and AI enthusiasts.`,
  
  
  images: [
    '/images/AI-IMAGE_STUDIO/dashboard.png',
    '/images/AI-IMAGE_STUDIO/image-generation.png',
    '/images/AI-IMAGE_STUDIO/dodge-and-burn-prompting.png',
    '/images/AI-IMAGE_STUDIO/exposure.png',
    '/images/AI-IMAGE_STUDIO/loupe-review.png',
    '/images/AI-IMAGE_STUDIO/retouch.png',
    '/images/AI-IMAGE_STUDIO/your-gallery.png'
  ],
  
  diagrams: [
    { name: 'Activity Diagram', src: '/images/AI-IMAGE_STUDIO/diagrams/activity_diagram.png' },
    { name: 'Class Diagram', src: '/images/AI-IMAGE_STUDIO/diagrams/class_diagram.png' },
    { name: 'Component Diagram', src: '/images/AI-IMAGE_STUDIO/diagrams/component_diagram.png' },
    { name: 'Sequence Diagram', src: '/images/AI-IMAGE_STUDIO/diagrams/sequence_diagram.png' },
    { name: 'Use Case Diagram', src: '/images/AI-IMAGE_STUDIO/diagrams/usecase_diagram.png' }
  ],
  
  techStack: ['React 18 + Vite', 'Pollinations.ai API', 'CSS3', 'Axios', 'Lucide React'],
  
  features: [
    'Text-to-image generation using Stable Diffusion XL',
    'Multiple image generation styles',
    'Image download and share functionality',
    'Prompt history and favorites',
    'Responsive UI design',
    'Fast and efficient image generation',
    'Customizable generation parameters',
    'Modern and intuitive interface'
  ],
  
  links: {
    demo: 'https://ai-image-studio-chi.vercel.app',
    github: 'https://github.com/MalikAhmad-17/ai-image-studio'
  }
}
};

// ===== ACADEMIC JOURNEY DATA =====
const ACADEMIC_DATA = [
  {
    id: 'mca',
    year: '2024-2026',
    title: 'MCA · AICAIT Pune',
    subtitle: 'Dr. P.A. Inamdar University',
    icon: '🎓',
    color: '#007aff',
    cgpa: '9.00',
    details: [
      'CGPA: 9.00',
      'Specialization: Computer Applications',
      'Key Subjects: Advanced Web Development, AI/ML, Cloud Computing',
      'Major Projects: QR Kavach, SmartQueue'
    ],
    tags: ['MCA', 'CGPA 9.00', '2026 Batch'],
    documents: [
      { name: 'Semester 4 Marksheet', file: '/documents/mca/MCA Sem 4.jpg' }
    ]
  },
  {
    id: 'bbaca',
    year: '2021-2024',
    title: 'BBACA · Abeda Inamdar Senior College',
    subtitle: 'Bachelor of Business Administration in Computer Applications',
    icon: '🎓',
    color: '#5e5ce6',
    cgpa: '8.379',
    details: [
      'Overall CGPA: 8.379',
      'Semester 5: 8.636',
      'Semester 6: 7.680',
      'Foundations: Programming (C, C++, Java), Web Development, DBMS'
    ],
    tags: ['BBACA', 'CGPA 8.379', '2024 Batch'],
    documents: [
      { name: 'Semester 5 & 6 Marksheet', file: '/documents/bca/sem5-&-sem6.jpg' },
      { name: 'Degree Certificate', file: '/documents/bca/degree.jpg' },
      { name: 'Passing Certificate', file: '/documents/bca/BBACA Passing certificate.jpg' }
    ]
  },
  {
    id: 'internship',
    year: 'Internship',
    title: 'React.js Developer',
    subtitle: 'The Entrepreneurship Network',
    icon: '💼',
    color: '#30b0c7',
    details: [
      'Worked on React.js frontend development',
      'Built responsive UI components',
      'Integrated REST APIs',
      'Collaborated with team on project delivery'
    ],
    tags: ['React.js', 'Internship', 'LOR Available'],
    documents: [
      { name: 'Letter of Recommendation (LOR)', file: '/documents/internship/LOR Internship.jpg' },
      { name: 'Letter of Completion (LOC)', file: '/documents/internship/LOC Internship.jpg' }
    ]
  },
  {
    id: 'certifications',
    year: 'Certifications',
    title: 'Professional Certifications',
    subtitle: 'Oracle & Industry Recognized Certificates',
    icon: '📜',
    color: '#ff9500',
    isCertification: true,
    certifications: [
      'Capgemini Full Stack Java',
      'Oracle Developer Associate',
      'Oracle DevOps Professional',
      'Oracle Gen AI Professional',
      'Oracle Networking Professional',
      'Oracle Observability Professional',
      'English Spoken',
      'IT & Management Certification',
      'Poetry-cum-Shayri Certification',
      'Rummage Hunt Certification'
    ],
    tags: ['10+ Certifications', 'Oracle', 'Professional'],
    documents: [
      { name: 'Capgemini Full Stack Java', file: '/documents/certifications/Capgemini-Full-Stack-Java.jpg' },
      { name: 'Oracle Developer Associate', file: '/documents/certifications/Oracle-Developer-Associate.jpg' },
      { name: 'Oracle DevOps Professional', file: '/documents/certifications/Oracle-DevOps-Professional.jpg' },
      { name: 'Oracle Gen AI Professional', file: '/documents/certifications/Oracle-Gen-Ai-Professional.jpg' },
      { name: 'Oracle Networking Professional', file: '/documents/certifications/Oracle-Networking-Professional.jpg' },
      { name: 'Oracle Observability Professional', file: '/documents/certifications/Oracle-Observability-Professional.jpg' },
      { name: 'English Spoken', file: '/documents/certifications/english-spoken.jpg' },
      { name: 'IT & Management Certification', file: '/documents/certifications/IT-Management-certification-of-app.jpg' },
      { name: 'Poetry-cum-Shayri Certification', file: '/documents/certifications/Poetry-cum-shayri-certification-of-app.jpg' },
      { name: 'Rummage Hunt Certification', file: '/documents/certifications/certification-of-App-Rummage-hunt.jpg' }
    ]
  }
];

export default function App() {
  const heroCanvasRef = useRef(null);
  const cardCanvasRefs = useRef({});
  const [askOpen, setAskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answerKey, setAnswerKey] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('screenshots');
  const [expandedId, setExpandedId] = useState('mca');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState(null);
  const [lightboxDownloadUrl, setLightboxDownloadUrl] = useState(null);
  
  const [showProjectImages, setShowProjectImages] = useState(false);
  const [projectImages, setProjectImages] = useState([]);
  const [projectDiagrams, setProjectDiagrams] = useState([]);
  
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [showDiagramGallery, setShowDiagramGallery] = useState(false);
  const [diagramItems, setDiagramItems] = useState([]);

  // Apply theme SYNC before paint (fixes hero/sections showing wrong theme colors)
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  // ===== OPEN LIGHTBOX =====
  function openLightbox(src, title, downloadUrl) {
    if (!src) {
      console.error('❌ No image source provided');
      return;
    }
    setLightboxImage(src);
    setLightboxTitle(title || 'Document');
    setLightboxDownloadUrl(downloadUrl || src);
    document.body.style.overflow = 'hidden';
  }

  // ===== CLOSE LIGHTBOX =====
  function closeLightbox() {
    setLightboxImage(null);
    setLightboxTitle(null);
    setLightboxDownloadUrl(null);
    document.body.style.overflow = 'auto';
  }

  function toggleAccordion(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  // ===== LOCAL FALLBACK RESPONSE =====
  function getLocalResponse(query) {
    const lower = query.toLowerCase();
    
    if (lower.includes('qr kavach')) {
      return 'QR Kavach is a vehicle QR identity verification system built with Laravel + React + MySQL + JWT. Features: JWT authentication, OTP login, admin panel, real-time alerts, auto QR generation.';
    }
    
    if (lower.includes('smartqueue')) {
      return 'SmartQueue is an AI-ready real-time queue management system built with Spring Boot + React + PostgreSQL + Redis. Features: Multi-role dashboard, AI-powered wait time predictions, analytics, customer notifications.';
    }
    
    if (lower.includes('chat app') || lower.includes('real-time chat')) {
      return 'Real-time Chat App is a live messaging platform built with React + Node.js + Socket.IO + MongoDB. Features: Real-time messaging, JWT authentication, chat history, online/offline status.';
    }
    
    if (lower.includes('ai image studio') || lower.includes('image studio')) {
      return 'AI-powered image generation app with 5 film rolls, real darkroom feel, and professional editing tools — completely free!.';
    }
    
    if (lower.includes('project')) {
      return 'Malik has built <b>QR Kavach</b> (Laravel + React vehicle QR identity system), <b>SmartQueue</b> (Spring Boot + React queue management), a <b>real-time chat app</b> (Socket.IO + MongoDB), and an <b>AI Image Studio</b> (Stable Diffusion XL).';
    }
    
    if (lower.includes('internship')) {
      return 'Malik did his <b>React.js internship at The Entrepreneurship Network</b>. He worked on React.js frontend development, built responsive UI components, integrated REST APIs, and collaborated with the team on project delivery.';
    }
    
    if (lower.includes('oracle')) {
      return 'Malik has the following Oracle certifications: <b>Oracle Developer Associate, Oracle DevOps Professional, Oracle Gen AI Professional, Oracle Networking Professional, and Oracle Observability Professional.</b>';
    }
    
    if (lower.includes('capgemini')) {
      return 'Malik has a <b>Capgemini Full Stack Java</b> certification.';
    }
    
    if (lower.includes('certification') || lower.includes('certificate')) {
      return 'Malik holds certifications in: <b>Oracle (5 certifications), Capgemini Full Stack Java, English Spoken, IT & Management, Poetry-cum-Shayri, and Rummage Hunt.</b>';
    }
    
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      return 'Malik\'s core toolkit includes: <b>PHP/Laravel, React.js, Spring Boot, MySQL, JWT auth, Python, Android Dev, Node.js, and Socket.IO.</b>';
    }
    
    if (lower.includes('journey') || lower.includes('academic') || lower.includes('college') || lower.includes('mca')) {
      return 'Malik completed his <b>MCA at AICAIT Pune</b> (2024–2026, CGPA 9.00) after a <b>BBACA at Abeda Inamdar Senior College</b> (2021–2024, CGPA 8.379). He also did a React.js internship at The Entrepreneurship Network.';
    }
    
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
      return 'Please visit the <b>Contact section</b> on the portfolio for contact details.';
    }
    
    return 'I can answer questions about Malik\'s <b>projects, skills, academic journey, certifications, and internship</b>. What would you like to know?';
  }

  // ===== GEMINI API FUNCTION =====
  async function getGeminiResponse(query) {
    if (!query || query.trim() === '') {
      return 'Please ask something about Malik.';
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'undefined' || GEMINI_API_KEY === '') {
      console.warn('⚠️ Gemini API key not configured, using fallback response.');
      return getLocalResponse(query);
    }

    const model = 'gemini-pro';
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful assistant for Malik's portfolio website. 
Answer questions ONLY about Malik's portfolio based on the information provided below.

Here is the ONLY information you have about Malik:

============================================================
PROJECTS:
============================================================
1. QR Kavach: A vehicle QR identity verification system built with Laravel + React + MySQL + JWT.
   Features: JWT authentication, OTP login, admin panel, real-time alerts, auto QR generation.
   Role: Full Stack Developer

2. SmartQueue: An AI-ready real-time queue management system built with Spring Boot + React + PostgreSQL + Redis.
   Features: Multi-role dashboard, AI-powered wait time predictions, analytics, customer notifications.
   Role: Full Stack Developer

3. Real-time Chat App: A live messaging platform built with React + Node.js + Socket.IO + MongoDB.
   Features: Real-time messaging, JWT authentication, chat history, online/offline status.
   Role: Full Stack Developer

4. AI Image Studio: AI-powered text-to-image generation app with 5 film rolls, real darkroom feel, and professional editing tools.
   Features: AI-powered text-to-image generation using Pollinations.ai API,
    5 Film Rolls — Realistic, Anime, 3D, Oil Paint, and Custom,
    Real Darkroom Experience — Film developing animation,
    Spot Retouch — Click + prompt fix,
    Loupe Zoom — Grain-level inspection,
    Exposure Control — Adjust brightness & contrast,
    Prompt History — Save and reuse your prompts,
    Image Download & Share — Export your creations,
    Your Gallery — All generated images in one place,
    No API Key Required — Completely free,
    Mobile Responsive — Works on all devices,
    Pure Custom CSS — No UI library dependencies.
   Role: Full Stack Developer

============================================================
INTERNSHIP:
============================================================
Company: The Entrepreneurship Network
Role: React.js Developer
Duration: Internship
Work Done:
- Worked on React.js frontend development
- Built responsive UI components
- Integrated REST APIs
- Collaborated with team on project delivery
- Learned industry best practices

============================================================
SKILLS:
============================================================
Java, JavaScript,  React.js, Node.js, MySQL, JWT authentication,  Socket.IO, CI/CD, Git, GitHub, Kubernetes, Tailwind CSS
Plus: Event Management, Team Leadership, Sports Strategy, Vlogging, Video Editing

============================================================
EDUCATION:
============================================================
1. MCA from AICAIT Pune (2024-2026, CGPA 9.00)
2. BBACA from Abeda Inamdar Senior College (2021-2024, CGPA 8.379)
   - Semester 5: 8.636
   - Semester 6: 7.680

============================================================
CERTIFICATIONS:
============================================================
Professional Certifications:
1. Oracle Developer Associate
2. Oracle DevOps Professional
3. Oracle Gen AI Professional
4. Oracle Networking Professional
5. Oracle Observability Professional
6. Capgemini Full Stack Java
7. English Spoken
8. IT & Management Certification
9. Poetry-cum-Shayri Certification
10. Rummage Hunt Certification

============================================================
SPORTS ACHIEVEMENTS:
============================================================
- Overall Champions in University Sports Day 2025
- Won Cricket 🏏, Kabaddi 🤼, and Football ⚽
- First time in university history!

============================================================
TRIP MANAGEMENT:
============================================================
- Planned and managed Mahabaleshwar trip for 40+ classmates
- Handled bus booking, resort selection, consent forms, payments, budget
- Created 2 vlogs: "Aak Yaadgar College Trip" and "Maybe Last Trip"

============================================================
IMPORTANT RULES:
============================================================
1. ONLY answer questions about Malik's projects, skills, education, certifications, and internship.
2. If someone asks about contact info, say: "Please visit the Contact section on the portfolio."
3. For certification questions, list all certifications from the list above.
4. For specific certification questions (e.g., Oracle), list only Oracle certifications.
5. For internship questions, provide detailed internship information.
6. For project questions, provide detailed project information from the list above.
7. Be helpful and accurate. Use information only from the data provided above.
8. If you don't know the answer, say: "I can only answer questions about Malik's projects, skills, education, certifications, and internship."`
                  },
                  {
                    text: `User asked: ${query}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 300,
            }
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.warn('⚠️ Model error:', data.error.message);
        return getLocalResponse(query);
      }
    } catch (error) {
      console.warn('⚠️ Model failed:', error.message);
      return getLocalResponse(query);
    }

    return getLocalResponse(query);
  }

  // ===== RUN ASK =====
  async function runAsk(q) {
    if (!q || q.trim() === '') {
      setLightboxTitle('⚠️ Please type a question first.');
      setAnswerKey('gemini');
      return;
    }

    setIsLoading(true);
    setAnswerKey(null);
    setLightboxTitle('Thinking... 🤔');
    setShowProjectImages(false);
    setProjectImages([]);
    setProjectDiagrams([]);

    try {
      const response = await getGeminiResponse(q);
      setLightboxTitle(response);
      setAnswerKey('gemini');
      
      const lower = q.toLowerCase();
      if (lower.includes('qr kavach')) {
        setProjectImages(PROJECTS['proj-qr']?.images || []);
        setProjectDiagrams(PROJECTS['proj-qr']?.diagrams || []);
        setShowProjectImages(true);
      } else if (lower.includes('smartqueue')) {
        setProjectImages(PROJECTS['proj-queue']?.images || []);
        setShowProjectImages(true);
      } else if (lower.includes('chat app') || lower.includes('real-time chat')) {
        setProjectImages(PROJECTS['proj-chat']?.images || []);
        setShowProjectImages(true);
      } else if (lower.includes('ai image') || lower.includes('image studio')) {
        setProjectImages(PROJECTS['proj-image']?.images || []);
        setProjectDiagrams(PROJECTS['proj-image']?.diagrams || []);
        setShowProjectImages(true);
      }
      
      if (lower.includes('certification') || lower.includes('certificate')) {
        const certData = ACADEMIC_DATA.find(item => item.isCertification === true);
        if (certData && certData.documents) {
          setProjectImages(certData.documents.map(doc => doc.file));
          setShowProjectImages(true);
        }
      }
      
    } catch (error) {
      console.error('❌ runAsk Error:', error);
      const fallback = getLocalResponse(q);
      setLightboxTitle(fallback);
      setAnswerKey('gemini');
    } finally {
      setIsLoading(false);
    }
  }

  // ===== HANDLE SEND =====
  function handleSend() {
    if (!searchQuery.trim()) {
      setLightboxTitle('⚠️ Please type a question first.');
      setAnswerKey('gemini');
      return;
    }
    runAsk(searchQuery);
  }

  // ===== HANDLE ENTER KEY =====
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  // ===== CLOSE ASK PANEL =====
  function closeAskPanel() {
    setAskOpen(false);
    setAnswerKey(null);
    setSearchQuery('');
    setIsLoading(false);
  }

  // ===== Unified 3D canvas manager (hero + all cards) — DESKTOP ONLY =====
  // These wireframe animations are purely decorative. On mobile they've
  // proven unreliable across different phones/Chrome builds even with a
  // context cap + LRU eviction + auto-recovery (all three of which are
  // still in place below, for desktop). Rather than keep chasing
  // device-specific GPU quirks, we simply never touch WebGL on small
  // viewports — no context is ever created there, so there's nothing left
  // to break on scroll. Desktop keeps the full animation.
  useEffect(() => {
    if (window.innerWidth < 768) return; // mobile: skip entirely, nothing to init or clean up

    const MAX_LIVE = 6; // stay well under mobile's ~8 context ceiling
    const active = new Map(); // canvas -> { dispose(), type }

    function disposeEntry(canvas) {
      const entry = active.get(canvas);
      if (!entry) return;
      try { entry.dispose(); } catch (e) { /* already gone, ignore */ }
      active.delete(canvas);
    }

    function evictOldestIfNeeded() {
      if (active.size < MAX_LIVE) return;
      const oldestCanvas = active.keys().next().value;
      if (oldestCanvas) disposeEntry(oldestCanvas);
    }

    function touch(canvas) {
      // Re-insert at the end of the Map so it counts as "most recently used"
      // for LRU eviction purposes.
      const entry = active.get(canvas);
      if (entry) {
        active.delete(canvas);
        active.set(canvas, entry);
      }
    }

    function initHero(canvas) {
      const section = canvas.closest('.hero');
      if (!section) return null;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch (e) {
        console.warn('⚠️ Hero WebGL context failed to init:', e);
        return null;
      }
      const scene = new THREE.Scene();

      const isMobile = window.innerWidth < 600;
      const camera = new THREE.PerspectiveCamera(50, section.clientWidth / section.clientHeight, 0.1, 100);
      camera.position.set(isMobile ? 0.5 : 0, isMobile ? 0.2 : 0, isMobile ? 5.5 : 7);
      camera.lookAt(0, 0, 0);

      function resize() {
        renderer.setSize(section.clientWidth, section.clientHeight);
        camera.aspect = section.clientWidth / section.clientHeight;
        camera.updateProjectionMatrix();
      }
      resize();

      const geo = new THREE.IcosahedronGeometry(1.6, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x007aff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      if (isMobile) {
        mesh.position.set(1.2, 0.3, -0.5);
        mesh.scale.set(1.0, 1.0, 1.0);
      } else {
        mesh.position.set(3.2, 0.4, -1);
      }
      scene.add(mesh);

      const geo2 = new THREE.IcosahedronGeometry(0.8, 0);
      const mat2 = new THREE.MeshBasicMaterial({
        color: 0x5e5ce6,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const mesh2 = new THREE.Mesh(geo2, mat2);
      if (isMobile) {
        mesh2.position.set(0.8, -0.8, -1.2);
      } else {
        mesh2.position.set(2.0, -1.6, -1.5);
      }
      scene.add(mesh2);

      const pCount = isMobile ? 50 : 90;
      const positions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const range = isMobile ? 4 : 9;
        positions[i * 3] = (Math.random() - 0.5) * range;
        positions[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 2.5 : 6);
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x007aff,
        size: isMobile ? 0.035 : 0.03,
        transparent: true,
        opacity: 0.25
      });
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      function handleResize() {
        const mobile = window.innerWidth < 600;
        camera.position.set(0, 0, mobile ? 5.5 : 7);
        camera.lookAt(0, 0, 0);
        if (mobile) {
          mesh.position.set(1.2, 0.3, -0.5);
          mesh.scale.set(1.0, 1.0, 1.0);
          mesh2.position.set(0.8, -0.8, -1.2);
        } else {
          mesh.position.set(3.2, 0.4, -1);
          mesh.scale.set(1, 1, 1);
          mesh2.position.set(2.0, -1.6, -1.5);
        }
        resize();
      }
      window.addEventListener('resize', handleResize);

      let frameId;
      function animate() {
        frameId = requestAnimationFrame(animate);
        mesh.rotation.y += 0.0022;
        mesh.rotation.x += 0.001;
        mesh2.rotation.y -= 0.0026;
        points.rotation.y += 0.0005;
        renderer.render(scene, camera);
      }
      animate();

      return {
        type: 'hero',
        dispose() {
          cancelAnimationFrame(frameId);
          window.removeEventListener('resize', handleResize);
          renderer.dispose();
        }
      };
    }

    function initCard(canvas) {
      try {
        const color = new THREE.Color(canvas.dataset.color || '#007aff');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setSize(100, 100, false);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
        camera.position.z = 4;

        const geo = new THREE.OctahedronGeometry(1.1, 0);
        const mat = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        let frameId;
        function animate() {
          frameId = requestAnimationFrame(animate);
          mesh.rotation.x += 0.005;
          mesh.rotation.y += 0.008;
          renderer.render(scene, camera);
        }
        animate();

        return {
          type: 'card',
          dispose() {
            cancelAnimationFrame(frameId);
            renderer.dispose();
          }
        };
      } catch (e) {
        console.warn('⚠️ Card WebGL context failed to init:', e);
        return null;
      }
    }

    function activate(canvas) {
      if (active.has(canvas)) {
        touch(canvas);
        return;
      }
      evictOldestIfNeeded();
      const entry = canvas.id === 'heroCanvas' ? initHero(canvas) : initCard(canvas);
      if (entry) active.set(canvas, entry);
    }

    function deactivate(canvas) {
      disposeEntry(canvas);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activate(entry.target);
          } else {
            deactivate(entry.target);
          }
        });
      },
      { rootMargin: '200px', threshold: 0.01 }
    );

    const allCanvases = [heroCanvasRef.current, ...Object.values(cardCanvasRefs.current)].filter(Boolean);

    // If the browser itself evicts a context (independent of our own cap),
    // recover instead of staying blank.
    function onContextLost(e) {
      e.preventDefault();
      deactivate(e.target);
    }
    function onContextRestored(e) {
      activate(e.target);
    }

    allCanvases.forEach((canvas) => {
      observer.observe(canvas);
      canvas.addEventListener('webglcontextlost', onContextLost, false);
      canvas.addEventListener('webglcontextrestored', onContextRestored, false);
    });

    return () => {
      observer.disconnect();
      allCanvases.forEach((canvas) => {
        canvas.removeEventListener('webglcontextlost', onContextLost, false);
        canvas.removeEventListener('webglcontextrestored', onContextRestored, false);
      });
      active.forEach((_, canvas) => disposeEntry(canvas));
      active.clear();
    };
  }, []);

  // ===== WebView repaint nudge (defensive) =====
  // Some in-app browsers (WhatsApp/Instagram/Telegram/etc. embedded WebViews)
  // fail to repaint a composited layer — like the hero or a card — after it
  // scrolls off screen and back on. The DOM and canvas underneath are fine;
  // the GPU layer just doesn't redraw itself. A one-frame visibility toggle
  // when the element re-enters view forces the browser to recompute that
  // layer, which fixes it. The flash is a single frame and not visible.
  useEffect(() => {
    const targets = document.querySelectorAll('.hero, .card, .journey-card');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.visibility = 'hidden';
            requestAnimationFrame(() => {
              el.style.visibility = '';
            });
          }
        });
      },
      { threshold: 0.01 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goToProject(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightId(null);
    requestAnimationFrame(() => {
      setHighlightId(id);
      setTimeout(() => setHighlightId(null), 1200);
    });
  }

  function openProjectModal(projectId) {
    setSelectedProject(PROJECTS[projectId]);
    setCurrentImageIndex(0);
    setActiveTab('screenshots');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  }

  function nextImage() {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }

  function prevImage() {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }

  const hasDiagrams = selectedProject && selectedProject.diagrams && selectedProject.diagrams.length > 0;
  const hasDocs = selectedProject && selectedProject.introduction;

  // ===== HANDLE DOWNLOAD =====
  function handleDownload(e) {
    e.stopPropagation();
    const url = lightboxDownloadUrl || lightboxImage;
    if (!url) return;
    
    const link = document.createElement('a');
    link.href = url;
    const filename = url.split('/').pop() || 'download.jpg';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <nav>
        <div className="logo">Malik<span>.</span>dev</div>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#journey">Journey</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#sports">🏆 Sports</a></li>
          <li><a href="#trip">🎥 Trip</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-avatar"><img src="/malik-photo.jpg" alt="Malik Ahmad" /></div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>

      <section className="hero">
        <canvas ref={heroCanvasRef} id="heroCanvas"></canvas>
        <div className="hero-copy">
          <div className="eyebrow">Open to full-stack &amp; support roles · Pune</div>
          <h1>Malik Ahmad builds<br />things that <span className="grad">work end-to-end.</span></h1>
          <p>Full-stack developer — Java, React &amp; Node.js — with an MCA fresh out of AICAIT Pune (CGPA 9.00). I ship complete systems: auth, dashboards, real-time features, deployed and documented.</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>View Projects</button>
            <button className="btn btn-ghost" onClick={() => setAskOpen(true)}>Ask about me</button>
          </div>
        </div>
        <div className="stack-wrap">
          <div className="widget-stack">
            <div className="widget w1" onClick={() => openProjectModal('proj-qr')}><div className="wicon">🛡️</div><div><b>QR Kavach</b><span>Vehicle identity verification</span></div></div>
            <div className="widget w2" onClick={() => openProjectModal('proj-queue')}><div className="wicon">⏱️</div><div><b>SmartQueue</b><span>Real-time queue management</span></div></div>
            <div className="widget w3" onClick={() => openProjectModal('proj-image')}><div className="wicon">✨</div><div><b>AI Image Studio</b><span>Stable Diffusion XL app</span></div></div>
          </div>
        </div>
      </section>

      <section id="work">
        <div className="sec-head"><div className="tag">Selected Work</div><h2>Projects</h2></div>
        <div className="grid">
          <div className={`card ${highlightId === 'proj-qr' ? 'jump-highlight' : ''}`} id="proj-qr" onClick={() => openProjectModal('proj-qr')}>
            <canvas className="c3d" data-color="#007aff" ref={el => cardCanvasRefs.current.qr = el}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#007aff,#5e5ce6)' }}>🛡️</div>
            <h3>QR Kavach</h3>
            <p>Vehicle QR identity verification system built end-to-end — JWT auth, OTP login, admin panel and real-time alerts with auto QR generation.</p>
            <div className="stack"><span>Laravel</span><span>React</span><span>MySQL</span><span>JWT</span></div>
            <a className="link">View Project →</a>
          </div>
          <div className={`card ${highlightId === 'proj-queue' ? 'jump-highlight' : ''}`} id="proj-queue" onClick={() => openProjectModal('proj-queue')}>
            <canvas className="c3d" data-color="#5e5ce6" ref={el => cardCanvasRefs.current.queue = el}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#5e5ce6,#af52de)' }}>⏱️</div>
            <h3>SmartQueue</h3>
            <p>AI-ready real-time queue management system with multi-role UI, planned with full system design from the ground up.</p>
            <div className="stack"><span>Spring Boot</span><span>React</span></div>
            <a className="link">View Project →</a>
          </div>
          <div className="card" onClick={() => openProjectModal('proj-chat')}>
            <canvas className="c3d" data-color="#30b0c7" ref={el => cardCanvasRefs.current.chat = el}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#30b0c7,#007aff)' }}>💬</div>
            <h3>Real-time Chat App</h3>
            <p>Socket-based live messaging with JWT-secured sessions and persistent chat history.</p>
            <div className="stack"><span>React</span><span>Node.js</span><span>Socket.IO</span><span>MongoDB</span></div>
            <a className="link">View Project →</a>
          </div>
          <div className={`card ${highlightId === 'proj-image' ? 'jump-highlight' : ''}`} id="proj-image" onClick={() => openProjectModal('proj-image')}>
            <canvas className="c3d" data-color="#ff9500" ref={el => cardCanvasRefs.current.image = el}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#ff9500,#af52de)' }}>✨</div>
            <h3>AI Image Studio</h3>
            <p>AI-powered image generation with 5 film rolls, real darkroom feel, and professional editing tools.</p>
            <div className="stack"><span>React + Vite</span><span>CSS3</span><span>Pollinations.ai</span></div>
            <a className="link">View Project →</a>
          </div>
        </div>
      </section>

      {/* ===== ACADEMIC JOURNEY ===== */}
      <section id="journey">
        <div className="sec-head">
          <div className="tag">Academic Journey</div>
          <h2>How I got here</h2>
          <p className="journey-subtitle">My educational and professional journey so far</p>
        </div>
        
        <div className="journey-container">
          <div className="timeline-line"></div>
          
          {ACADEMIC_DATA.map((item, index) => (
            <div 
              key={item.id} 
              className={`journey-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="journey-card" style={{ '--accent': item.color }}>
                <div className="journey-header" onClick={() => toggleAccordion(item.id)}>
                  <div className="journey-icon" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <div className="journey-info">
                    <span className="journey-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <span className="journey-sub">{item.subtitle}</span>
                    {item.cgpa && (
                      <span className="journey-cgpa">⭐ CGPA: {item.cgpa}</span>
                    )}
                  </div>
                  <span className="journey-toggle">
                    {expandedId === item.id ? '▲' : '▼'}
                  </span>
                </div>
                
                <div className={`journey-details ${expandedId === item.id ? 'open' : ''}`}>
                  {item.isCertification ? (
                    <>
                      <div className="cert-grid">
                        <div className="cert-list">
                          {item.certifications.map((cert, i) => (
                            <span key={i} className="cert-tag">{cert}</span>
                          ))}
                        </div>
                      </div>
                      {item.documents && item.documents.length > 0 && (
                        <div className="documents-grid">
                          {item.documents.map((doc, i) => (
                            <div 
                              key={i} 
                              className="doc-grid-item"
                              onClick={() => {
                                openLightbox(doc.file, doc.name);
                              }}
                            >
                              <div className="doc-grid-icon">📄</div>
                              <span className="doc-grid-name">{doc.name}</span>
                              <button 
                                className="doc-grid-download"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const link = document.createElement('a');
                                  link.href = doc.file;
                                  link.download = doc.name + '.jpg';
                                  link.click();
                                }}
                              >
                                📥
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <ul>
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                      {item.documents && item.documents.length > 0 && (
                        <div className="documents-grid">
                          {item.documents.map((doc, i) => (
                            <div 
                              key={i} 
                              className="doc-grid-item"
                              onClick={() => {
                                openLightbox(doc.file, doc.name);
                              }}
                            >
                              <div className="doc-grid-icon">📄</div>
                              <span className="doc-grid-name">{doc.name}</span>
                              <button 
                                className="doc-grid-download"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const link = document.createElement('a');
                                  link.href = doc.file;
                                  link.download = doc.name + '.jpg';
                                  link.click();
                                }}
                              >
                                📥
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  <div className="journey-tags">
                    {item.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="sec-head"><div className="tag">Toolkit</div><h2>Skills</h2></div>
        <div className="skill-cloud">
          <span>Java</span>
          <span>JavaScript</span>
          <span>React.js</span>
          <span>MySQL</span>
          <span>JWT Auth</span>
          <span>PHP</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>Socket.IO</span>
          <span>Git</span>
          <span>GitHub</span>
          <span>CI/CD</span>
          <span>Kubernetes</span>
          <span>Agile Methodology</span>
          <span style={{ border: '2px solid #ff6b6b', background: 'rgba(255,107,107,0.1)' }}>🎯 Event Management</span>
          <span style={{ border: '2px solid #2ed573', background: 'rgba(46,213,115,0.1)' }}>🤝 Team Leadership</span>
          <span style={{ border: '2px solid #f1c40f', background: 'rgba(241,196,15,0.1)' }}>🏆 Sports Strategy</span>
          <span style={{ border: '2px solid #ff4757', background: 'rgba(255,71,87,0.1)' }}>🎬 Vlogging</span>
          <span style={{ border: '2px solid #4a69bd', background: 'rgba(74,105,189,0.1)' }}>📹 Video Editing</span>
        </div>
      </section>

      {/* ============================================================
         ===== SPORTS DAY - OVERALL WINNER =====
         ============================================================ */}
      <section id="sports" style={{ padding: '60px 6vw', background: 'var(--bg)' }}>
        <div className="sec-head">
          <div className="tag">🏆 Victory</div>
          <h2>University Sports Day 2025</h2>
          <p className="journey-subtitle" style={{ marginTop: '8px' }}>
            <strong>Overall Champions!</strong> Won Cricket 🏏, Kabaddi 🤼, and Football ⚽ — 
            first time in university history!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '24px'
        }}>
          {/* Card 1 - Cricket */}
          <div className="card" style={{ cursor: 'default' }}>
            <canvas className="c3d" data-color="#f9ca24" ref={el => { 
              if (!cardCanvasRefs.current.cricket) cardCanvasRefs.current.cricket = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#f9ca24,#f0932b)' }}>🏏</div>
            <h3>Cricket Champions</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              Led the cricket team to victory with <strong>strategic planning</strong> and 
              <strong> team coordination</strong>. Every player gave their best — from batting 
              to bowling, it was a complete team effort!
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>🏆 Winner</span>
              <span>🎯 Strategy</span>
              <span>🤝 Teamwork</span>
            </div>
          </div>

          {/* Card 2 - Kabaddi */}
          <div className="card" style={{ cursor: 'default' }}>
            <canvas className="c3d" data-color="#e056fd" ref={el => { 
              if (!cardCanvasRefs.current.kabaddi) cardCanvasRefs.current.kabaddi = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#e056fd,#be2edd)' }}>🤼</div>
            <h3>Kabaddi Champions</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <strong>Unstoppable!</strong> The kabaddi team showed incredible <strong>agility, 
              strength, and coordination</strong>. Dominated the mat with perfect raids and 
              solid defense.
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>🏆 Winner</span>
              <span>💪 Strength</span>
              <span>⚡ Agility</span>
            </div>
          </div>

          {/* Card 3 - Football */}
          <div className="card" style={{ cursor: 'default' }}>
            <canvas className="c3d" data-color="#6ab04c" ref={el => { 
              if (!cardCanvasRefs.current.football) cardCanvasRefs.current.football = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#6ab04c,#2ecc71)' }}>⚽</div>
            <h3>Football Champions</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <strong>Team Spirit at its Best!</strong> From midfield control to goal-scoring 
              moments, the football team played with <strong>passion and determination</strong>.
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>🏆 Winner</span>
              <span>⚡ Speed</span>
              <span>🎯 Precision</span>
            </div>
          </div>

          {/* Card 4 - Overall Victory */}
          <div className="card" style={{ cursor: 'default' }}>
            <canvas className="c3d" data-color="#f1c40f" ref={el => { 
              if (!cardCanvasRefs.current.overall) cardCanvasRefs.current.overall = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#f1c40f,#f39c12)' }}>🏆</div>
            <h3>🏆 Overall Champions</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <strong style={{ fontSize: '1.1rem', color: 'var(--blue)' }}>HISTORY CREATED! 🎉</strong><br /><br />
              For the <strong>FIRST TIME</strong> in university history, our department won the 
              <strong> Overall Championship</strong> — winning <strong>3 major sports</strong> 
              in a single day!<br /><br />
              <em>"It's not about winning alone — it's about how we win, together."</em>
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>🏆 3 Trophies</span>
              <span>🔥 Unstoppable</span>
              <span>📜 History</span>
              <span>🤝 Team Unity</span>
            </div>
          </div>
        </div>

        {/* Sports Photos Gallery */}
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>📸 Sports Day Memories</h4>
            <button 
              className="view-all-btn"
              onClick={() => {
                const sportsImages = [
                  '/images/sports/sports-day-group.jpg',
                  '/images/sports/trophy.jpg',
                  '/images/sports/trophy1.jpg',
                  '/images/sports/trophy2.jpg',
                  '/images/sports/trophy3.jpg',
                  '/images/sports/victory-celebration.jpg'
                ];
                setGalleryImages(sportsImages);
                setGalleryTitle('🏆 Sports Day - Overall Champions!');
                setShowGallery(true);
              }}
            >
              View All Photos →
            </button>
          </div>
          <div className="ask-images-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {[
              '/images/sports/sports-day-group.jpg',
              '/images/sports/trophy.jpg',
              '/images/sports/trophy1.jpg',
              '/images/sports/trophy2.jpg',
              '/images/sports/trophy3.jpg',
              '/images/sports/victory-celebration.jpg'
            ].map((img, idx) => {
              const isTrophy = img.includes('trophy');
              return (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Sports Photo ${idx + 1}`}
                  style={{ 
                    aspectRatio: '16/9', 
                    objectFit: 'cover',
                    objectPosition: isTrophy ? 'center 20%' : 'center center',
                    borderRadius: '12px', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => openLightbox(img, `Sports Day ${idx + 1}`)}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.png';
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
         ===== MAHABALESHWAR TRIP =====
         ============================================================ */}
      <section id="trip" style={{ padding: '60px 6vw' }}>
        <div className="sec-head">
          <div className="tag">🎥 Beyond Code</div>
          <h2>Mahabaleshwar Trip 2025</h2>
          <p className="journey-subtitle" style={{ marginTop: '8px' }}>
            Planned & managed the entire college trip for <strong>40+ classmates</strong> — 
            from bus booking to resort stay, and captured every moment in <strong>2 vlogs</strong>!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginTop: '24px'
        }}>
          {/* Card 1 - Trip Management */}
          <div className="card" style={{ cursor: 'default' }}>
            <canvas className="c3d" data-color="#ff6b6b" ref={el => { 
              if (!cardCanvasRefs.current.tripManage) cardCanvasRefs.current.tripManage = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#ff6b6b,#ee5a24)' }}>📋</div>
            <h3>Event Management</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <strong>Roles & Responsibilities:</strong><br />
              • Collected details of 40+ classmates<br />
              • Managed consent forms & payments<br />
              • Booked bus & resort (negotiated best deals)<br />
              • Handled budget & expense tracking<br />
              • Coordinated with resort staff for food & activities<br />
              • Ensured everyone's safety & comfort
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>Leadership</span>
              <span>Planning</span>
              <span>Team Management</span>
              <span>Budgeting</span>
            </div>
          </div>

          {/* Card 2 - Vlog 1: Aak Yaadgar College Trip */}
          <div className="card" style={{ cursor: 'pointer' }} onClick={() => window.open('https://youtu.be/wR26GelGJ1g?si=zjy-X5mTpuC89lPt', '_blank')}>
            <canvas className="c3d" data-color="#ff4757" ref={el => { 
              if (!cardCanvasRefs.current.vlog1) cardCanvasRefs.current.vlog1 = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#ff4757,#ff6b81)' }}>🎬</div>
            <h3>🎬 Aak Yaadgar College Trip</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              The <strong>ultimate college trip vlog</strong> capturing all the fun moments — 
              from bus journey to sightseeing, food, and memories with friends!
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>📹 Vlog</span>
              <span>🎥 Memories</span>
              <span>🚌 College Trip</span>
            </div>
            <a className="link" style={{ marginTop: '10px' }}>▶ Watch Vlog →</a>
          </div>

          {/* Card 3 - Vlog 2: Maybe Last Trip */}
          <div className="card" style={{ cursor: 'pointer' }} onClick={() => window.open('https://youtu.be/258WVyaN5YQ?si=jm_NzhNmDBJXgTjN', '_blank')}>
            <canvas className="c3d" data-color="#2ed573" ref={el => { 
              if (!cardCanvasRefs.current.vlog2) cardCanvasRefs.current.vlog2 = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#2ed573,#7bed9f)' }}>🎬</div>
            <h3>🎬 Maybe Last Trip</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <strong>Emotional yet unforgettable!</strong> This vlog captures the essence of 
              our <strong>last college trip</strong> — the bonds, the laughter, and the 
              bittersweet feeling of saying goodbye.
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>📹 Vlog</span>
              <span>❤️ Memories</span>
              <span>🎓 Last Trip</span>
            </div>
            <a className="link" style={{ marginTop: '10px' }}>▶ Watch Vlog →</a>
          </div>

          {/* Card 4 - Trip Highlights */}
          <div className="card" style={{ cursor: 'default' }}>
            <canvas className="c3d" data-color="#4a69bd" ref={el => { 
              if (!cardCanvasRefs.current.tripHighlights) cardCanvasRefs.current.tripHighlights = el; 
            }}></canvas>
            <div className="icon-badge" style={{ background: 'linear-gradient(135deg,#4a69bd,#1e3799)' }}>🏔️</div>
            <h3>Trip Highlights</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <strong>📍 Places Visited:</strong><br />
              • Wilson Point (Sunrise view)<br />
              • Venna Lake (Boating)<br />
              • Mapro Garden (Strawberry heaven!)<br />
              • Pratapgad Fort<br />
              • Panchgani Table Land<br /><br />
              <strong>🍽️ Food:</strong> Local Maharashtrian cuisine, fresh strawberries & cream!
            </p>
            <div className="stack" style={{ marginTop: '10px' }}>
              <span>40+ People</span>
              <span>2 Days</span>
              <span>8 Locations</span>
            </div>
          </div>
        </div>

        {/* Trip Photos Gallery */}
        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>📸 Trip Memories</h4>
            <button 
              className="view-all-btn"
              onClick={() => {
                const tripImages = [
                  '/images/trip/Aak-Yaadgar-College-Trip.jpg',
                  '/images/trip/group-photo.jpg',
                  '/images/trip/Maybe-Last-Trip.jpg',
                  '/images/trip/resort.jpg'
                ];
                setGalleryImages(tripImages);
                setGalleryTitle('🎥 Mahabaleshwar Trip Memories');
                setShowGallery(true);
              }}
            >
              View All Photos →
            </button>
          </div>
          <div className="ask-images-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {[
              '/images/trip/Aak-Yaadgar-College-Trip.jpg',
              '/images/trip/group-photo.jpg',
              '/images/trip/Maybe-Last-Trip.jpg',
              '/images/trip/resort.jpg'
            ].map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`Trip Photo ${idx + 1}`}
                style={{ aspectRatio: '16/9', objectFit: 'cover', borderRadius: '12px', cursor: 'pointer' }}
                onClick={() => openLightbox(img, `Trip Photo ${idx + 1}`)}
                onError={(e) => {
                  e.target.src = '/images/placeholder.png';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <footer id="contact">
        <p>
          <a href="https://linkedin.com/in/malikahmad17" target="_blank" className="footer-link">linkedin.com/in/malikahmad17</a>
          ·
          <a href="mailto:malik03ahmad@gmail.com" className="footer-link">malik03ahmad@gmail.com</a>
          ·
          <a href="https://github.com/MalikAhmad-17" target="_blank" className="footer-link">github.com/MalikAhmad-17</a>
          ·
          Pune, Maharashtra
        </p>
      </footer>

      <button className="ask-fab" onClick={() => setAskOpen(true)}>
        <span className="dot"></span> Ask about Malik
      </button>

      {/* ===== ASK PANEL ===== */}
      <div className={`overlay ${askOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) { closeAskPanel(); } }}>
        <div className="ask-panel">
          <div className="ask-input-row">
            <button className="ask-back" onClick={closeAskPanel}>Cancel</button>
            <div className="ask-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Ask anything about Malik…"
                onKeyDown={handleKeyDown}
              />
              <button 
                className="ask-submit-btn" 
                onClick={handleSend}
                disabled={!searchQuery.trim() || isLoading}
              >
                {isLoading ? '⏳' : 'Send'}
              </button>
            </div>
          </div>
          
          <div className="ask-panel-body">
            <div className="ask-project-buttons">
              <button className="ask-project-btn" onClick={() => setSearchQuery('What is QR Kavach?')}>🛡️ QR Kavach</button>
              <button className="ask-project-btn" onClick={() => setSearchQuery('What is SmartQueue?')}>⏱️ SmartQueue</button>
              <button className="ask-project-btn" onClick={() => setSearchQuery('What is Real-time Chat App?')}>💬 Chat App</button>
              <button className="ask-project-btn" onClick={() => setSearchQuery('What is AI Image Studio?')}>✨ AI Image Studio</button>
            </div>
            
            <div className="ask-chips">
              <button onClick={() => setSearchQuery('Which projects has Malik built?')}>📂 All Projects</button>
              <button onClick={() => setSearchQuery('Show academic journey')}>🎓 Journey</button>
              <button onClick={() => setSearchQuery("What are Malik's skills?")}>🛠️ Skills</button>
              <button onClick={() => setSearchQuery("What certifications does Malik have?")}>📜 Certifications</button>
              <button onClick={() => setSearchQuery('How do I contact Malik?')}>📞 Contact</button>
            </div>
            
            {answerKey && (
              <div className="ask-answer show">
                <div className="who">
                  <div className="g"></div>
                  <span>🤖 GEMINI · AI ASSISTANT</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: lightboxTitle }} />
                
                {showProjectImages && projectImages.length > 0 && (
                  <div className="ask-project-images">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                      <p className="ask-images-label">
                        {searchQuery.toLowerCase().includes('certification') || searchQuery.toLowerCase().includes('certificate') 
                          ? '📜 Certificates' 
                          : '📸 Project Screenshots'}
                      </p>
                      <button 
                        className="ask-view-all-btn"
                        onClick={() => {
                          setGalleryImages(projectImages);
                          setGalleryTitle(
                            searchQuery.toLowerCase().includes('certification') || searchQuery.toLowerCase().includes('certificate')
                              ? '📜 All Certificates'
                              : '📸 All Screenshots'
                          );
                          setShowGallery(true);
                        }}
                      >
                        View all {projectImages.length} →
                      </button>
                    </div>
                    <div className="ask-images-grid">
                      {projectImages.slice(0, 4).map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={`Image ${idx + 1}`}
                          onClick={() => openLightbox(img, `Image ${idx + 1}`)}
                          onError={(e) => {
                            e.target.src = '/images/placeholder.png';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {showProjectImages && projectDiagrams && projectDiagrams.length > 0 && (
                  <div className="ask-project-images" style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                      <p className="ask-images-label">📊 Project Diagrams</p>
                      <button 
                        className="ask-view-all-btn"
                        onClick={() => {
                          setDiagramItems(projectDiagrams);
                          setShowDiagramGallery(true);
                        }}
                      >
                        View all {projectDiagrams.length} →
                      </button>
                    </div>
                    <div className="ask-images-grid">
                      {projectDiagrams.slice(0, 4).map((diag, idx) => (
                        <img 
                          key={idx} 
                          src={diag.src} 
                          alt={diag.name}
                          onClick={() => openLightbox(diag.src, diag.name)}
                          style={{ 
                            aspectRatio: '16/9', 
                            objectFit: 'contain', 
                            background: '#f5f5f7',
                            borderRadius: '8px',
                            padding: '4px'
                          }}
                          onError={(e) => {
                            e.target.src = '/images/placeholder.png';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="ask-note">Powered by Gemini AI — real answers about Malik's work.</div>
          </div>
        </div>
      </div>

      {/* ===== PROJECT MODAL ===== */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>✕</button>
            
            <h2>{selectedProject.title}</h2>
            <p className="modal-tagline">{selectedProject.tagline}</p>
            
            <div className="modal-tabs">
              {selectedProject.images && selectedProject.images.length > 0 && (
                <button 
                  className={`tab-btn ${activeTab === 'screenshots' ? 'active' : ''}`}
                  onClick={() => setActiveTab('screenshots')}
                >
                  📸 Screenshots
                </button>
              )}
              {hasDiagrams && (
                <button 
                  className={`tab-btn ${activeTab === 'diagrams' ? 'active' : ''}`}
                  onClick={() => setActiveTab('diagrams')}
                >
                  📊 Diagrams
                </button>
              )}
              {hasDocs && (
                <button 
                  className={`tab-btn ${activeTab === 'docs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('docs')}
                >
                  📄 Documentation
                </button>
              )}
            </div>

            {activeTab === 'screenshots' && selectedProject.images && selectedProject.images.length > 0 && (
              <>
                <div 
                  className="modal-carousel"
                  onClick={() => openLightbox(
                    selectedProject.images[currentImageIndex],
                    selectedProject.title + ' - Screenshot'
                  )}
                >
                  <button className="carousel-btn prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
                  <img 
                    src={selectedProject.images[currentImageIndex]} 
                    alt={selectedProject.title}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                  <button className="carousel-btn next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
                  {selectedProject.images.length > 1 && (
                    <div className="carousel-dots">
                      {selectedProject.images.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {selectedProject.images.length > 1 && (
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <button 
                      className="view-all-btn"
                      onClick={() => {
                        setGalleryImages(selectedProject.images);
                        setGalleryTitle(`${selectedProject.title} - All Screenshots`);
                        setShowGallery(true);
                      }}
                    >
                      📸 View All {selectedProject.images.length} Screenshots
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'diagrams' && hasDiagrams && (
              <>
                <div className="modal-diagrams">
                  {selectedProject.diagrams.slice(0, 6).map((diagram, idx) => (
                    <div 
                      key={idx} 
                      className="diagram-item"
                      onClick={() => openLightbox(diagram.src, diagram.name)}
                    >
                      <img src={diagram.src} alt={diagram.name} />
                      <p>{diagram.name}</p>
                    </div>
                  ))}
                </div>
                {selectedProject.diagrams.length > 6 && (
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <button 
                      className="view-all-btn"
                      onClick={() => {
                        setDiagramItems(selectedProject.diagrams);
                        setShowDiagramGallery(true);
                      }}
                    >
                      📊 View All {selectedProject.diagrams.length} Diagrams
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'docs' && hasDocs && (
              <div className="modal-docs">
                <div className="doc-section">
                  <h4>📖 Introduction</h4>
                  <p>{selectedProject.introduction}</p>
                </div>
                <div className="doc-section">
                  <h4>🎯 Scope</h4>
                  <p>{selectedProject.scope}</p>
                </div>
                <div className="doc-section">
                  <h4>🎯 System Objectives</h4>
                  <ul>
                    {selectedProject.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
                <div className="doc-section">
                  <h4>📦 System Modules</h4>
                  <ul>
                    {selectedProject.modules.map((mod, i) => (
                      <li key={i}>{mod}</li>
                    ))}
                  </ul>
                </div>
                <div className="doc-section">
                  <h4>🚀 Future Enhancements</h4>
                  <ul>
                    {selectedProject.futureEnhancements.map((fe, i) => (
                      <li key={i}>{fe}</li>
                    ))}
                  </ul>
                </div>
                <div className="doc-section">
                  <h4>✅ Conclusion</h4>
                  <p>{selectedProject.conclusion}</p>
                </div>
              </div>
            )}

            <div className="modal-tech">
              <h4>🛠️ Tech Stack</h4>
              <div className="tech-tags">
                {selectedProject.techStack.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-features">
              <h4>✨ Key Features</h4>
              <ul>
                {selectedProject.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="modal-links">
              {selectedProject.links.demo && (
                <a href={selectedProject.links.demo} target="_blank" className="btn-primary">🔗 Live Demo</a>
              )}
              {selectedProject.links.github && (
                <a href={selectedProject.links.github} target="_blank" className="btn-ghost">📂 GitHub</a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== GALLERY OVERLAY ===== */}
      {showGallery && (
        <div className="gallery-overlay" onClick={() => setShowGallery(false)}>
          <button className="gallery-close" onClick={() => setShowGallery(false)}>✕</button>
          <h3 className="gallery-title">{galleryTitle || '📸 All Images'}</h3>
          <div className="gallery-grid" onClick={(e) => e.stopPropagation()}>
            {galleryImages.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`Image ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  openLightbox(img, `Image ${idx + 1}`);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ===== DIAGRAM GALLERY OVERLAY ===== */}
      {showDiagramGallery && (
        <div className="gallery-overlay" onClick={() => setShowDiagramGallery(false)}>
          <button className="gallery-close" onClick={() => setShowDiagramGallery(false)}>✕</button>
          <h3 className="gallery-title">📊 All Diagrams</h3>
          <div className="diagrams-gallery" onClick={(e) => e.stopPropagation()}>
            {diagramItems.map((diag, idx) => (
              <div 
                key={idx} 
                className="diagram-item" 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  openLightbox(diag.src, diag.name);
                }}
              >
                <img src={diag.src} alt={diag.name} />
                <p>{diag.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== LIGHTBOX MODAL ===== */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
            <img 
              src={lightboxImage} 
              alt={lightboxTitle || 'Document'} 
              onError={(e) => {
                console.error('❌ Image load error:', lightboxImage);
                e.target.src = '/images/placeholder.png';
              }}
            />
            {lightboxTitle && <p className="lightbox-title">{lightboxTitle}</p>}
            <button 
              className="lightbox-download-btn"
              onClick={handleDownload}
            >
              📥 Download
            </button>
          </div>
        </div>
      )}
    </>
  );
}