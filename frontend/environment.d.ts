declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      // add more environment variables and their types here
    }
  }
}

export {};
