#!/usr/bin/env node
/**
 * Generates 200+ programs and 1000+ alumni for AlumBridge
 * Run: node generate-data.cjs
 */
const fs = require('fs');
const path = require('path');

// ─── UNIVERSITY DEFINITIONS ───
const UNIVERSITIES = [
  // India
  { uni: "IIT Delhi", country: "India", flag: "🇮🇳", tier: "S", currency: "INR", sym: "₹",
    fees: { annual: 225000, total: 900000, usdEquiv: "~$10,800 total", localTotal: "₹9,00,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 100 },
  { uni: "IIT Bombay", country: "India", flag: "🇮🇳", tier: "S", currency: "INR", sym: "₹",
    fees: { annual: 230000, total: 920000, usdEquiv: "~$11,000 total", localTotal: "₹9,20,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 50 },
  { uni: "IIT Madras", country: "India", flag: "🇮🇳", tier: "S", currency: "INR", sym: "₹",
    fees: { annual: 215000, total: 860000, usdEquiv: "~$10,300 total", localTotal: "₹8,60,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 150 },
  { uni: "IIT Kanpur", country: "India", flag: "🇮🇳", tier: "S", currency: "INR", sym: "₹",
    fees: { annual: 210000, total: 840000, usdEquiv: "~$10,100 total", localTotal: "₹8,40,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 200 },
  { uni: "IIT Kharagpur", country: "India", flag: "🇮🇳", tier: "S", currency: "INR", sym: "₹",
    fees: { annual: 220000, total: 880000, usdEquiv: "~$10,600 total", localTotal: "₹8,80,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 250 },
  { uni: "IIT Roorkee", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 200000, total: 800000, usdEquiv: "~$9,600 total", localTotal: "₹8,00,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 500 },
  { uni: "IIT Guwahati", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 195000, total: 780000, usdEquiv: "~$9,400 total", localTotal: "₹7,80,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 700 },
  { uni: "IIT Hyderabad", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 200000, total: 800000, usdEquiv: "~$9,600 total", localTotal: "₹8,00,000" },
    tests: ["JEE Main", "JEE Advanced"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 600 },
  { uni: "BITS Pilani", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 570000, total: 2280000, usdEquiv: "~$27,400 total", localTotal: "₹22,80,000" },
    tests: ["BITSAT"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 350 },
  { uni: "BITS Goa", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 540000, total: 2160000, usdEquiv: "~$26,000 total", localTotal: "₹21,60,000" },
    tests: ["BITSAT"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 330 },
  { uni: "NIT Trichy", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 150000, total: 600000, usdEquiv: "~$7,200 total", localTotal: "₹6,00,000" },
    tests: ["JEE Main"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 3000 },
  { uni: "NIT Warangal", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 145000, total: 580000, usdEquiv: "~$7,000 total", localTotal: "₹5,80,000" },
    tests: ["JEE Main"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 4000 },
  { uni: "NIT Surathkal", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 140000, total: 560000, usdEquiv: "~$6,700 total", localTotal: "₹5,60,000" },
    tests: ["JEE Main"], eligibility: "75% in 10+2 (PCM)", cutoffBase: 5000 },
  { uni: "IIIT Hyderabad", country: "India", flag: "🇮🇳", tier: "A", currency: "INR", sym: "₹",
    fees: { annual: 360000, total: 1440000, usdEquiv: "~$17,300 total", localTotal: "₹14,40,000" },
    tests: ["JEE Main", "UGEE"], eligibility: "60% in 10+2", cutoffBase: 2000 },
  { uni: "IIIT Delhi", country: "India", flag: "🇮🇳", tier: "B", currency: "INR", sym: "₹",
    fees: { annual: 320000, total: 1280000, usdEquiv: "~$15,400 total", localTotal: "₹12,80,000" },
    tests: ["JEE Main"], eligibility: "80% in 10+2 (PCM)", cutoffBase: 6000 },
  { uni: "DTU", country: "India", flag: "🇮🇳", tier: "B", currency: "INR", sym: "₹",
    fees: { annual: 180000, total: 720000, usdEquiv: "~$8,600 total", localTotal: "₹7,20,000" },
    tests: ["JEE Main"], eligibility: "60% in 10+2 (PCM)", cutoffBase: 8000 },
  { uni: "VIT Vellore", country: "India", flag: "🇮🇳", tier: "B", currency: "INR", sym: "₹",
    fees: { annual: 490000, total: 1960000, usdEquiv: "~$23,500 total", localTotal: "₹19,60,000" },
    tests: ["VITEEE"], eligibility: "60% in 10+2 (PCM)", cutoffBase: 15000 },
  { uni: "Manipal (MIT)", country: "India", flag: "🇮🇳", tier: "B", currency: "INR", sym: "₹",
    fees: { annual: 450000, total: 1800000, usdEquiv: "~$21,600 total", localTotal: "₹18,00,000" },
    tests: ["MET"], eligibility: "50% in 10+2 (PCM)", cutoffBase: 20000 },
  // USA
  { uni: "MIT", country: "United States", flag: "🇺🇸", tier: "S", currency: "USD", sym: "$",
    fees: { annual: 57986, total: 231944, usdEquiv: "~$232,000 (with aid: ~$0-30K)", localTotal: "$231,944" },
    tests: ["SAT/ACT (optional)", "TOEFL/IELTS (intl)"], eligibility: "Holistic admissions", cutoffBase: 4 },
  { uni: "Stanford University", country: "United States", flag: "🇺🇸", tier: "S", currency: "USD", sym: "$",
    fees: { annual: 56169, total: 224676, usdEquiv: "~$225,000 (with aid: ~$0-20K)", localTotal: "$224,676" },
    tests: ["SAT/ACT (optional)", "TOEFL/IELTS (intl)"], eligibility: "Holistic admissions", cutoffBase: 4 },
  { uni: "UC Berkeley", country: "United States", flag: "🇺🇸", tier: "S", currency: "USD", sym: "$",
    fees: { annual: 44066, total: 176264, usdEquiv: "~$176,000", localTotal: "$176,264" },
    tests: ["SAT/ACT (optional)", "TOEFL/IELTS (intl)"], eligibility: "GPA 4.0+", cutoffBase: 14 },
  { uni: "Carnegie Mellon", country: "United States", flag: "🇺🇸", tier: "S", currency: "USD", sym: "$",
    fees: { annual: 58924, total: 235696, usdEquiv: "~$236,000", localTotal: "$235,696" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "Holistic admissions", cutoffBase: 5 },
  { uni: "Georgia Tech", country: "United States", flag: "🇺🇸", tier: "A", currency: "USD", sym: "$",
    fees: { annual: 33794, total: 135176, usdEquiv: "~$135,000", localTotal: "$135,176" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "GPA 3.8+", cutoffBase: 18 },
  { uni: "UIUC", country: "United States", flag: "🇺🇸", tier: "A", currency: "USD", sym: "$",
    fees: { annual: 34316, total: 137264, usdEquiv: "~$137,000", localTotal: "$137,264" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "GPA 3.7+", cutoffBase: 22 },
  { uni: "UMich Ann Arbor", country: "United States", flag: "🇺🇸", tier: "A", currency: "USD", sym: "$",
    fees: { annual: 52266, total: 209064, usdEquiv: "~$209,000", localTotal: "$209,064" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "GPA 3.8+", cutoffBase: 20 },
  { uni: "Cornell University", country: "United States", flag: "🇺🇸", tier: "S", currency: "USD", sym: "$",
    fees: { annual: 61015, total: 244060, usdEquiv: "~$244,000", localTotal: "$244,060" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "Holistic admissions", cutoffBase: 8 },
  { uni: "UT Austin", country: "United States", flag: "🇺🇸", tier: "A", currency: "USD", sym: "$",
    fees: { annual: 40032, total: 160128, usdEquiv: "~$160,000", localTotal: "$160,128" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "GPA 3.7+", cutoffBase: 25 },
  { uni: "Purdue University", country: "United States", flag: "🇺🇸", tier: "A", currency: "USD", sym: "$",
    fees: { annual: 28794, total: 115176, usdEquiv: "~$115,000", localTotal: "$115,176" },
    tests: ["SAT/ACT", "TOEFL/IELTS (intl)"], eligibility: "GPA 3.6+", cutoffBase: 30 },
  // UK
  { uni: "University of Oxford", country: "United Kingdom", flag: "🇬🇧", tier: "S", currency: "GBP", sym: "£",
    fees: { annual: 35000, total: 140000, usdEquiv: "~$176,000", localTotal: "£140,000" },
    tests: ["MAT", "Interview"], eligibility: "A*AA at A-level", cutoffBase: 8 },
  { uni: "University of Cambridge", country: "United Kingdom", flag: "🇬🇧", tier: "S", currency: "GBP", sym: "£",
    fees: { annual: 33800, total: 135200, usdEquiv: "~$170,000", localTotal: "£135,200" },
    tests: ["STEP", "Interview"], eligibility: "A*A*A at A-level", cutoffBase: 6 },
  { uni: "Imperial College London", country: "United Kingdom", flag: "🇬🇧", tier: "S", currency: "GBP", sym: "£",
    fees: { annual: 36500, total: 146000, usdEquiv: "~$183,000", localTotal: "£146,000" },
    tests: ["ESAT", "Interview"], eligibility: "A*AA at A-level (Math)", cutoffBase: 12 },
  { uni: "UCL", country: "United Kingdom", flag: "🇬🇧", tier: "A", currency: "GBP", sym: "£",
    fees: { annual: 32000, total: 128000, usdEquiv: "~$161,000", localTotal: "£128,000" },
    tests: ["IELTS/TOEFL"], eligibility: "AAA at A-level", cutoffBase: 18 },
  { uni: "University of Edinburgh", country: "United Kingdom", flag: "🇬🇧", tier: "A", currency: "GBP", sym: "£",
    fees: { annual: 29500, total: 118000, usdEquiv: "~$148,000", localTotal: "£118,000" },
    tests: ["IELTS/TOEFL"], eligibility: "AAA at A-level", cutoffBase: 22 },
  { uni: "University of Manchester", country: "United Kingdom", flag: "🇬🇧", tier: "A", currency: "GBP", sym: "£",
    fees: { annual: 28000, total: 112000, usdEquiv: "~$141,000", localTotal: "£112,000" },
    tests: ["IELTS/TOEFL"], eligibility: "AAB at A-level", cutoffBase: 28 },
  // Switzerland
  { uni: "ETH Zurich", country: "Switzerland", flag: "🇨🇭", tier: "S", currency: "CHF", sym: "CHF ",
    fees: { annual: 730, total: 2190, usdEquiv: "~$2,500", localTotal: "CHF 2,190" },
    tests: ["ETH entrance exam", "German B2"], eligibility: "Swiss Matura or equivalent", cutoffBase: 30 },
  { uni: "EPFL", country: "Switzerland", flag: "🇨🇭", tier: "S", currency: "CHF", sym: "CHF ",
    fees: { annual: 780, total: 2340, usdEquiv: "~$2,700", localTotal: "CHF 2,340" },
    tests: ["EPFL entrance", "French B2"], eligibility: "Swiss Matura or equivalent", cutoffBase: 25 },
  // Singapore
  { uni: "NUS", country: "Singapore", flag: "🇸🇬", tier: "S", currency: "SGD", sym: "S$",
    fees: { annual: 18600, total: 74400, usdEquiv: "~$55,000", localTotal: "S$74,400" },
    tests: ["SAT/ACT", "IELTS/TOEFL"], eligibility: "Strong A-levels/IB", cutoffBase: 5 },
  { uni: "NTU Singapore", country: "Singapore", flag: "🇸🇬", tier: "A", currency: "SGD", sym: "S$",
    fees: { annual: 17800, total: 71200, usdEquiv: "~$53,000", localTotal: "S$71,200" },
    tests: ["SAT/ACT", "IELTS/TOEFL"], eligibility: "Strong A-levels/IB", cutoffBase: 10 },
  // Canada
  { uni: "University of Toronto", country: "Canada", flag: "🇨🇦", tier: "S", currency: "CAD", sym: "C$",
    fees: { annual: 61720, total: 246880, usdEquiv: "~$135,000", localTotal: "C$246,880" },
    tests: ["IELTS/TOEFL"], eligibility: "Grade 12: 90%+", cutoffBase: 15 },
  { uni: "UBC", country: "Canada", flag: "🇨🇦", tier: "A", currency: "CAD", sym: "C$",
    fees: { annual: 54000, total: 216000, usdEquiv: "~$118,000", localTotal: "C$216,000" },
    tests: ["IELTS/TOEFL"], eligibility: "Grade 12: 88%+", cutoffBase: 20 },
  { uni: "University of Waterloo", country: "Canada", flag: "🇨🇦", tier: "A", currency: "CAD", sym: "C$",
    fees: { annual: 50000, total: 200000, usdEquiv: "~$109,000", localTotal: "C$200,000" },
    tests: ["IELTS/TOEFL"], eligibility: "Grade 12: 90%+ (Math)", cutoffBase: 15 },
  { uni: "McGill University", country: "Canada", flag: "🇨🇦", tier: "A", currency: "CAD", sym: "C$",
    fees: { annual: 48000, total: 192000, usdEquiv: "~$105,000", localTotal: "C$192,000" },
    tests: ["IELTS/TOEFL"], eligibility: "Grade 12: 88%+", cutoffBase: 22 },
  { uni: "McMaster University", country: "Canada", flag: "🇨🇦", tier: "B", currency: "CAD", sym: "C$",
    fees: { annual: 42000, total: 168000, usdEquiv: "~$92,000", localTotal: "C$168,000" },
    tests: ["IELTS/TOEFL"], eligibility: "Grade 12: 85%+", cutoffBase: 30 },
  // Germany
  { uni: "TU Munich", country: "Germany", flag: "🇩🇪", tier: "S", currency: "EUR", sym: "€",
    fees: { annual: 300, total: 900, usdEquiv: "~$1,000", localTotal: "€900" },
    tests: ["TestAS", "German C1 (or English track)"], eligibility: "Abitur or equivalent", cutoffBase: 20 },
  { uni: "RWTH Aachen", country: "Germany", flag: "🇩🇪", tier: "A", currency: "EUR", sym: "€",
    fees: { annual: 310, total: 930, usdEquiv: "~$1,050", localTotal: "€930" },
    tests: ["TestAS", "German C1"], eligibility: "Abitur or equivalent", cutoffBase: 25 },
  { uni: "TU Berlin", country: "Germany", flag: "🇩🇪", tier: "A", currency: "EUR", sym: "€",
    fees: { annual: 300, total: 900, usdEquiv: "~$1,000", localTotal: "€900" },
    tests: ["TestAS", "German C1"], eligibility: "Abitur or equivalent", cutoffBase: 28 },
  // Netherlands
  { uni: "TU Delft", country: "Netherlands", flag: "🇳🇱", tier: "A", currency: "EUR", sym: "€",
    fees: { annual: 15500, total: 46500, usdEquiv: "~$51,000", localTotal: "€46,500" },
    tests: ["IELTS/TOEFL", "Math exam"], eligibility: "VWO/HBO diploma or equiv", cutoffBase: 18 },
  { uni: "University of Amsterdam", country: "Netherlands", flag: "🇳🇱", tier: "A", currency: "EUR", sym: "€",
    fees: { annual: 14200, total: 42600, usdEquiv: "~$47,000", localTotal: "€42,600" },
    tests: ["IELTS/TOEFL"], eligibility: "VWO diploma or equivalent", cutoffBase: 22 },
  // Australia
  { uni: "University of Melbourne", country: "Australia", flag: "🇦🇺", tier: "A", currency: "AUD", sym: "A$",
    fees: { annual: 50000, total: 150000, usdEquiv: "~$100,000", localTotal: "A$150,000" },
    tests: ["IELTS/TOEFL"], eligibility: "ATAR 95+ or equivalent", cutoffBase: 12 },
  { uni: "UNSW Sydney", country: "Australia", flag: "🇦🇺", tier: "A", currency: "AUD", sym: "A$",
    fees: { annual: 48000, total: 144000, usdEquiv: "~$96,000", localTotal: "A$144,000" },
    tests: ["IELTS/TOEFL"], eligibility: "ATAR 93+ or equivalent", cutoffBase: 15 },
  { uni: "University of Sydney", country: "Australia", flag: "🇦🇺", tier: "A", currency: "AUD", sym: "A$",
    fees: { annual: 47000, total: 141000, usdEquiv: "~$94,000", localTotal: "A$141,000" },
    tests: ["IELTS/TOEFL"], eligibility: "ATAR 92+ or equivalent", cutoffBase: 16 },
  // Japan
  { uni: "University of Tokyo", country: "Japan", flag: "🇯🇵", tier: "S", currency: "JPY", sym: "¥",
    fees: { annual: 535800, total: 2143200, usdEquiv: "~$14,300", localTotal: "¥2,143,200" },
    tests: ["EJU", "Japanese N1"], eligibility: "Strong academics", cutoffBase: 10 },
  { uni: "Tokyo Institute of Technology", country: "Japan", flag: "🇯🇵", tier: "A", currency: "JPY", sym: "¥",
    fees: { annual: 535800, total: 2143200, usdEquiv: "~$14,300", localTotal: "¥2,143,200" },
    tests: ["EJU", "Japanese N1"], eligibility: "Strong STEM background", cutoffBase: 15 },
  // South Korea
  { uni: "KAIST", country: "South Korea", flag: "🇰🇷", tier: "S", currency: "KRW", sym: "₩",
    fees: { annual: 6800000, total: 27200000, usdEquiv: "~$20,400 (full scholarship available)", localTotal: "₩27,200,000" },
    tests: ["SAT/ACT", "TOEFL/IELTS"], eligibility: "Strong STEM background", cutoffBase: 8 },
  { uni: "Seoul National University", country: "South Korea", flag: "🇰🇷", tier: "S", currency: "KRW", sym: "₩",
    fees: { annual: 6000000, total: 24000000, usdEquiv: "~$18,000", localTotal: "₩24,000,000" },
    tests: ["TOPIK", "SAT (intl)"], eligibility: "Top 1% nationally", cutoffBase: 5 },
  // France
  { uni: "École Polytechnique", country: "France", flag: "🇫🇷", tier: "S", currency: "EUR", sym: "€",
    fees: { annual: 15600, total: 46800, usdEquiv: "~$51,000", localTotal: "€46,800" },
    tests: ["Concours", "French B2"], eligibility: "Strong math background", cutoffBase: 10 },
  { uni: "Sorbonne University", country: "France", flag: "🇫🇷", tier: "A", currency: "EUR", sym: "€",
    fees: { annual: 3770, total: 11310, usdEquiv: "~$12,500", localTotal: "€11,310" },
    tests: ["French B2", "IELTS/TOEFL"], eligibility: "Baccalauréat or equivalent", cutoffBase: 20 },
  // Sweden
  { uni: "KTH Royal Institute", country: "Sweden", flag: "🇸🇪", tier: "A", currency: "SEK", sym: "SEK ",
    fees: { annual: 155000, total: 465000, usdEquiv: "~$44,000", localTotal: "SEK 465,000" },
    tests: ["IELTS/TOEFL"], eligibility: "Upper secondary diploma", cutoffBase: 18 },
  // Hong Kong
  { uni: "HKUST", country: "Hong Kong", flag: "🇭🇰", tier: "A", currency: "HKD", sym: "HK$",
    fees: { annual: 155000, total: 620000, usdEquiv: "~$79,500", localTotal: "HK$620,000" },
    tests: ["SAT/ACT/IB/GCE", "IELTS/TOEFL"], eligibility: "Strong academics", cutoffBase: 12 },
  { uni: "University of Hong Kong", country: "Hong Kong", flag: "🇭🇰", tier: "A", currency: "HKD", sym: "HK$",
    fees: { annual: 150000, total: 600000, usdEquiv: "~$77,000", localTotal: "HK$600,000" },
    tests: ["SAT/ACT/IB/GCE", "IELTS/TOEFL"], eligibility: "Strong academics", cutoffBase: 15 },
  // Israel
  { uni: "Technion", country: "Israel", flag: "🇮🇱", tier: "S", currency: "ILS", sym: "₪",
    fees: { annual: 40000, total: 160000, usdEquiv: "~$44,000", localTotal: "₪160,000" },
    tests: ["Psychometric Exam", "Hebrew/English"], eligibility: "Strong math & science", cutoffBase: 10 },
  // China
  { uni: "Tsinghua University", country: "China", flag: "🇨🇳", tier: "S", currency: "CNY", sym: "¥",
    fees: { annual: 40000, total: 160000, usdEquiv: "~$22,000", localTotal: "¥160,000" },
    tests: ["Gaokao", "HSK (Chinese)"], eligibility: "Top 0.1% Gaokao", cutoffBase: 3 },
];

// ─── PROGRAM TEMPLATES PER UNIVERSITY ───
const BRANCHES = {
  S: [ // Top-tier universities get more branches
    { name: "Computer Science", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 1.0, placementRate: "95-99%", research: ["AI/ML Lab", "Systems Research", "Industry Collaborations"] },
    { name: "Electrical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.85, placementRate: "90-95%", research: ["VLSI Design", "Power Systems", "Signal Processing"] },
    { name: "Mechanical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.7, placementRate: "85-92%", research: ["Robotics Lab", "Thermal Engineering", "Manufacturing"] },
    { name: "Data Science & AI", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 1.1, placementRate: "93-98%", research: ["Deep Learning Lab", "NLP Research", "Computer Vision"] },
    { name: "Electronics & Communication", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.82, placementRate: "88-94%", research: ["Embedded Systems", "5G Research", "IoT Lab"] },
    { name: "Mathematics & Computing", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.95, placementRate: "90-96%", research: ["Cryptography", "Optimization", "Quantitative Finance"] },
    { name: "Physics", degree: { IN: "B.Sc.", default: "B.Sc." }, years: 3,
      avgPkgMult: 0.5, placementRate: "70-80%", research: ["Quantum Computing", "Astrophysics", "Condensed Matter"] },
    { name: "Chemical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.65, placementRate: "82-88%", research: ["Catalysis", "Polymer Science", "Energy Research"] },
    { name: "Civil Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.55, placementRate: "78-85%", research: ["Structural Engineering", "Environmental Systems", "Urban Planning"] },
    { name: "Biotechnology", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.5, placementRate: "75-82%", research: ["Genomics", "Bioinformatics", "Drug Discovery"] },
  ],
  A: [ // Mid-tier get fewer
    { name: "Computer Science", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 1.0, placementRate: "90-95%", research: ["AI Lab", "Software Engineering", "Data Analytics"] },
    { name: "Electrical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.8, placementRate: "85-90%", research: ["Power Electronics", "Control Systems"] },
    { name: "Mechanical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.65, placementRate: "80-88%", research: ["CAD/CAM", "Automotive Engineering"] },
    { name: "Data Science", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 1.05, placementRate: "88-94%", research: ["Machine Learning", "Big Data", "Statistics"] },
    { name: "Electronics", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.78, placementRate: "84-90%", research: ["VLSI", "Communications"] },
    { name: "Information Technology", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.9, placementRate: "87-92%", research: ["Cybersecurity", "Cloud Computing"] },
  ],
  B: [ // Lower tier get fewer
    { name: "Computer Science", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 1.0, placementRate: "85-92%", research: ["Software Development", "Web Technologies"] },
    { name: "Electrical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.7, placementRate: "78-85%", research: ["Power Systems", "Electronics"] },
    { name: "Mechanical Engineering", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.6, placementRate: "75-82%", research: ["Manufacturing", "Design"] },
    { name: "Information Technology", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.88, placementRate: "82-90%", research: ["Networking", "Database Systems"] },
    { name: "Data Science", degree: { IN: "B.Tech", default: "B.Sc." }, years: 4,
      avgPkgMult: 0.95, placementRate: "84-90%", research: ["Analytics", "ML Applications"] },
  ],
};

// Base avg packages by tier and country (in local currency)
const BASE_PACKAGES = {
  "India": { S: "22 LPA", A: "14 LPA", B: "8 LPA", S_num: 22, A_num: 14, B_num: 8, unit: " LPA" },
  "United States": { S: "$140K", A: "$95K", B: "$75K", S_num: 140, A_num: 95, B_num: 75, unit: "K USD", sym: "$" },
  "United Kingdom": { S: "£60K", A: "£42K", B: "£35K", S_num: 60, A_num: 42, B_num: 35, unit: "K GBP", sym: "£" },
  "Switzerland": { S: "CHF 100K", A: "CHF 85K", B: "CHF 70K", S_num: 100, A_num: 85, B_num: 70, unit: "K CHF" },
  "Singapore": { S: "S$70K", A: "S$55K", B: "S$45K", S_num: 70, A_num: 55, B_num: 45, unit: "K SGD" },
  "Canada": { S: "C$80K", A: "C$65K", B: "C$55K", S_num: 80, A_num: 65, B_num: 55, unit: "K CAD" },
  "Germany": { S: "€55K", A: "€45K", B: "€38K", S_num: 55, A_num: 45, B_num: 38, unit: "K EUR", sym: "€" },
  "Netherlands": { S: "€50K", A: "€42K", B: "€35K", S_num: 50, A_num: 42, B_num: 35, unit: "K EUR", sym: "€" },
  "Australia": { S: "A$85K", A: "A$65K", B: "A$55K", S_num: 85, A_num: 65, B_num: 55, unit: "K AUD" },
  "Japan": { S: "¥6M", A: "¥4.5M", B: "¥3.5M", S_num: 6, A_num: 4.5, B_num: 3.5, unit: "M JPY", sym: "¥" },
  "South Korea": { S: "₩60M", A: "₩45M", B: "₩35M", S_num: 60, A_num: 45, B_num: 35, unit: "M KRW" },
  "France": { S: "€55K", A: "€42K", B: "€35K", S_num: 55, A_num: 42, B_num: 35, unit: "K EUR", sym: "€" },
  "Sweden": { S: "SEK 480K", A: "SEK 400K", B: "SEK 350K", S_num: 480, A_num: 400, B_num: 350, unit: "K SEK" },
  "Hong Kong": { S: "HK$500K", A: "HK$380K", B: "HK$300K", S_num: 500, A_num: 380, B_num: 300, unit: "K HKD" },
  "Israel": { S: "₪280K", A: "₪220K", B: "₪180K", S_num: 280, A_num: 220, B_num: 180, unit: "K ILS" },
  "China": { S: "¥250K", A: "¥180K", B: "¥130K", S_num: 250, A_num: 180, B_num: 130, unit: "K CNY", sym: "¥" },
};

const TOP_RECRUITERS_BY_TIER = {
  S: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "NVIDIA", "OpenAI", "Jane Street", "Goldman Sachs", "McKinsey"],
  A: ["Amazon", "Microsoft", "Oracle", "SAP", "Deloitte", "Accenture", "IBM", "Cisco", "Adobe", "Salesforce"],
  B: ["TCS", "Infosys", "Wipro", "Cognizant", "Deloitte", "Accenture", "Capgemini", "HCL", "Tech Mahindra", "LTIMindtree"],
};

// ─── NAME GENERATION ───
const FIRST_NAMES_IN = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Reyansh","Krishna","Ishaan","Shaurya","Atharv","Advait","Dhruv","Kabir","Ritvik","Aarush","Kiaan","Parth","Yuvan","Ayaan","Darsh","Ananya","Diya","Myra","Sara","Aadhya","Kiara","Isha","Navya","Pari","Riya","Aanya","Saanvi","Aaradhya","Prisha","Anika","Nisha","Tanvi","Vanya","Meera","Kavya"];
const LAST_NAMES_IN = ["Sharma","Verma","Patel","Gupta","Singh","Kumar","Reddy","Nair","Joshi","Agarwal","Mehta","Chopra","Das","Iyer","Pillai","Kapoor","Malhotra","Bhat","Menon","Rao","Mishra","Tiwari","Pandey","Dubey","Chauhan","Rajput","Yadav","Jain","Seth","Bansal"];
const FIRST_NAMES_US = ["James","Robert","Michael","William","David","Richard","Joseph","Thomas","Daniel","Matthew","Anthony","Mark","Steven","Andrew","Joshua","Emily","Emma","Olivia","Sophia","Isabella","Ava","Mia","Charlotte","Amelia","Harper","Evelyn","Abigail","Ella","Grace","Chloe"];
const LAST_NAMES_US = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Chen","Kim","Park","Lee","Wang","Zhang","Liu","Yang","Huang","Patel"];
const FIRST_NAMES_UK = ["Oliver","George","Harry","Jack","Noah","Leo","Oscar","Charlie","Archie","Henry","Olivia","Amelia","Isla","Ava","Emily","Sophie","Grace","Mia","Poppy","Ella"];
const LAST_NAMES_UK = ["Smith","Jones","Taylor","Brown","Williams","Wilson","Johnson","Davies","Patel","Robinson","Wright","Thompson","Evans","Walker","White","Hall","Green","Harris","Clark","Lewis"];
const FIRST_NAMES_EU = ["Lukas","Felix","Leon","Max","Paul","Jonas","Tim","David","Anna","Lena","Marie","Sophie","Emma","Laura","Lisa","Hans","Klaus","Franz","Greta","Ingrid"];
const LAST_NAMES_EU = ["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Hoffmann","Schulz","de Vries","Jansen","Bakker","van den Berg","Dubois","Martin","Bernard","Petit","Rossi","Bianchi"];
const FIRST_NAMES_ASIA = ["Wei","Jun","Hao","Ming","Yuki","Haruto","Sota","Riku","Minho","Jisoo","Seoyeon","Jiwoo","Soojin","Taehyung","Lin","Yun","Kai","Ren","Akira","Takeshi"];
const LAST_NAMES_ASIA = ["Wang","Li","Zhang","Liu","Chen","Yang","Tanaka","Suzuki","Watanabe","Kim","Park","Lee","Choi","Jung","Kang","Cho","Yoon","Lim","Han","Oh"];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) { const s = [...arr].sort(() => Math.random() - 0.5); return s.slice(0, n); }

function generateName(country) {
  if (country === "India") return `${pick(FIRST_NAMES_IN)} ${pick(LAST_NAMES_IN)}`;
  if (country === "United States") return `${pick(FIRST_NAMES_US)} ${pick(LAST_NAMES_US)}`;
  if (country === "United Kingdom") return `${pick(FIRST_NAMES_UK)} ${pick(LAST_NAMES_UK)}`;
  if (["Switzerland","Germany","Netherlands","France","Sweden"].includes(country)) return `${pick(FIRST_NAMES_EU)} ${pick(LAST_NAMES_EU)}`;
  if (["Singapore","Japan","South Korea","China","Hong Kong"].includes(country)) return `${pick(FIRST_NAMES_ASIA)} ${pick(LAST_NAMES_ASIA)}`;
  if (country === "Canada") return `${pick([...FIRST_NAMES_US,...FIRST_NAMES_UK])} ${pick([...LAST_NAMES_US,...LAST_NAMES_UK])}`;
  if (country === "Australia") return `${pick(FIRST_NAMES_UK)} ${pick(LAST_NAMES_UK)}`;
  if (country === "Israel") return `${pick(["Avi","Yael","Noam","Omer","Tamar","Shira","Eitan","Daniel","Maya","Roni"])} ${pick(["Cohen","Levi","Mizrahi","Peretz","Goldstein","Friedman","Shapira","Baruch","Dahan","Aviv"])}`;
  return `${pick(FIRST_NAMES_US)} ${pick(LAST_NAMES_US)}`;
}

const ROLES = ["Software Engineer","Senior Software Engineer","Staff Engineer","Engineering Manager","Product Manager","Data Scientist","ML Engineer","Research Scientist","Product Designer","DevOps Engineer","Full Stack Developer","Backend Engineer","Frontend Engineer","Security Engineer","Cloud Architect","Solutions Architect","Technical Lead","VP of Engineering","CTO","Co-Founder","Quantitative Analyst","Research Engineer","iOS Developer","Android Developer","Blockchain Developer","Game Developer","QA Engineer","Site Reliability Engineer","Data Engineer","AI Research Scientist"];
const COMPANIES_BY_TIER = {
  S: ["Google","Microsoft","Amazon","Meta","Apple","NVIDIA","OpenAI","DeepMind","Anthropic","Tesla","SpaceX","Netflix","Stripe","Airbnb","Uber","Palantir","Databricks","Snowflake","Coinbase","Robinhood","Jane Street","Citadel","Two Sigma","Goldman Sachs","McKinsey","Bain","BCG"],
  A: ["Google","Microsoft","Amazon","Oracle","SAP","Cisco","Adobe","Salesforce","IBM","Dell","Intel","Qualcomm","VMware","ServiceNow","Atlassian","Twilio","Splunk","Palo Alto","CrowdStrike","Zscaler","Deloitte","Accenture","PwC","EY"],
  B: ["Google","Amazon","Microsoft","Flipkart","Swiggy","Zomato","Razorpay","Cred","PhonePe","Paytm","Ola","Meesho","Groww","Zerodha","Byju's","Deloitte","Accenture","TCS","Infosys","Wipro","Cognizant","HCL","Tech Mahindra","LTIMindtree","Capgemini"],
};

const EXPERTISE_TAGS = ["Machine Learning","System Design","Interview Prep","Product Management","Career Pivots","Startups","Entrepreneurship","Data Science","Cloud Computing","Cybersecurity","Mobile Development","Web Development","DevOps","Blockchain","AI Research","Robotics","Embedded Systems","Competitive Programming","Quant Trading","UI/UX Design","Backend Systems","Distributed Systems","Algorithms","Database Design","Networking","Computer Vision","NLP","Reinforcement Learning","Game Development","AR/VR"];

// ─── GENERATE PROGRAMS ───
let allPrograms = [];
let programIdx = 0;

for (const u of UNIVERSITIES) {
  const branches = BRANCHES[u.tier] || BRANCHES.B;
  const bp = BASE_PACKAGES[u.country] || BASE_PACKAGES["United States"];

  for (const b of branches) {
    programIdx++;
    const uniSlug = u.uni.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/,'');
    const branchSlug = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/,'');
    const id = `${branchSlug}-${uniSlug}`;
    const degree = b.degree[u.country === "India" ? "IN" : "default"] || b.degree.default;
    const avgPkgNum = Math.round(bp[u.tier + "_num"] * b.avgPkgMult);
    const avgPkg = bp.sym ? `${bp.sym}${avgPkgNum}${bp.unit.includes("K") ? "K" : bp.unit.includes("M") ? "M" : ""}` : `${avgPkgNum}${bp.unit}`;
    const highestMult = 2 + Math.random() * 2;
    const highestPkgNum = Math.round(avgPkgNum * highestMult);
    const highestPkg = bp.sym ? `${bp.sym}${highestPkgNum}${bp.unit.includes("K") ? "K+" : bp.unit.includes("M") ? "M+" : "+"}` : `${highestPkgNum}${bp.unit}+`;
    const placementRate = b.placementRate;
    const topRecruiters = pickN(TOP_RECRUITERS_BY_TIER[u.tier] || TOP_RECRUITERS_BY_TIER.A, 5);

    const isIndia = u.country === "India";
    let cutoffRank;
    if (isIndia && u.tests.includes("JEE Advanced")) {
      cutoffRank = `${u.cutoffBase}-${u.cutoffBase + 200} (General)`;
    } else if (isIndia && u.tests.includes("BITSAT")) {
      cutoffRank = `Score ${u.cutoffBase}+ (out of 450)`;
    } else if (isIndia) {
      cutoffRank = `${u.cutoffBase}-${u.cutoffBase + 3000} (General)`;
    } else if (u.tier === "S") {
      cutoffRank = `Acceptance: ~${u.cutoffBase}%`;
    } else {
      cutoffRank = `Acceptance: ~${u.cutoffBase}%`;
    }

    const descriptions = [
      `${b.name} at ${u.uni} combines rigorous academics with hands-on research in ${u.country}. Graduates are highly sought after by top employers worldwide.`,
      `The ${b.name} program at ${u.uni} is known for its strong curriculum, excellent faculty, and outstanding placement outcomes. A top choice for students in ${u.country}.`,
      `Study ${b.name} at ${u.uni} — a program that balances theoretical depth with practical application, preparing students for leadership roles in industry and research.`,
      `${u.uni}'s ${b.name} program offers world-class education with access to cutting-edge labs and industry partnerships. Excellent ROI and career outcomes.`,
    ];

    allPrograms.push({
      id,
      name: b.name,
      university: u.uni,
      country: u.country,
      degree,
      duration: `${b.years} years`,
      fees: u.fees,
      eligibility: { minimum: u.eligibility, board: "International" },
      testsRequired: u.tests,
      cutoffRank,
      cutoffScoreRange: `${u.tests[0]} required`,
      placementStats: { avgPackage: avgPkg, highestPackage: highestPkg, placementRate, topRecruiters },
      researchOpportunities: b.research,
      description: pick(descriptions),
      alumni: [],
      flag: u.flag,
    });
  }
}

console.log(`Generated ${allPrograms.length} programs across ${new Set(allPrograms.map(p=>p.university)).size} universities in ${new Set(allPrograms.map(p=>p.country)).size} countries`);

// ─── GENERATE ALUMNI ───
let allAlumni = [];
let alumniIdx = 0;
const usedNames = new Set();

for (const prog of allPrograms) {
  // 4-6 alumni per program
  const numAlumni = 4 + Math.floor(Math.random() * 3);
  const uniInfo = UNIVERSITIES.find(u => u.uni === prog.university);
  const tier = uniInfo?.tier || "A";
  const companies = COMPANIES_BY_TIER[tier] || COMPANIES_BY_TIER.A;

  for (let i = 0; i < numAlumni; i++) {
    alumniIdx++;
    let name;
    do { name = generateName(prog.country); } while (usedNames.has(name));
    usedNames.add(name);

    const gradYear = 2016 + Math.floor(Math.random() * 8);
    const role = pick(ROLES);
    const company = pick(companies);
    const expertise = pickN(EXPERTISE_TAGS, 2 + Math.floor(Math.random() * 2));
    const available = Math.random() > 0.25;
    const rating = 3 + Math.floor(Math.random() * 3); // 3-5

    const bios = [
      `Graduated from ${prog.university}'s ${prog.name} program in ${gradYear}. Now working as ${role} at ${company}. Happy to discuss career paths, campus life, and the ${prog.name} curriculum.`,
      `${prog.name} at ${prog.university} gave me the foundation for my career at ${company}. The ${pick(prog.researchOpportunities)} experience was invaluable. Ask me about anything!`,
      `After graduating from ${prog.university}, I joined ${company} as a ${role}. The skills I built during my ${prog.name} degree are directly applicable to my daily work.`,
      `Proud ${prog.university} alum! The ${prog.name} program challenged me intellectually and prepared me well for industry. Currently at ${company} working on exciting problems.`,
    ];

    const reviewTexts = [
      `${prog.university}'s ${prog.name} program is ${pick(["excellent","challenging but rewarding","the best decision I made","transformative"])}. The ${pick(["faculty","peer group","research opportunities","campus culture","industry connections"])} ${pick(["is outstanding","made all the difference","prepared me well","opened doors I never expected"])}.`,
      `My time at ${prog.university} was ${pick(["incredible","life-changing","intense but fulfilling"])}. The ${prog.name} curriculum is ${pick(["rigorous","well-structured","industry-relevant"])}, and the alumni network is ${pick(["strong","supportive","growing fast"])}.`,
      `${pick(["Don't overthink it","Go for it","It's worth every penny","The ROI is real"])} — ${prog.university}'s ${prog.name} program gives you ${pick(["real skills","a strong network","industry exposure","research experience"])} that ${pick(["pays off quickly","lasts a lifetime","opens global opportunities","sets you apart"])}.`,
    ];

    const alum = {
      id: `a${alumniIdx}`,
      name,
      programId: prog.id,
      graduationYear: gradYear,
      currentRole: role,
      company,
      bio: pick(bios),
      expertise,
      available,
      review: { rating, text: pick(reviewTexts) },
    };
    allAlumni.push(alum);
    prog.alumni.push(alum.id);
  }
}

console.log(`Generated ${allAlumni.length} alumni`);

// ─── WRITE FILES ───
const progFile = `export const programs = ${JSON.stringify(allPrograms, null, 2)};\n`;
const alumFile = `export const alumni = ${JSON.stringify(allAlumni, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'src/data/programs.js'), progFile);
fs.writeFileSync(path.join(__dirname, 'src/data/alumni.js'), alumFile);

console.log('Written to src/data/programs.js and src/data/alumni.js');
