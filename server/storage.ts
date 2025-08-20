import { type User, type InsertUser, type Article, type InsertArticle, type ArticleWithAuthor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticle(id: string): Promise<ArticleWithAuthor | undefined>;
  getArticles(options?: { featured?: boolean; limit?: number; offset?: number }): Promise<ArticleWithAuthor[]>;
  getArticlesByAuthor(authorId: string): Promise<ArticleWithAuthor[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  searchArticles(query: string): Promise<ArticleWithAuthor[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private articles: Map<string, Article>;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.seedData();
  }

  private seedData() {
    // Create sample users
    const user1: User = {
      id: "1",
      username: "sarah_johnson",
      email: "sarah@example.com",
      password: "hashedpassword",
      name: "Sarah Johnson",
      bio: "Full-stack developer passionate about modern web technologies",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=100&h=100&fit=crop&crop=face",
      createdAt: new Date(),
    };

    const user2: User = {
      id: "2",
      username: "emma_davis",
      email: "emma@example.com",
      password: "hashedpassword",
      name: "Emma Davis",
      bio: "JavaScript enthusiast and technical writer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&w=100&h=100&fit=crop&crop=face",
      createdAt: new Date(),
    };

    const user3: User = {
      id: "3",
      username: "mike_thompson",
      email: "mike@example.com",
      password: "hashedpassword",
      name: "Mike Thompson",
      bio: "React specialist and architecture consultant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=100&h=100&fit=crop&crop=face",
      createdAt: new Date(),
    };

    this.users.set(user1.id, user1);
    this.users.set(user2.id, user2);
    this.users.set(user3.id, user3);

    // Create sample articles
    const article1: Article = {
      id: "1",
      title: "The Future of Web Development: Building Scalable Applications",
      subtitle: "Discover the latest trends and best practices in modern web development",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      excerpt: "Discover the latest trends and best practices in modern web development, from React patterns to deployment strategies.",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=600&h=400&fit=crop",
      authorId: user1.id,
      published: true,
      featured: true,
      readTime: "8 min read",
      createdAt: new Date("2024-12-15"),
      updatedAt: new Date("2024-12-15"),
    };

    const article2: Article = {
      id: "2",
      title: "Understanding JavaScript Closures: A Deep Dive",
      subtitle: "Master one of JavaScript's most powerful features",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      excerpt: "Explore the intricacies of JavaScript closures and how they can improve your code quality and performance.",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=400&h=200&fit=crop",
      authorId: user2.id,
      published: true,
      featured: true,
      readTime: "5 min read",
      createdAt: new Date("2024-12-12"),
      updatedAt: new Date("2024-12-12"),
    };

    const article3: Article = {
      id: "3",
      title: "Building a Scalable React Architecture",
      subtitle: "Best practices for large React applications",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      excerpt: "Learn how to structure your React applications for maximum scalability and maintainability.",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&w=400&h=200&fit=crop",
      authorId: user3.id,
      published: true,
      featured: true,
      readTime: "7 min read",
      createdAt: new Date("2024-12-10"),
      updatedAt: new Date("2024-12-10"),
    };

    this.articles.set(article1.id, article1);
    this.articles.set(article2.id, article2);
    this.articles.set(article3.id, article3);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getArticle(id: string): Promise<ArticleWithAuthor | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    if (!author) return undefined;
    
    return { ...article, author };
  }

  async getArticles(options: { featured?: boolean; limit?: number; offset?: number } = {}): Promise<ArticleWithAuthor[]> {
    let articles = Array.from(this.articles.values())
      .filter(article => article.published)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options.featured !== undefined) {
      articles = articles.filter(article => article.featured === options.featured);
    }

    if (options.offset) {
      articles = articles.slice(options.offset);
    }

    if (options.limit) {
      articles = articles.slice(0, options.limit);
    }

    const articlesWithAuthors: ArticleWithAuthor[] = [];
    for (const article of articles) {
      const author = await this.getUser(article.authorId);
      if (author) {
        articlesWithAuthors.push({ ...article, author });
      }
    }

    return articlesWithAuthors;
  }

  async getArticlesByAuthor(authorId: string): Promise<ArticleWithAuthor[]> {
    const articles = Array.from(this.articles.values())
      .filter(article => article.authorId === authorId && article.published)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const author = await this.getUser(authorId);
    if (!author) return [];

    return articles.map(article => ({ ...article, author }));
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const now = new Date();
    const article: Article = {
      ...insertArticle,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: string, updateData: Partial<InsertArticle>): Promise<Article | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;

    const updatedArticle: Article = {
      ...article,
      ...updateData,
      updatedAt: new Date(),
    };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }

  async searchArticles(query: string): Promise<ArticleWithAuthor[]> {
    const lowercaseQuery = query.toLowerCase();
    const articles = Array.from(this.articles.values())
      .filter(article => 
        article.published && (
          article.title.toLowerCase().includes(lowercaseQuery) ||
          article.content.toLowerCase().includes(lowercaseQuery) ||
          article.excerpt.toLowerCase().includes(lowercaseQuery)
        )
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const articlesWithAuthors: ArticleWithAuthor[] = [];
    for (const article of articles) {
      const author = await this.getUser(article.authorId);
      if (author) {
        articlesWithAuthors.push({ ...article, author });
      }
    }

    return articlesWithAuthors;
  }
}

export const storage = new MemStorage();
