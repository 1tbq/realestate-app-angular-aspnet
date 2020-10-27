// src/app/auth/auth.config.ts
import { ENV } from './env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '6pPu0cq2bwMz09lE5xeXGrj5ePGy6Wd0',
  CLIENT_DOMAIN: 'properties9.au.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://api.property.com', // e.g., http://localhost:8083/api/
  REDIRECT: 'http://localhost:4200/properties',
  SCOPE: 'openid profile',
  NAMESPACE: 'https://properties.com/roles'
};
