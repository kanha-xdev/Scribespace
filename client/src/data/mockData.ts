// Mock data for frontend-only blog application

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  published: boolean;
  featured: boolean;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface BlogWithAuthor extends Blog {
  author: User;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    username: "sarah_johnson",
    email: "sarah@example.com",
    name: "Sarah Johnson",
    bio: "Full-stack developer passionate about modern web technologies",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    username: "emma_davis",
    email: "emma@example.com",
    name: "Emma Davis",
    bio: "JavaScript enthusiast and technical writer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "3",
    username: "mike_thompson",
    email: "mike@example.com",
    name: "Mike Thompson",
    bio: "React specialist and architecture consultant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    username: "alex_chen",
    email: "alex@example.com",
    name: "Alex Chen",
    bio: "UI/UX designer who loves clean interfaces",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-03-05"),
  }
];

// Mock Blogs
export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "The Future of Web Development: Building Scalable Applications",
    subtitle: "Discover the latest trends and best practices in modern web development",
    content: `# The Future of Web Development

Web development is evolving at an unprecedented pace. With new frameworks, tools, and methodologies emerging regularly, it's crucial for developers to stay updated with the latest trends.

## Key Trends to Watch

### 1. Serverless Architecture
Serverless computing is revolutionizing how we build and deploy applications. By abstracting server management, developers can focus on writing code rather than managing infrastructure.

### 2. Progressive Web Apps (PWAs)
PWAs combine the best of web and mobile apps, offering offline functionality, push notifications, and native-like experiences.

### 3. AI-Powered Development
Artificial intelligence is becoming an integral part of the development process, from code generation to automated testing.

## Best Practices

- **Performance First**: Always prioritize performance optimization
- **Accessibility**: Ensure your applications are accessible to all users
- **Security**: Implement robust security measures from the ground up
- **Testing**: Maintain comprehensive test coverage

The future of web development is bright, with endless possibilities for innovation and growth.`,
    excerpt: "Discover the latest trends and best practices in modern web development, from serverless architecture to AI-powered development tools.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=800&h=400&fit=crop",
    authorId: "1",
    published: true,
    featured: true,
    readTime: "8 min read",
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-15"),
    tags: ["web development", "technology", "future"]
  },
  {
    id: "2",
    title: "Understanding JavaScript Closures: A Deep Dive",
    subtitle: "Master one of JavaScript's most powerful features",
    content: `# Understanding JavaScript Closures

Closures are one of the most powerful and often misunderstood features in JavaScript. Understanding closures is crucial for writing effective JavaScript code.

## What is a Closure?

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

\`\`\`javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const add5 = outerFunction(5);
console.log(add5(3)); // 8
\`\`\`

## Practical Applications

### 1. Data Privacy
Closures can be used to create private variables:

\`\`\`javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
\`\`\`

### 2. Function Factories
Create specialized functions on demand:

\`\`\`javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);
\`\`\`

Understanding closures will make you a better JavaScript developer and help you write more elegant, functional code.`,
    excerpt: "Explore the intricacies of JavaScript closures and how they can improve your code quality and performance.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=800&h=400&fit=crop",
    authorId: "2",
    published: true,
    featured: true,
    readTime: "5 min read",
    createdAt: new Date("2024-12-12"),
    updatedAt: new Date("2024-12-12"),
    tags: ["javascript", "programming", "closures"]
  },
  {
    id: "3",
    title: "Building a Scalable React Architecture",
    subtitle: "Best practices for large React applications",
    content: `# Building a Scalable React Architecture

As React applications grow in complexity, having a solid architecture becomes crucial for maintainability and scalability.

## Folder Structure

A well-organized folder structure is the foundation of a scalable React app:

\`\`\`
src/
├── components/
│   ├── common/
│   ├── forms/
│   └── layout/
├── pages/
├── hooks/
├── services/
├── utils/
└── types/
\`\`\`

## Component Design Principles

### 1. Single Responsibility
Each component should have one clear purpose.

### 2. Composition over Inheritance
Use composition to build complex UIs from simple components.

### 3. Props Interface Design
Design clear, consistent props interfaces:

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
\`\`\`

## State Management

Choose the right state management solution:
- **Local State**: useState, useReducer
- **Global State**: Context API, Redux, Zustand
- **Server State**: React Query, SWR

## Performance Optimization

- Use React.memo for component memoization
- Implement code splitting with React.lazy
- Optimize bundle size with tree shaking

A well-architected React application is easier to maintain, test, and scale.`,
    excerpt: "Learn how to structure your React applications for maximum scalability and maintainability.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&w=800&h=400&fit=crop",
    authorId: "3",
    published: true,
    featured: true,
    readTime: "7 min read",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10"),
    tags: ["react", "architecture", "best practices"]
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to Use Which",
    subtitle: "A comprehensive guide to modern CSS layout",
    content: `# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes and excel in different scenarios.

## Flexbox: One-Dimensional Layout

Flexbox is designed for one-dimensional layouts - either a row or a column.

### When to Use Flexbox:
- Centering content
- Creating navigation bars
- Distributing space between items
- Aligning items in a container

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid: Two-Dimensional Layout

CSS Grid excels at two-dimensional layouts where you need to control both rows and columns.

### When to Use CSS Grid:
- Creating complex page layouts
- Building responsive grids
- Overlapping elements
- Asymmetrical layouts

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
\`\`\`

## Combining Both

Often, the best approach is to use both:
- Grid for the overall page layout
- Flexbox for component-level alignment

## Browser Support

Both technologies have excellent browser support in modern browsers, making them safe to use in production.

Understanding when to use each tool will help you create more efficient and maintainable CSS.`,
    excerpt: "Learn when to use CSS Grid vs Flexbox for creating efficient and maintainable layouts.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=800&h=400&fit=crop",
    authorId: "4",
    published: true,
    featured: false,
    readTime: "6 min read",
    createdAt: new Date("2024-12-08"),
    updatedAt: new Date("2024-12-08"),
    tags: ["css", "layout", "grid", "flexbox"]
  },
  {
    id: "5",
    title: "The Art of Clean Code: Writing Maintainable Software",
    subtitle: "Principles and practices for better code quality",
    content: `# The Art of Clean Code

Writing clean code is not just about making your code work - it's about making it readable, maintainable, and enjoyable to work with.

## Core Principles

### 1. Meaningful Names
Choose names that reveal intent:

\`\`\`javascript
// Bad
const d = new Date();
const u = users.filter(u => u.age > 18);

// Good
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
\`\`\`

### 2. Functions Should Do One Thing
Keep functions small and focused:

\`\`\`javascript
// Bad
function processUserData(users) {
  // validate data
  // filter users
  // sort users
  // format output
}

// Good
function validateUsers(users) { /* ... */ }
function filterActiveUsers(users) { /* ... */ }
function sortUsersByName(users) { /* ... */ }
\`\`\`

### 3. DRY (Don't Repeat Yourself)
Eliminate code duplication through abstraction.

### 4. SOLID Principles
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

## Code Organization

- Group related functionality
- Use consistent indentation
- Add meaningful comments
- Remove dead code

## Testing

Clean code is testable code. Write tests that are:
- Fast
- Independent
- Repeatable
- Self-validating
- Timely

Remember: Code is read more often than it's written. Make it count.`,
    excerpt: "Discover the principles and practices that lead to clean, maintainable, and readable code.",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&w=800&h=400&fit=crop",
    authorId: "1",
    published: true,
    featured: false,
    readTime: "9 min read",
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-05"),
    tags: ["clean code", "software engineering", "best practices"]
  }
];

// Helper functions to get data
export const getBlogsWithAuthors = (): BlogWithAuthor[] => {
  return mockBlogs.map(blog => ({
    ...blog,
    author: mockUsers.find(user => user.id === blog.authorId)!
  }));
};

export const getFeaturedBlogs = (): BlogWithAuthor[] => {
  return getBlogsWithAuthors().filter(blog => blog.featured);
};

export const getBlogById = (id: string): BlogWithAuthor | undefined => {
  const blog = mockBlogs.find(blog => blog.id === id);
  if (!blog) return undefined;
  
  const author = mockUsers.find(user => user.id === blog.authorId);
  if (!author) return undefined;
  
  return { ...blog, author };
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getBlogsByAuthor = (authorId: string): BlogWithAuthor[] => {
  return getBlogsWithAuthors().filter(blog => blog.authorId === authorId);
};

export const searchBlogs = (query: string): BlogWithAuthor[] => {
  const lowercaseQuery = query.toLowerCase();
  return getBlogsWithAuthors().filter(blog => 
    blog.title.toLowerCase().includes(lowercaseQuery) ||
    blog.content.toLowerCase().includes(lowercaseQuery) ||
    blog.excerpt.toLowerCase().includes(lowercaseQuery) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Auth state management (simple mock with localStorage persistence)
const getStoredAuthState = () => {
  try {
    const stored = localStorage.getItem('mockAuthState');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        isLoggedIn: parsed.isLoggedIn || false,
        currentUser: parsed.currentUser || null,
      };
    }
  } catch (error) {
    console.warn('Failed to parse stored auth state');
  }
  return {
    isLoggedIn: false,
    currentUser: null as User | null,
  };
};

export const mockAuthState = getStoredAuthState();

export const loginUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    mockAuthState.isLoggedIn = true;
    mockAuthState.currentUser = user;
    // Persist to localStorage
    localStorage.setItem('mockAuthState', JSON.stringify(mockAuthState));
    return user;
  }
  return null;
};

export const logoutUser = (): void => {
  mockAuthState.isLoggedIn = false;
  mockAuthState.currentUser = null;
  // Clear from localStorage
  localStorage.removeItem('mockAuthState');
};

export const registerUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  mockUsers.push(newUser);
  return newUser;
};