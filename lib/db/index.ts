import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("CRITICAL ERROR: DATABASE_URL is not defined.");
}

const sql = neon(databaseUrl || 'postgres://missing_env_var:password@host/db');
export const db = drizzle(sql, { schema });
