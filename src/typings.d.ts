declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod';
      PORT: string;
      MONGO_DB: string;
    }
  }
}

export {};
