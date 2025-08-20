# Overview

This is a full-stack blogging platform built with React and Express.js, designed to mimic Medium's clean and professional interface. The application allows users to create, read, and search articles with a focus on excellent typography and user experience. It features a modern tech stack with TypeScript throughout, shadcn/ui components for consistent design, and Drizzle ORM for database management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses React with TypeScript in a single-page application (SPA) structure. The UI is built with shadcn/ui components providing a consistent design system based on Radix UI primitives and Tailwind CSS. State management is handled through TanStack Query for server state and React hooks for local state. The application uses Wouter for lightweight client-side routing.

Key design decisions:
- **Component-based architecture**: Modular components in `/client/src/components/` with reusable UI components in `/client/src/components/ui/`
- **Typography-focused design**: Uses Charter font for headings and clean typography inspired by Medium
- **Responsive design**: Mobile-first approach with Tailwind CSS breakpoints
- **Form management**: React Hook Form with Zod validation for type-safe forms

## Backend Architecture
The server is built with Express.js using TypeScript and follows RESTful API conventions. It implements a clean separation between routes, business logic, and data access layers.

Architecture components:
- **Express server**: Main server setup in `/server/index.ts` with middleware for logging and error handling
- **Route handlers**: API endpoints in `/server/routes.ts` for articles and authentication
- **Storage abstraction**: Interface-based storage layer in `/server/storage.ts` with in-memory implementation for development
- **Schema validation**: Shared Zod schemas between client and server for consistent data validation

## Data Storage
The application uses Drizzle ORM with PostgreSQL for production databases. The database schema includes users and articles tables with proper relationships.

Database design:
- **Users table**: Stores user authentication and profile information
- **Articles table**: Contains article content, metadata, and author relationships
- **Schema sharing**: Common schema definitions in `/shared/schema.ts` used by both client and server
- **Type safety**: Full TypeScript integration with Drizzle for compile-time query validation

## Development Setup
The project uses Vite for fast development builds and hot module replacement. The build process creates separate bundles for client and server code.

Build configuration:
- **Vite configuration**: Custom setup for client-side development with path aliases
- **TypeScript compilation**: Shared tsconfig.json with path mapping for clean imports
- **Development server**: Vite dev server with Express API proxy for seamless development

# External Dependencies

## UI and Styling
- **shadcn/ui**: Complete UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography

## Data Management
- **TanStack Query**: Server state management with caching and synchronization
- **Drizzle ORM**: Type-safe SQL toolkit for database operations
- **Drizzle Kit**: Database migration and introspection tools
- **Neon Database**: Serverless PostgreSQL database service

## Forms and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking throughout the application
- **ESBuild**: Fast JavaScript bundler for production builds
- **Wouter**: Lightweight routing library for React

## Authentication and Security
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **bcrypt**: Password hashing (implied for production use)
- **express-session**: Session management middleware (configuration ready)