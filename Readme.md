# SparkSwipe 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sparkswipe.netlify.app-brightgreen?style=for-the-badge)](https://sparkswipe.netlify.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#license)
[![GitHub Stars](https://img.shields.io/github/stars/Mohammad-Ehshan/SparkSwipe?style=for-the-badge)](https://github.com/Mohammad-Ehshan/SparkSwipe)
[![GitHub Forks](https://img.shields.io/github/forks/Mohammad-Ehshan/SparkSwipe?style=for-the-badge)](https://github.com/Mohammad-Ehshan/SparkSwipe/network)


> **Where Great Ideas Come to Life** 💡(Live demo some features are not working currently)

## 🌟 Overview

SparkSwipe revolutionizes how entrepreneurs and innovators discover and share startup ideas. Inspired by the intuitive swipe mechanics of modern dating apps, SparkSwipe transforms the traditional list-view experience into an engaging, Tinder-style interface for exploring innovative concepts.

### 🎯 The Vision

*"What if discovering ideas felt as intuitive and exciting as swiping through Tinder?"*

That's the question that sparked SparkSwipe's creation. Instead of scrolling through endless lists, users can now swipe right on innovation — literally! Our platform makes idea discovery addictive and fun while maintaining the professional depth needed for serious entrepreneurs.

## ✨ Key Features

### 🔥 Core Functionality
- **Tinder-Style Swipe Interface**: Like, dislike, or skip ideas with intuitive gestures
- **Continuous Card Stack**: Seamless browsing experience with instant feedback animations
- **Built-in Idea Generator**: AI-powered creativity sparks when you need inspiration
- **Rich Idea Posting**: Share concepts with titles, tags, categories, and media attachments
- **Smart Filtering**: Organize ideas by tags, categories, and trending metrics

### 🎨 User Experience
- **Responsive Design**: Optimized for both mobile and desktop experiences
- **Calming Green Theme**: Human-centric design promoting creativity and focus
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Trending Panel**: Discover what's hot in the startup ecosystem
- **Personal Collections**: Save and organize your favorite ideas

### 📱 Platform Features
- **Explore Page**: Swipe through curated startup ideas
- **Post Ideas**: Share your innovations with the community
- **Profile Management**: Track your contributions and saved ideas
- **Community Feed**: Engage with fellow entrepreneurs
- **Categories**: AI & ML, Sustainability, Health & Wellness, Fintech, Education, Remote Work

## 🛠️ Tech Stack

| Frontend | Backend | Database | Deployment |
|----------|---------|----------|------------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white) |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat) | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat) | |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | | | |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | | | |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SparkSwipe.git
   cd SparkSwipe
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   #inside backend folder backend/config/config.env  and for frontend it will be at root frontend/.env
   # Create .env file 
   config/config.env
   
   # Add your environment variables
   MONGODB_URI=mongodb://localhost:27017/
   PORT = 4000
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   FRONTEND_URL=http://localhost:8080
   JWT_SECRET_KEY=JWT_SECRET_KEY
   JWT_EXPIRES=7d
   COOKIE_EXPIRE=5
   GEMINI_API_KEY=


   .env
   VITE_API_URL=http://localhost:4000

   ```

4. **Start the development servers**
   ```bash
   # Start backend server (runs on port 4000)
   cd backend
   npm run dev

   # In a new terminal, start frontend (runs on port 8080)
   cd frontend
   npm run dev
   ```

5. **Visit the application**
   Open [http://localhost:8080](http://localhost:8080) in your browser

## 📖 Usage Guide

### For Idea Seekers
1. **Sign up** or **log in** to your account
2. Navigate to the **Explore** page
3. **Swipe right** on ideas you like, **left** to pass, or **up** to skip
4. Use **filters** to find ideas in specific categories
5. **Save** interesting ideas to your personal collection
6. Check out **trending** ideas in the side panel

### For Idea Contributors
1. Click **"Post Idea"** from the navigation menu
2. Fill in your idea details:
   - Compelling title
   - Detailed description
   - Relevant tags
   - Category selection
   - Optional media attachments
3. **Submit** and watch your idea join the discovery feed
4. Track engagement through your **profile** dashboard

## 📸 Screenshots

### Landing Page
![SparkSwipe Landing](https://via.placeholder.com/800x400/4ade80/ffffff?text=SparkSwipe+Landing+Page)
*Clean, professional landing page with clear value proposition*

### Swipe Interface
![Swipe Interface](https://via.placeholder.com/800x400/10b981/ffffff?text=Tinder-Style+Swipe+Interface)
*Intuitive card-based swiping for idea discovery*

### Idea Details
![Idea Details](https://via.placeholder.com/800x400/059669/ffffff?text=Detailed+Idea+View)
*Comprehensive idea presentations with media and engagement metrics*

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure your code passes all existing tests

### Areas for Contribution
- 🐛 Bug fixes and performance improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage expansion

## 🐛 Issue Reporting

Found a bug or have a feature request? We'd love to hear from you!

### Before Submitting
- Check if the issue already exists in our [GitHub Issues](https://github.com/yourusername/SparkSwipe/issues)
- Ensure you're using the latest version

### Submitting Issues
1. Use our **issue templates** for bug reports or feature requests
2. Provide **clear descriptions** and steps to reproduce
3. Include **screenshots** or **screen recordings** when applicable
4. Specify your **environment** (browser, OS, device)

### Issue Labels
- 🐛 `bug` - Something isn't working
- ✨ `enhancement` - New feature or request
- 📚 `documentation` - Improvements or additions to docs
- 🎨 `design` - UI/UX related issues
- 🔧 `maintenance` - Code maintenance and refactoring

## 🏆 Acknowledgments

### Special Thanks
- **APIHub Team**: For organizing the thoughtful track that inspired this project
- **Open Source Community**: For the amazing tools and libraries that made this possible
- **Beta Testers**: Early users who provided valuable feedback

### Inspiration
SparkSwipe was born from the desire to make startup idea discovery as engaging as social media browsing while maintaining the professional depth needed for serious entrepreneurship.

## 📊 Project Stats

- **⭐ Stars**: Growing community of idea enthusiasts
- **🍴 Forks**: Active developer contributions
- **📦 npm Downloads**: Package usage statistics
- **🏗️ Build Status**: Continuous integration health

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core swipe functionality
- ✅ User authentication
- ✅ Idea posting and management
- ✅ Basic filtering and search

### Phase 2 (Next)
- 🔄 Real-time notifications
- 🤖 Enhanced AI idea generation
- 💬 Comment and discussion system
- 📱 Mobile app development

### Phase 3 (Future)
- 🤝 Collaboration features
- 💰 Funding connection platform
- 📈 Advanced analytics dashboard
- 🌍 Multi-language support

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 SparkSwipe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Made with ❤️ for the startup community**

[🌐 Live Demo](https://sparkswipe.netlify.app) • [📧 Contact](mailto:ashmes16@gmail.com) • [🐦 Twitter](https://twitter.com/ashmes16) • [💼 LinkedIn](https://www.linkedin.com/in/mohammad-ehshan-4362a0298)

⭐ **Star this repo if you found it helpful!** ⭐

</div>
