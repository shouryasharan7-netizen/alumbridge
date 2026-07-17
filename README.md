# 🎓 AlumBridge

**Live Demo:** [alumbridge-two.vercel.app](https://alumbridge-two.vercel.app/)

AlumBridge is a full-stack EdTech platform designed to bridge the gap between hard university facts and real alumni experiences. It helps high school students make data-driven, confident decisions about competitive undergraduate programs.

## 🚀 The Problem & Solution
Picking a university program is a massive decision, but students are forced to rely on scattered, unverified data and glossy marketing brochures. 

**AlumBridge solves this by offering two kinds of truth:**
1. **Program Intelligence:** Standardized profiles for fees, eligibility, and entrance tests (SAT/JEE).
2. **Alumni Guidance:** Direct connections to verified graduates for honest reviews and Q&A.

## ⚙️ Tech Stack
This is a fully deployed, responsive Single Page Application (SPA).
* **Frontend:** React 18, Vite, Custom Neo-Brutalist UI
* **Backend & Auth:** Supabase (Role-based access & real-time database tables)
* **AI Engine:** Google Gemini API (`@google/generative-ai`)
* **Deployment:** Vercel

## ✨ Key Features
* **Dual Dashboards:** Secure, custom-routed portals for Students and Alumni.
* **Two-Tier AI Chatbot:** A cost-and-speed optimized pipeline. It first queries the Supabase `alumni_faqs` database for instant, verified answers. If no match is found, it dynamically calls the Gemini API to generate an intelligent response.
* **Smart Shortlisting:** Users can browse programs and save them to a personalized list that persists across sessions via live Supabase database writes.

## 💻 Run it Locally
To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/shouryasharan7-netizen/alumbridge.git](https://github.com/shouryasharan7-netizen/alumbridge.git)
