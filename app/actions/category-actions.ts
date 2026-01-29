'use server';

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createCategory(formData: FormData) {
    const name = formData.get('name') as string;
    const imageUrl = formData.get('imageUrl') as string;
    // Generate slug from name
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        await db.insert(categories).values({
            name,
            slug,
            imageUrl,
            active: true,
        });

        revalidatePath('/admin/categories');
    } catch (error) {
        console.error("❌ Failed to create category:", error);
        throw error;
    }

    redirect('/admin/categories');
}

export async function updateCategory(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const imageUrl = formData.get('imageUrl') as string;

    try {
        await db.update(categories).set({
            name,
            imageUrl,
        }).where(eq(categories.id, id));

        revalidatePath('/admin/categories');
    } catch (error) {
        console.error("❌ Failed to update category:", error);
        throw error;
    }

    redirect('/admin/categories');
}

export async function deleteCategory(formData: FormData) {
    const id = formData.get('id') as string;
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/categories');
}

export async function toggleCategoryStatus(formData: FormData) {
    const id = formData.get('id') as string;
    const currentStatus = formData.get('currentStatus') === 'true';

    await db.update(categories)
        .set({ active: !currentStatus })
        .where(eq(categories.id, id));

    revalidatePath('/admin/categories');
}
