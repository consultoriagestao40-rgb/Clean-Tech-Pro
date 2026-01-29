'use server';

import { db } from "@/lib/db";
import { servicePlans } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createServicePlan(formData: FormData) {
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;
    const description = formData.get("description") as string;
    const isPopular = formData.get("isPopular") === "on";
    const order = parseInt(formData.get("order") as string) || 0;

    if (!name || !categoryId || !description) {
        throw new Error("Missing required fields");
    }

    await db.insert(servicePlans).values({
        name,
        categoryId,
        description,
        isPopular,
        order,
    });

    revalidatePath('/admin/service-plans');
    revalidatePath(`/categoria`); // Revalidate all categories since they might show this plan
    redirect('/admin/service-plans');
}
