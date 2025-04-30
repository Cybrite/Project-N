# Project-N

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

Welcome to **Project-N**! This project is designed to be a comprehensive platform that leverages the power of modern web technologies to provide seamless user experiences and interactive features.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

**Project-N** is a modern web application aimed at delivering a rich and interactive user experience. It features multiple sections, including a team page, a chatbot service, and various feature sections, each with dynamic content and responsive design.

This project is built with **Next.js** for the frontend, providing a seamless React-based user experience. It also utilizes **TailwindCSS** for styling and **TypeScript** for type safety.

## Features

- **Interactive UI Components** - Fully responsive design with modern UI elements
- **Team Page** - Showcase team members and their expertise
- **Chatbot Services** - Interactive chatbot functionality
- **Dark/Light Mode Toggle** - Customizable theme preferences
- **Responsive Design** - Optimized for all screen sizes
- **TypeScript Integration** - Type-safe development environment

## Technologies Used

### Frontend

- **Next.js**: A React-based framework for building static and dynamic web applications with server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for creating custom designs quickly.
- **TypeScript**: A statically typed superset of JavaScript for enhanced developer productivity and type safety.
- **PostCSS**: CSS tool for transforming styles with JavaScript plugins.
- **ESLint**: A static code analysis tool for identifying and fixing problems in JavaScript code.

### Backend

The backend for this project is planned for future development and will include services like user authentication, API integrations, and database management.

## Project Structure

The directory structure of **Project-N** is organized to keep code modular, clean, and maintainable. Below is an overview of the project structure:

```bash
├── app                           # Next.js app directory
├── components                    # UI components organized by section/function
├── contents                      # Content data for various sections
├── hooks                         # Custom React hooks
├── lib                           # Utility functions and helpers
├── public                        # Static assets like images and icons
├── sections                      # Page sections organized by feature
├── .env.example                  # Example environment variables
└── config files                  # Various configuration files
```

For a more detailed breakdown of the project structure, see the full directory tree in the expanded section below.

<details>
<summary>Full Directory Structure (Click to expand)</summary>

```bash
├── app
│   ├── team
│   │   ├── favicon.ico           # Favicon for the app
│   │   ├── globals.css           # Global CSS styles for the app
│   │   ├── layout.tsx            # Layout component to define the structure of team-related pages
│   │   └── page.tsx              # Page component for the team-related content
│
├── components
│   ├── About                     # Folder for the About section components
│   ├── ChatBotServices           # Folder for chatbot services related components
│   ├── Features                  # Folder for the Features section components
│   ├── Footer                    # Folder for the Footer section components
│   ├── Hero                      # Folder for the Hero section components
│   ├── NavBar                    # Folder for the NavBar section components
│   ├── Team                      # Folder for Team-related components
│   ├── shared                    # Shared components used across the app
│   ├── ui                        # UI components like buttons, forms, etc.
│   ├── TeamClient.tsx            # Client-side component for Team
│   ├── auth-section.tsx          # Component for the authentication section
│   ├── marquee-text.tsx          # Component for marquee-style text display
│   ├── pioneer.tsx               # Component for the pioneer section
│   ├── signup-form.tsx           # Component for user signup form
│   └── theme-toggle.tsx          # Component for toggling the theme (light/dark)
│
├── contents
│   ├── chatbot-services.ts       # Content related to chatbot services
│   ├── faq-section.ts            # Content for the FAQ section
│   ├── features-section.ts       # Content for the Features section
│   ├── pioneer-section.ts        # Content for the pioneer section
│   └── team-section.ts           # Content for the Team section
│
├── hooks
│   ├── use-media-query.ts        # Custom hook to handle media queries for responsive design
│
├── lib
│   ├── animation.ts              # Animation helper functions
│   ├── utils.ts                  # Utility functions for various app operations
│
├── public
│   ├── file.svg                  # SVG image file
│   ├── globe.svg                 # SVG image for globe
│   ├── next.svg                  # SVG image for Next.js logo
│   ├── vercel.svg                # SVG image for Vercel logo
│   └── window.svg                # SVG image for window graphic
│
├── sections
│   ├── ChatBotServices           # Folder for the chatbot services section
│   ├── FAQs                      # Folder for FAQ section
│   ├── Features                  # Folder for Features section
│   ├── Hero                      # Folder for Hero section
│   └── marginals                 # Folder for marginal sections
│
├── .env.example                  # Example environment file with default environment variables
├── .gitignore                    # Git ignore rules for version control
├── README.md                     # Project documentation
├── components.json               # Metadata about components used in the project
├── eslint.config.mjs             # ESLint configuration file for linting rules
├── middleware.ts                 # Middleware file for handling custom server-side logic
├── next.config.ts                # Next.js configuration for custom settings
├── package-lock.json             # Dependency lock file to ensure consistent installs
├── package.json                  # Project dependencies, scripts, and metadata
├── postcss.config.mjs            # PostCSS configuration for CSS processing
├── tailwind.config.ts            # TailwindCSS configuration for design system
├── tsconfig.json                 # TypeScript configuration file
```

</details>

## Installation

Follow these steps to set up **Project-N** locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **Yarn** (optional)

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Cybrite/Project-N.git
   cd Project-N
   ```
2. **Install the dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file based on `.env.example` and set your required environment variables.

4. **Run the development server**:

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

5. **Open the application** in your browser at [http://localhost:3000](http://localhost:3000).

## Usage

After installation, you can:

- Explore the various sections of the application
- Toggle between light and dark modes using the theme toggle
- Interact with the chatbot services
- View the team page and other features

## Contributing

We love contributions from the community! Please refer to our detailed [CONTRIBUTING.md](CONTRIBUTING.md) guide for steps on how to contribute to this project.

The contribution process involves:

1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

For more detailed instructions, please see the [CONTRIBUTING.md](CONTRIBUTING.md) document.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub Repository**: [https://github.com/Cybrite/Project-N](https://github.com/Cybrite/Project-N)
- **Issues and Feature Requests**: [GitHub Issues](https://github.com/Cybrite/Project-N/issues)

---

Built with ❤️ by the NirveonX team
