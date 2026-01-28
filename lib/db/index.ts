import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL!;

if (!databaseUrl) {
    // We throw an error in production, but might want to handle it gracefully in dev if not set
    if (process.env.NODE_ENV === 'production') {
        throw new Error('DATABASE_URL is not defined');
    }
}

const sql = neon(databaseUrl || 'postgres://placeholder:placeholder@placeholder.neon.tech/neondb');
export const db = drizzle(sql, { schema });
