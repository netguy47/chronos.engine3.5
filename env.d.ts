/**
 * Environment Type Definitions
 * Strongly typed environment variables for the application
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    // Vercel Deployment (optional - only needed for GitHub Actions)
    VERCEL_TOKEN?: string;
    VERCEL_ORG_ID?: string;
    VERCEL_PROJECT_ID?: string;
    VERCEL_ENV?: string;

    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

export {};
