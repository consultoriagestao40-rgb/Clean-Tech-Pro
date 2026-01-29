'use server';

import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateSetting(key: string, value: string) {
    try {
        await db.insert(settings)
            .values({ key, value })
            .onConflictDoUpdate({
                target: settings.key,
                set: { value }
            });

        revalidatePath('/sobre');
        revalidatePath('/admin/settings');
        return { success: true };
    } catch (error) {
        console.error("Error updating setting:", error);
        return { success: false, error: "Failed to update setting" };
    }
}

export async function getSetting(key: string) {
    try {
        const result = await db.query.settings.findFirst({
            where: eq(settings.key, key)
        });
        return result?.value || null;
    } catch (error) {
        // During build or initial setup, table might not exist
        console.warn(`Could not fetch setting ${key}:`, error);
        return null;
    }
}
