'use server';

import { db } from "@/lib/db";
import { servicePlans } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createServicePlan(formData: FormData) {
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;
    const description = formData.get("description") as string;
    const isPopular = formData.get("isPopular") === "on";
    const order = parseInt(formData.get("order") as string) || 0;

    if (!name || !categoryId || !description) {
        throw new Error("Missing required fields");
    }

    try {
        await db.insert(servicePlans).values({
            name,
            categoryId,
            description,
            isPopular,
            order,
        });
    } catch (e: any) {
        console.error("Failed to create service plan:", e);
        if (e.message?.includes("relation") && e.message?.includes("does not exist")) {
            throw new Error("A tabela de planos não existe. Por favor, acesse /api/setup-db para criá-la.");
        }
        throw new Error("Erro ao salvar plano: " + e.message);
    }

    revalidatePath('/admin/service-plans');
    revalidatePath(`/categoria`); // Revalidate all categories since they might show this plan
    redirect('/admin/service-plans');
}

export async function deleteServicePlan(formData: FormData) {
    const id = formData.get("id") as string;
    if (!id) return;

    try {
        await db.delete(servicePlans).where(eq(servicePlans.id, id));
        revalidatePath('/admin/service-plans');
        revalidatePath(`/categoria`);
    } catch (e) {
        console.error("Failed to delete plan:", e);
        // We can't easily show a toast from a server action without a client component wrapper,
        // but for now this will at least work.
    }
}
