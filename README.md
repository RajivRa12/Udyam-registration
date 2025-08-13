# Udyam Registration Website

A modern, responsive web application for Udyam registration built with React, TypeScript, and Node.js. This application provides a comprehensive platform for businesses to register and manage their Udyam certificates.

## 🚀 Features

- **Multi-step Registration Process**: Streamlined registration workflow with step-by-step guidance
- **Certificate Verification**: Built-in certificate verification system
- **Status Tracking**: Real-time status checking for applications
- **Dashboard**: Comprehensive dashboard for managing registrations
- **Grievance Management**: Integrated grievance filing and tracking system
- **Statistics & Analytics**: Detailed insights and reporting
- **Multi-language Support**: Built-in language toggle functionality
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI Components**: Beautiful, accessible UI components built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Build Tool**: Vite
- **Package Manager**: npm/pnpm
- **Deployment**: Netlify (serverless functions)

## 📁 Project Structure

```
nova-sanctuary/
├── client/                 # React frontend application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Application pages
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and contexts
│   └── global.css        # Global styles
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   └── index.ts          # Server entry point
├── netlify/               # Netlify serverless functions
├── shared/                # Shared types and utilities
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajivRa12/Udyam-registration.git
   cd Udyam-registration
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:8080](http://localhost:8080)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run typecheck` - TypeScript type checking

## 🌐 Deployment

### Netlify Deployment

This project is configured for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/spa`
4. Deploy!

### Environment Variables

Create a `.env` file in the root directory:

```env
# Add your environment variables here
NODE_ENV=development
PORT=8080
```

## 📱 Pages & Features

### Main Pages
- **Index**: Landing page with registration options
- **Step 1**: Initial registration form
- **Step 2**: Additional information collection
- **Dashboard**: User dashboard for managing registrations
- **Status Check**: Check application status
- **Certificate Verification**: Verify Udyam certificates
- **Statistics**: Analytics and reporting
- **FAQ**: Frequently asked questions
- **Grievance**: File and track grievances

### Key Components
- **Form Components**: Comprehensive form inputs with validation
- **Navigation**: Responsive navigation with mobile support
- **UI Components**: Beautiful, accessible UI components
- **Language Toggle**: Multi-language support
- **Toast Notifications**: User feedback system

## 🎨 UI Components

The project includes a comprehensive set of UI components built with:
- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Custom Components**: Specialized components for the application

## 🔧 Configuration

### Vite Configuration
- Development server on port 8080
- Hot module replacement
- Express middleware integration
- Path aliases for clean imports

### Tailwind Configuration
- Custom color palette
- Responsive breakpoints
- Animation utilities
- Typography plugin

## 📊 API Integration

The application includes:
- **Pincode API**: Location-based services
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management
- **Loading States**: User experience improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [FAQ](client/pages/FAQ.tsx) page
2. Review existing [Issues](https://github.com/RajivRa12/Udyam-registration/issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- Built with modern web technologies
- UI components from Radix UI
- Styling with Tailwind CSS
- Icons from Lucide React

---

**Made with ❤️ for Udyam registration services**
