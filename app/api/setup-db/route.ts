
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log("Starting migration...");

        // 1. Create Categories Table
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "categories" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" text NOT NULL,
                "slug" text NOT NULL UNIQUE,
                "image_url" text,
                "active" boolean DEFAULT true NOT NULL
            );
        `);
        console.log("Categories table checked/created.");

        // 2. Create Settings Table
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "settings" (
                "key" text PRIMARY KEY,
                "value" text NOT NULL
            );
        `);
        console.log("Settings table checked/created.");

        // 3. Add category_id to products
        try {
            await db.execute(sql`
                ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category_id" uuid REFERENCES "categories"("id");
            `);
        } catch (e: any) {
            console.log("Column category_id check:", e.message);
        }

        // 4. Populate default categories
        const countRes = await db.execute(sql`SELECT count(*) from "categories"`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const count = Number((countRes as any).rows?.[0]?.count || (countRes as any)[0]?.count || 0);

        if (count === 0) {
            await db.execute(sql`
                INSERT INTO "categories" ("name", "slug", "image_url") VALUES
                ('Lavadoras de Piso', 'lavadoras-de-piso', 'https://www.tennant.com.br/wp-content/uploads/2021/05/T7_Hero.jpg'),
                ('Varredeiras de Piso', 'varredeiras-de-piso', 'https://www.tennant.com.br/wp-content/uploads/2021/05/S20_Hero.jpg'),
                ('Peças e Consumíveis', 'pecas-e-consumiveis', 'https://www.tennant.com.br/wp-content/uploads/2021/05/Pecas-Hero.jpg'),
                ('Serviço e Manutenção', 'servico-e-manutencao', 'https://www.tennant.com.br/wp-content/uploads/2021/05/Service-Hero.jpg');
            `);
            console.log("Default categories seeded.");
        }

        // 5. Create Service Plans Table
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
        console.log("Service Plans table checked/created.");

        // 6. Seed default plans
        const plansCountRes = await db.execute(sql`SELECT count(*) from "service_plans"`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const plansCount = Number((plansCountRes as any).rows?.[0]?.count || (plansCountRes as any)[0]?.count || 0);

        if (plansCount === 0) {
            const lavadorasRes = await db.execute(sql`SELECT id FROM categories WHERE slug = 'lavadoras-de-piso' LIMIT 1`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const lavadorasId = (lavadorasRes as any).rows?.[0]?.id || (lavadorasRes as any)[0]?.id;

            if (lavadorasId) {
                // Using separate INSERTs to be safe against driver quirks with multi-values if needed, 
                // but standard multi-value insert is usually fine.
                // Updated descriptions based on user feedback/print.
                await db.execute(sql`
                    INSERT INTO "service_plans" ("name", "description", "category_id", "is_popular", "order") VALUES
                    ('1 - Ouro', 'Incluso: Manutenção, Mão de Obra, Peças, Água Destilada e Deslocamento. Não Incluso: Combustíveis e Químicos.', '${sql.raw(lavadorasId)}', false, 1),
                    ('2 - Prata', 'Incluso: Igual ao Ouro. Não Incluso: Combustíveis, Químicos, Escovas e Discos.', '${sql.raw(lavadorasId)}', true, 2),
                    ('3 - Bronze', 'Incluso: Igual ao Ouro. Não Incluso: Combustíveis, Água Destilada, Químicos, Escovas, Discos e Baterias.', '${sql.raw(lavadorasId)}', false, 3),
                    ('4 - MOB', 'Incluso Somente Manutenção, Mão de Obra, e Deslocamento.', '${sql.raw(lavadorasId)}', false, 4);
                `);
                console.log("Service plans seeded.");
            }
        }

        return NextResponse.json({ success: true, message: "Migration executed successfully in steps." });
    } catch (error) {
        console.error("Migration fatal error:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
