
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Create Categories Table
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "categories" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" text NOT NULL,
                "slug" text NOT NULL UNIQUE,
                "image_url" text,
                "active" boolean DEFAULT true NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS "settings" (
                "key" text PRIMARY KEY,
                "value" text NOT NULL
            );
        `);

        // Add category_id to products if not exists
        // Note: Adding column if not exists in Postgres requires a specific block or ignoring error
        try {
            await db.execute(sql`
                ALTER TABLE "products" ADD COLUMN "category_id" uuid REFERENCES "categories"("id");
            `);
        } catch (e: any) {
            // Ignore "column already exists" error
            if (!e.message.includes("already exists")) {
                console.log("Column might already exist:", e.message);
            }
        }

        // Populate default categories if empty
        const count = await db.execute(sql`SELECT count(*) from "categories"`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((count as any).rows?.[0]?.count === '0' || (count as any)[0]?.count === '0') {
            await db.execute(sql`
                INSERT INTO "categories" ("name", "slug", "image_url") VALUES
                ('Lavadoras de Piso', 'lavadoras-de-piso', 'https://www.tennant.com.br/wp-content/uploads/2021/05/T7_Hero.jpg'),
                ('Varredeiras de Piso', 'varredeiras-de-piso', 'https://www.tennant.com.br/wp-content/uploads/2021/05/S20_Hero.jpg'),
                ('Peças e Consumíveis', 'pecas-e-consumiveis', 'https://www.tennant.com.br/wp-content/uploads/2021/05/Pecas-Hero.jpg'),
                ('Serviço e Manutenção', 'servico-e-manutencao', 'https://www.tennant.com.br/wp-content/uploads/2021/05/Service-Hero.jpg');
            `);
        }

        // Create Service Plans Table
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "service_plans" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" text NOT NULL,
                "description" text NOT NULL,
                "category_id" uuid REFERENCES "categories"("id") ON DELETE CASCADE NOT NULL,
                "is_popular" boolean DEFAULT false NOT NULL,
                "order" integer DEFAULT 0 NOT NULL
            );
        `);

        // Seed default plans for Lavadoras if empty
        const plansCount = await db.execute(sql`SELECT count(*) from "service_plans"`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((plansCount as any).rows?.[0]?.count === '0' || (plansCount as any)[0]?.count === '0') {
            // Find Lavadoras category ID
            const lavadoras = await db.execute(sql`SELECT id FROM categories WHERE slug = 'lavadoras-de-piso' LIMIT 1`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const lavadorasId = (lavadoras as any).rows?.[0]?.id || (lavadoras as any)[0]?.id;

            if (lavadorasId) {
                await db.execute(sql`
                    INSERT INTO "service_plans" ("name", "description", "category_id", "is_popular", "order") VALUES
                    ('1 - Ouro', 'Incluso: Manutenção, Mão de Obra, Peças, Água Destilada e Deslocamento do técnico autorizado TENNANT COMPANY. Não Incluso: Combustíveis e Químicos.', '${sql.raw(lavadorasId)}', false, 1),
                    ('2 - Prata', 'Incluso: Igual ao Ouro. Não Incluso: Combustíveis, Químicos, Escovas e Discos.', '${sql.raw(lavadorasId)}', true, 2),
                    ('3 - Bronze', 'Incluso: Igual ao Ouro. Não Incluso: Combustíveis, Água Destilada, Químicos, Escovas, Discos e Baterias.', '${sql.raw(lavadorasId)}', false, 3),
                    ('4 - MOB', 'Incluso Somente Manutenção, Mão de Obra, e Deslocamento do técnico autorizado TENNANT COMPANY.', '${sql.raw(lavadorasId)}', false, 4);
                `);
            }
        }

        return NextResponse.json({ success: true, message: "Migration executed" });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
