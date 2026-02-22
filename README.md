# 🛡️ Wantex Insurance Agency

<div align="center">

![Wantex Insurance](public/logo.png)

**Your Trusted Insurance Partner in Kenya**

[![Website](https://img.shields.io/badge/Website-Live-success)](https://wantex.co.ke)
[![License](https://img.shields.io/badge/License-Proprietary-blue)]()
[![Powered By](https://img.shields.io/badge/Powered%20By-Techcrast-gold)](https://techcrast.co.ke/)

*Comprehensive Coverage | Trusted Partners | Peace of Mind*

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Pages Overview](#pages-overview)
- [Insurance Services](#insurance-services)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contact Information](#contact-information)
- [Credits](#credits)

---

## 🏢 About

**Wantex Insurance Agency** is a leading insurance intermediary in Kenya, dedicated to providing comprehensive and affordable insurance solutions for individuals, families, and businesses. We bridge the gap between our clients and reputable insurance underwriters, ensuring you get the best coverage at the most competitive rates.

Founded on the principles of trust, transparency, and exceptional customer service, Wantex Insurance has grown to become a preferred insurance partner for thousands of Kenyans. We understand that every client has unique needs, which is why we take a personalized approach to insurance — carefully assessing your risks and recommending tailored solutions that give you true peace of mind.

### 🎯 Our Mission
To provide excellent and valuable insurance solutions to individuals, families, financial institutions, companies, and businesses across Kenya, delivering comprehensive coverage at the most competitive rates.

### 🔑 Why Choose Wantex
- **Licensed & Regulated** — Fully licensed by the Insurance Regulatory Authority (IRA) of Kenya
- **Multiple Underwriters** — We work with top insurance companies to get you the best deals
- **Personalized Service** — Tailored insurance solutions based on your unique needs
- **Claims Support** — Dedicated claims assistance to ensure smooth processing
- **Competitive Rates** — Access to the most affordable premiums on the market

---

## ✨ Features

### 🎨 Design & User Experience
- **Modern, Professional Design** — Clean and intuitive red & white themed interface
- **Fully Responsive** — Optimized for desktop, tablet, and mobile devices
- **Sticky Navigation** — Easy access to all sections while scrolling
- **Smooth Animations** — Enhanced user experience with WOW.js animations
- **Interactive Elements** — Hover effects, transitions, and dynamic content

### 🔧 Functionality
- **Insurance Services Navigation** — Browse all insurance products with detailed descriptions
- **Quote Request Forms** — Easy-to-use forms for getting insurance quotes
- **Coverage Comparison** — Clear breakdown of coverage options and benefits
- **Contact & Support** — Multiple contact points for enquiries and claims
- **Social Media Integration** — Connected across social platforms

### 📱 Technical Features
- **SEO Optimized** — Meta tags, structured data, and semantic HTML
- **Performance Optimized** — Minified assets and lazy loading
- **Cross-Browser Compatible** — Works on all modern browsers
- **Accessibility Compliant** — WCAG guidelines followed
- **Serverless Contact Forms** — Vercel-powered email handling

---

## 📄 Pages Overview

### 🏠 Main Pages

| Page | Description | Key Features |
|------|-------------|--------------|
| **index.html** | Homepage | Hero slider, insurance products overview, coverage options |
| **about.html** | About Us | Company story, mission, values, FAQ section |
| **insurance-services.html** | Insurance Services | Detailed breakdown of all insurance products |
| **contact.html** | Contact Us | Quote request form, location map, office information |

---

## 🛡️ Insurance Services

Wantex Insurance offers comprehensive coverage across six major insurance categories:

### 1. 🚗 Motor Insurance
- Comprehensive motor vehicle cover
- Third-party only & third-party fire and theft
- Fleet insurance for businesses
- Personal and commercial vehicle cover

### 2. 🏥 Health Insurance
- Individual and family medical cover
- Inpatient and outpatient benefits
- Dental and optical cover
- Maternity benefits and wellness programs

### 3. 🏠 Home & Property Insurance
- Homeowners and tenants cover
- Fire and perils protection
- Domestic contents insurance
- Landlord insurance

### 4. 💼 Business Insurance
- Commercial property insurance
- Professional indemnity cover
- Public and product liability
- Business interruption insurance

### 5. ✈️ Travel Insurance
- Local and international travel cover
- Medical emergency evacuation
- Trip cancellation and delay protection
- Lost baggage and personal effects cover

### 6. 🤕 Personal Accident Cover
- 24-hour accidental death and disability cover
- Medical expenses from accidents
- Temporary and permanent disability benefits
- Group personal accident schemes

---

## 💻 Technology Stack

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Modern styling with Flexbox and Grid
- **JavaScript** — Interactive functionality
- **Bootstrap 5** — Responsive framework
- **jQuery** — DOM manipulation and AJAX

### Libraries & Plugins
- **Font Awesome 6.4.2** — Icon library
- **WOW.js** — Scroll animations
- **Swiper.js** — Touch sliders
- **Fancybox** — Lightbox gallery
- **jQuery UI** — Date picker and UI components
- **Parallax.js** — Parallax scrolling effects
- **Tilt.js** — 3D tilt hover effects

### Fonts
- **DM Sans** — Body text
- **EB Garamond** — Headings and elegant text

---

## 📁 Project Structure

```
WANTEX/
│
├── 📄 index.html                    # Homepage
├── 📄 about.html                    # About page
├── 📄 insurance-services.html       # Insurance services details
├── 📄 contact.html                  # Contact page
├── 📄 vercel.json                   # Vercel deployment config
├── 📄 sendemail.php                 # Email handler (legacy)
│
├── 📁 api/
│   └── send-email.js                # Serverless email function
│
├── 📁 css/
│   ├── main.css                     # Main stylesheet
│   ├── responsive.css               # Responsive styles
│   ├── bootstrap.css                # Bootstrap framework
│   ├── sticky-header.css            # Sticky header styles
│   ├── banner.css                   # Banner styles
│   ├── modern-hero.css              # Hero section styles
│   ├── text-animations.css          # Text animation styles
│   ├── header-buttons.css           # Header button styles
│   └── [other CSS files]
│
├── 📁 js/
│   ├── jquery.js                    # jQuery library
│   ├── bootstrap.min.js             # Bootstrap JS
│   ├── script.js                    # Main JavaScript
│   ├── sticky-header.js             # Sticky header functionality
│   ├── wow.js                       # Scroll animations
│   ├── swiper.min.js                # Slider functionality
│   ├── validate.js                  # Form validation
│   ├── contact-form.js              # Contact form handling
│   └── [other JS files]
│
├── 📁 public/
│   ├── 📁 images/                   # General images
│   │   ├── headshots/               # Team photos
│   │   ├── hero/                    # Hero section images
│   │   └── slider/                  # Slider images
│   ├── 📁 background/               # Background images
│   ├── 📁 icons/                    # Icon assets
│   ├── 📁 clients/                  # Partner logos
│   └── 📁 form_submissions/         # Form submission records
│
└── 📁 fonts/
    └── 📁 Linearicons-Free-v1.0.0/  # Icon font files
```

---

## 🚀 Installation

### Prerequisites
- Web server (Apache, Nginx, or similar)
- PHP 7.4+ (for contact form fallback)
- Modern web browser

### Local Development Setup

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd WANTEX
   ```

2. **Start Local Server**
   
   **Option A: Using Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Option B: Using PHP**
   ```bash
   php -S localhost:8000
   ```
   
   **Option C: Using Live Server (VS Code Extension)**
   - Install Live Server extension in VS Code
   - Right-click on `index.html` → "Open with Live Server"

3. **Access the Website**
   - Open browser and navigate to: `http://localhost:8000`

---

## 📖 Usage

### Navigation
- **Home** — Overview of insurance services and coverage options
- **About Us** — Company story, mission, values, and FAQs
- **Personal Insurance** — Dropdown menu with:
  - Motor Insurance
  - Health Insurance
  - Travel Insurance
  - Personal Accident Cover
- **Property Insurance** — Dropdown menu with:
  - Home & Property Insurance
  - Business Insurance
- **Contact** — Get a quote or reach out to the team

### Getting a Quote
Multiple ways to request an insurance quote:
- Fill out the online quote request form on the Contact page
- Call directly at +254 700 000 000
- Email at info@wantex.co.ke
- Visit the office in Nairobi

---

## 📞 Contact Information

### Office Location
**Wantex Insurance Agency**  
Nairobi, Kenya

### Contact Details
- **📧 Email:** [info@wantex.co.ke](mailto:info@wantex.co.ke)
- **📧 Claims:** [claims@wantex.co.ke](mailto:claims@wantex.co.ke)
- **📱 Phone:** +254 700 000 000
- **📱 Alt Phone:** +254 711 000 000

### Business Hours
Monday – Friday: 8:00 AM – 5:00 PM  
Saturday: By Appointment  
Sunday: Closed

---

## 🚀 Deployment

### Vercel Deployment
The site is configured for deployment on Vercel with serverless functions for contact form handling.

```json
{
  "version": 2,
  "builds": [
    { "src": "api/send-email.js", "use": "@vercel/node" }
  ]
}
```

### Other Hosting Options
- **Netlify** — Drag and drop deployment
- **GitHub Pages** — Static site hosting
- **Traditional Hosting** — Upload via FTP to web server

---

## 👥 Credits

### Development & Design
**Powered by [Techcrast](https://techcrast.co.ke/)**  
*Web Development & Digital Solutions*

### Technologies
- Bootstrap Framework
- Font Awesome Icons
- jQuery Library
- Google Fonts
- WOW.js Animations
- Swiper.js Sliders

---

## 📜 License

© 2025 Wantex Insurance Agency. All Rights Reserved.

**Proprietary and Confidential**  
This website and its contents are the property of Wantex Insurance Agency. Unauthorized reproduction, distribution, or use is strictly prohibited.

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025 | Initial website launch |
| 1.1.0 | 2025 | Added insurance services page with detailed product sections |
| 1.2.0 | 2025 | Enhanced contact forms and quote request functionality |
| 1.3.0 | 2026 | Updated navigation links and coverage options |

---

## 🐛 Support & Issues

For technical support or to report issues:
- **Email:** [info@wantex.co.ke](mailto:info@wantex.co.ke)
- **Developer:** [https://techcrast.co.ke](https://techcrast.co.ke)

---

<div align="center">

**🛡️ Wantex Insurance Agency**

*Comprehensive Coverage | Trusted Partners | Peace of Mind*

[![Website](https://img.shields.io/badge/Visit-Website-success?style=social&logo=google-chrome)](https://wantex.co.ke)

---

**Made with ❤️ by [Techcrast](https://techcrast.co.ke/)**

</div>
