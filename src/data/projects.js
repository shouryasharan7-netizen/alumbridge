const NAMES = [
  "Aarav Sharma","Priya Nair","Rohan Gupta","Ananya Das","Karthik Iyer","Meera Joshi","Arjun Reddy","Sneha Patel","Vikram Singh","Riya Mehta",
  "James Chen","Sarah Kim","David Park","Emily Zhang","Michael Liu","Jessica Wong","Ryan Tanaka","Amanda Lee","Kevin Nakamura","Lisa Suzuki",
  "Oliver Smith","Emma Watson","Harry Brown","Sophie Taylor","William Jones","Charlotte Davis","George Wilson","Amelia Moore","Thomas Anderson","Isabella Martin",
  "Lukas Mueller","Lena Schneider","Felix Weber","Mia Hoffmann","Noah Fischer","Sophia Wagner","Elias Becker","Hannah Schulz","Jonas Meyer","Clara Braun",
  "Pierre Dubois","Marie Laurent","Lucas Bernard","Camille Moreau","Hugo Petit","Chloé Roux","Antoine Fournier","Léa Girard","Théo Bonnet","Emma Leroy",
  "Raj Malhotra","Deepa Krishnan","Sanjay Deshmukh","Kavita Rao","Aditya Bansal","Pooja Verma","Nikhil Saxena","Shruti Kulkarni","Vivek Tiwari","Neha Agarwal",
  "Carlos Ruiz","Ana García","Diego López","María Fernández","Pablo Martínez","Lucía Hernández","Javier Torres","Elena Díaz","Sergio Moreno","Carmen Vega",
  "Wei Lin","Yuki Tanaka","Haruto Sato","Mei Wang","Riku Yamamoto","Hina Kobayashi","Chen Zhou","Sakura Ito","Jun Huang","Aiko Watanabe",
]

const ROLES = ["Student","Final Year","Grad Student","Researcher","Intern","PhD Candidate","Undergrad","Teaching Assistant"]
const TAGS_POOL = [
  "Machine Learning","Web Dev","Blockchain","IoT","Cybersecurity","Data Science","Robotics","AR/VR","NLP","Computer Vision",
  "DevOps","Cloud","Mobile App","Game Dev","Embedded Systems","Quantum Computing","Bioinformatics","Fintech","EdTech","HealthTech",
  "Sustainability","AgriTech","Smart Cities","Autonomous Vehicles","Digital Twin","Microservices","API Design","UI/UX","Database","Distributed Systems",
]
const COMPANIES_INTERESTED = ["Google","Microsoft","Meta","Amazon","Apple","Netflix","Tesla","NVIDIA","OpenAI","Goldman Sachs","JP Morgan","McKinsey","Deloitte","Accenture","IBM","Intel","Qualcomm","Samsung","Adobe","Salesforce"]

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function pickN(arr, n) { const s = [...arr].sort(() => Math.random() - 0.5); return s.slice(0, n) }
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a }

const PROJECT_TEMPLATES = [
  { title: "AI-Powered Crop Disease Detection", desc: "Built a CNN model that identifies crop diseases from leaf images with 94% accuracy. Deployed as a mobile app for farmers in rural areas.", tags: ["Machine Learning","Computer Vision","Mobile App"] },
  { title: "Decentralized Voting System", desc: "A blockchain-based voting platform ensuring transparency and immutability. Uses smart contracts on Ethereum for secure ballot casting.", tags: ["Blockchain","Smart Contracts","Web Dev"] },
  { title: "Smart Traffic Management System", desc: "IoT sensors + ML model that optimizes traffic signal timing in real-time. Reduced average wait time by 30% in simulation.", tags: ["IoT","Machine Learning","Smart Cities"] },
  { title: "Mental Health Chatbot", desc: "NLP-based conversational agent that provides cognitive behavioral therapy exercises. Integrated with mood tracking and journaling.", tags: ["NLP","HealthTech","Web Dev"] },
  { title: "Autonomous Drone Delivery", desc: "Designed path-planning algorithms for drone delivery in urban environments. Simulated using ROS and Gazebo.", tags: ["Robotics","Autonomous Vehicles","Computer Vision"] },
  { title: "Real-Time Stock Sentiment Analyzer", desc: "Scrapes Twitter and Reddit for stock mentions, runs sentiment analysis, and correlates with price movements. Dashboard with live updates.", tags: ["NLP","Fintech","Data Science"] },
  { title: "Sign Language Translator", desc: "Uses MediaPipe for hand tracking and LSTM networks to translate sign language to text in real-time. Supports 50+ signs.", tags: ["Computer Vision","Machine Learning","AR/VR"] },
  { title: "Campus Food Waste Tracker", desc: "IoT-based system monitoring food waste in university cafeterias. Dashboard shows trends and suggests reduction strategies.", tags: ["IoT","Sustainability","Data Science"] },
  { title: "Peer-to-Peer Tutoring Platform", desc: "Full-stack web app matching students with peer tutors. Features scheduling, video calls, rating system, and payment integration.", tags: ["Web Dev","EdTech","UI/UX"] },
  { title: "AR Campus Navigation", desc: "Augmented reality app that overlays directions and building info on camera feed. Uses ARCore and Google Maps API.", tags: ["AR/VR","Mobile App","UI/UX"] },
  { title: "Predictive Maintenance for Industrial IoT", desc: "Anomaly detection model using vibration sensor data to predict equipment failure 72 hours in advance. Deployed on AWS IoT.", tags: ["IoT","Machine Learning","Cloud"] },
  { title: "Quantum Circuit Simulator", desc: "Browser-based simulator for quantum circuits supporting up to 20 qubits. Visualizes quantum gates and measurement outcomes.", tags: ["Quantum Computing","Web Dev","UI/UX"] },
  { title: "Elderly Fall Detection System", desc: "Wearable device with accelerometer + gyroscope data analyzed by ML model. Alerts caregivers within 10 seconds of detected fall.", tags: ["IoT","Machine Learning","HealthTech"] },
  { title: "Personalized Learning Path Generator", desc: "AI system that creates customized study plans based on learning style assessments and performance data. Uses reinforcement learning.", tags: ["Machine Learning","EdTech","Data Science"] },
  { title: "Deepfake Detection Tool", desc: "GAN-based detector analyzing facial artifacts to identify deepfake videos. Achieved 89% accuracy on the FaceForensics++ dataset.", tags: ["Computer Vision","Cybersecurity","Machine Learning"] },
  { title: "Supply Chain Optimizer", desc: "Genetic algorithm optimizing warehouse-to-retail logistics. Reduced simulated shipping costs by 18% across 200+ routes.", tags: ["Data Science","Cloud","Distributed Systems"] },
  { title: "Music Recommendation Engine", desc: "Collaborative filtering + content-based hybrid recommender. Analyzes audio features and listening patterns for personalized playlists.", tags: ["Machine Learning","Data Science","API Design"] },
  { title: "Smart Parking System", desc: "Computer vision system detecting available parking spots from surveillance cameras. Real-time mobile app with reservation system.", tags: ["Computer Vision","IoT","Mobile App"] },
  { title: "Blockchain-Based Academic Credentials", desc: "University degree verification on blockchain. Eliminates credential fraud with immutable, shareable digital certificates.", tags: ["Blockchain","EdTech","Web Dev"] },
  { title: "Voice-Controlled Home Automation", desc: "Raspberry Pi + custom NLP model for offline voice commands controlling lights, fans, and appliances. No cloud dependency.", tags: ["IoT","NLP","Embedded Systems"] },
  { title: "COVID-19 Spread Predictor", desc: "SIR epidemiological model enhanced with ML for predicting infection rates by region. Interactive dashboard with scenario modeling.", tags: ["Data Science","Machine Learning","HealthTech"] },
  { title: "Robotic Arm for E-Waste Sorting", desc: "Computer vision guided robotic arm that sorts electronic components by type. Uses YOLO for real-time object detection.", tags: ["Robotics","Computer Vision","Sustainability"] },
  { title: "Carbon Footprint Tracker App", desc: "Mobile app tracking personal carbon emissions from travel, food, and energy. Gamification elements with social challenges.", tags: ["Mobile App","Sustainability","UI/UX"] },
  { title: "Federated Learning for Healthcare", desc: "Privacy-preserving ML framework training models across hospitals without sharing patient data. Tested on chest X-ray classification.", tags: ["Machine Learning","HealthTech","Distributed Systems"] },
  { title: "Cybersecurity Threat Intelligence Dashboard", desc: "Aggregates threat feeds, correlates IOCs, and visualizes attack patterns. Built with ELK stack and custom ML anomaly detection.", tags: ["Cybersecurity","Data Science","DevOps"] },
  { title: "Virtual Lab for Chemistry Students", desc: "WebGL-based 3D chemistry lab simulator. Students can mix chemicals, observe reactions, and record data safely.", tags: ["AR/VR","EdTech","Web Dev"] },
  { title: "Autonomous Robot Maze Solver", desc: "Micromouse robot using flood-fill algorithm to navigate and solve mazes autonomously. Built with Arduino and custom PCB.", tags: ["Robotics","Embedded Systems","IoT"] },
  { title: "Social Media Fake News Detector", desc: "Transformer-based classifier detecting misinformation in news articles. Chrome extension warns users of suspicious content.", tags: ["NLP","Machine Learning","Web Dev"] },
  { title: "Smart Agriculture Drone", desc: "Drone with multispectral camera for crop health monitoring. NDVI analysis helps identify irrigation and fertilizer needs.", tags: ["AgriTech","Autonomous Vehicles","Computer Vision"] },
  { title: "Real-Time Language Translation Earbuds", desc: "Low-latency speech-to-speech translation system optimized for wearable earbuds. Supports 12 language pairs.", tags: ["NLP","Embedded Systems","Machine Learning"] },
  { title: "Digital Twin for Building Management", desc: "3D digital twin of campus building with real-time sensor data for HVAC optimization. Reduced energy consumption by 22%.", tags: ["Digital Twin","IoT","Sustainability"] },
  { title: "Gamified Cybersecurity Training Platform", desc: "CTF-style platform teaching security concepts through hands-on challenges. 50+ challenges across web, crypto, and network security.", tags: ["Cybersecurity","EdTech","Game Dev"] },
  { title: "Microservices E-Commerce Backend", desc: "Scalable e-commerce backend with 8 microservices, event-driven architecture using Kafka. Deployed on Kubernetes with auto-scaling.", tags: ["Microservices","Cloud","DevOps"] },
  { title: "AI Resume Screener", desc: "NLP system parsing resumes and ranking candidates by job fit. Reduces HR screening time by 70%. Includes bias audit tools.", tags: ["NLP","Machine Learning","API Design"] },
  { title: "Smart Water Quality Monitor", desc: "IoT device measuring pH, turbidity, and dissolved oxygen in real-time. ML model predicts contamination events.", tags: ["IoT","Sustainability","Machine Learning"] },
  { title: "Procedural Game World Generator", desc: "Generates infinite, unique 3D game worlds using Perlin noise and wave function collapse. Exportable to Unity and Unreal.", tags: ["Game Dev","AR/VR","UI/UX"] },
  { title: "Distributed File Storage System", desc: "Peer-to-peer file storage with erasure coding for fault tolerance. Supports files up to 100GB with 99.9% durability.", tags: ["Distributed Systems","Cloud","Database"] },
  { title: "Emotion-Aware Music Player", desc: "Uses facial expression analysis to detect mood and curate playlists accordingly. Integrates with Spotify API.", tags: ["Computer Vision","Machine Learning","API Design"] },
  { title: "Low-Cost 3D Printer Controller", desc: "Open-source firmware for custom 3D printer with auto-calibration and wireless printing. Built on STM32 microcontroller.", tags: ["Embedded Systems","IoT","Robotics"] },
  { title: "Flood Prediction System", desc: "Hydrological model combined with weather API and satellite data predicting flood risk 48 hours ahead. Interactive risk maps.", tags: ["Data Science","Sustainability","Machine Learning"] },
  { title: "Telemedicine Appointment Platform", desc: "Full-stack platform for video consultations, e-prescriptions, and medical record management. HIPAA-compliant architecture.", tags: ["HealthTech","Web Dev","Cloud"] },
  { title: "AI Code Review Assistant", desc: "GPT-powered bot that reviews pull requests, suggests improvements, and catches bugs before merge. GitHub App integration.", tags: ["Machine Learning","DevOps","API Design"] },
  { title: "Electric Vehicle Route Planner", desc: "Route optimization for EVs considering charging stations, elevation, and battery degradation. 15% range improvement over naive routing.", tags: ["Data Science","Sustainability","Mobile App"] },
  { title: "Haptic Feedback VR Glove", desc: "Custom-built glove providing force feedback in VR environments. Uses shape memory alloys and flex sensors.", tags: ["AR/VR","Embedded Systems","Robotics"] },
  { title: "Student Marketplace Platform", desc: "Buy/sell textbooks, electronics, and furniture within campus. Features secure messaging, ratings, and escrow payments.", tags: ["Web Dev","Fintech","UI/UX"] },
  { title: "Biometric Attendance System", desc: "Facial recognition attendance with liveness detection. Deployed across 12 classrooms, processing 3000+ students daily.", tags: ["Computer Vision","Database","Cloud"] },
  { title: "Open Source Contributor Finder", desc: "Platform matching students with beginner-friendly open source projects based on skills and interests. GitHub integration.", tags: ["Web Dev","DevOps","API Design"] },
  { title: "Neural Network Visualizer", desc: "Interactive web tool visualizing neural network architectures, forward/backward propagation, and gradient flow in real-time.", tags: ["Machine Learning","Web Dev","EdTech"] },
  { title: "Smart Mirror with AI Assistant", desc: "Raspberry Pi powered smart mirror showing weather, calendar, news, and fitness goals. Voice-controlled with custom NLP.", tags: ["IoT","NLP","Embedded Systems"] },
  { title: "Drone-Based Reforestation", desc: "Seed-dropping drone system with terrain analysis for optimal planting locations. Planted 5000+ seeds in pilot project.", tags: ["AgriTech","Autonomous Vehicles","Sustainability"] },
]

function generateProjects() {
  const projects = []
  const usedTitles = new Set()

  PROJECT_TEMPLATES.forEach((tmpl, i) => {
    const author = NAMES[i % NAMES.length]
    const university = pick(["IIT Delhi","IIT Bombay","MIT","Stanford","NUS","Oxford","ETH Zurich","University of Toronto","TU Munich","IIT Madras","BITS Pilani","Cambridge","Nanyang Tech","EPFL","IIT Kanpur","UC Berkeley","Imperial College","UBC","Waterloo","IIT Kharagpur"])
    const country = pick(["India","India","USA","USA","Singapore","UK","Switzerland","Canada","Germany","India","India","UK","Singapore","Switzerland","India","USA","UK","Canada","Canada","India"])
    const year = pick([2024, 2025, 2026])
    const likes = randInt(12, 340)
    const comments = randInt(2, 45)
    const views = likes * randInt(3, 12)
    const interestedCompanies = pickN(COMPANIES_INTERESTED, randInt(1, 4))
    const status = pick(["Active","Completed","Looking for Collaborators","In Progress","Seeking Funding"])
    const course = pick(["Computer Science","Data Science","Electrical Engineering","Mechanical Engineering","Biotechnology","Information Technology","Electronics","AI & ML","Cybersecurity","Robotics"])

    projects.push({
      id: `proj-${i + 1}`,
      title: tmpl.title,
      description: tmpl.desc,
      author,
      role: pick(ROLES),
      university,
      country,
      year,
      course,
      tags: tmpl.tags,
      likes,
      comments,
      views,
      status,
      interestedCompanies,
      githubUrl: Math.random() > 0.3 ? `https://github.com/${author.toLowerCase().replace(/\s/g, '')}/${tmpl.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}` : null,
      demoUrl: Math.random() > 0.5 ? `https://${tmpl.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 25)}.vercel.app` : null,
      postedDate: `${pick(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])} ${randInt(1,28)}, ${year}`,
      thumbnail: `https://images.unsplash.com/photo-${pick(["1518770660439-4636190af475","1555949963-aa79dcee983c","1504639725590-34d0984388bd","1517694712202-14dd9538aa97","1461749280684-dccba630e2f6","1498050108023-c5249f4df085","1550439062-609e1531270e","1542831371-29b0f74f9713","1587620962101-3473d73bec3c","1531219828661-2a00e4c9b5a7"])}?w=600&h=400&fit=crop`,
    })
  })

  // Generate additional random projects to fill up
  const EXTRA_TITLES = [
    "Smart Campus Energy Monitor","AI-Powered Plagiarism Checker","Blockchain Supply Chain for Coffee","Gesture-Controlled Wheelchair",
    "Satellite Image Classifier","Automated Grading System","Peer Review Platform","NFT Art Marketplace","Solar Panel Optimizer",
    "Restaurant Recommendation Engine","Fitness AI Coach","Mood-Based Lighting System","Library Seat Finder","Waste Sorting Robot",
    "Chatbot for College Admissions","Crypto Portfolio Tracker","Air Quality Index Predictor","Smart Doorbell with Face Recognition",
    "Automated Greenhouse","VR Museum Tour","Music Composition AI","Recipe Generator from Fridge Contents","Parkour Game Prototype",
    "Encrypted Messaging App","Crowdfunding Platform for Students","Digital Art Gallery","Autonomous Boat Prototype","3D Object Scanner",
    "Speech Therapy App","Blood Donation Network","Event Management System","Lost & Found App","Campus Ride Sharing",
    "Note Sharing Platform","AI Debate Partner","Study Group Matcher","Lecture Summarizer","Exam Timer App","Budget Planner for Students",
    "Internship Finder","Hackathon Organizer Tool","Research Paper Recommender","Thesis Format Checker","Lab Equipment Booking System",
    "Alumni Mentorship Platform","Skill Exchange Network","Campus News Aggregator","Podcast Hosting Platform","Video Lecture Indexer",
  ]

  EXTRA_TITLES.forEach((title, i) => {
    const author = NAMES[(i + 15) % NAMES.length]
    const year = pick([2024, 2025, 2026])
    projects.push({
      id: `proj-${PROJECT_TEMPLATES.length + i + 1}`,
      title,
      description: `A ${pick(["innovative","cutting-edge","practical","research-driven","community-focused"])} project ${pick(["built","developed","designed","prototyped"])} by ${author} exploring ${pick(["modern technologies","real-world applications","sustainable solutions","accessible design","data-driven insights"])}. ${pick(["Won departmental award.","Selected for university showcase.","Published in student journal.","Featured at tech conference.","Open-sourced with 200+ GitHub stars."])}`,
      author,
      role: pick(ROLES),
      university: pick(["IIT Delhi","IIT Bombay","MIT","Stanford","NUS","Oxford","ETH Zurich","University of Toronto","TU Munich","IIT Madras","BITS Pilani","Cambridge","Nanyang Tech","EPFL","IIT Kanpur","UC Berkeley","Imperial College","UBC","Waterloo","IIT Kharagpur"]),
      country: pick(["India","India","USA","USA","Singapore","UK","Switzerland","Canada","Germany","India","India","UK","Singapore","Switzerland","India","USA","UK","Canada","Canada","India"]),
      year,
      course: pick(["Computer Science","Data Science","Electrical Engineering","Mechanical Engineering","Biotechnology","Information Technology","Electronics","AI & ML","Cybersecurity","Robotics"]),
      tags: pickN(TAGS_POOL, randInt(2, 4)),
      likes: randInt(5, 250),
      comments: randInt(1, 35),
      views: randInt(50, 3000),
      status: pick(["Active","Completed","Looking for Collaborators","In Progress","Seeking Funding"]),
      interestedCompanies: pickN(COMPANIES_INTERESTED, randInt(1, 3)),
      githubUrl: Math.random() > 0.3 ? `https://github.com/${author.toLowerCase().replace(/\s/g, '')}/${title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}` : null,
      demoUrl: Math.random() > 0.5 ? `https://${title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 25)}.vercel.app` : null,
      postedDate: `${pick(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])} ${randInt(1,28)}, ${year}`,
      thumbnail: `https://images.unsplash.com/photo-${pick(["1518770660439-4636190af475","1555949963-aa79dcee983c","1504639725590-34d0984388bd","1517694712202-14dd9538aa97","1461749280684-dccba630e2f6","1498050108023-c5249f4df085","1550439062-609e1531270e","1542831371-29b0f74f9713","1587620962101-3473d73bec3b","1531219828661-2a00e4c9b5a7"])}?w=600&h=400&fit=crop`,
    })
  })

  return projects
}

export const projects = generateProjects()
