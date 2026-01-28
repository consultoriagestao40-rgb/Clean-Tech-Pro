'use server';

import { db } from "@/lib/db";
import { products, rentalPlans } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const imageUrl = formData.get('imageUrl') as string;

    // Insert Product
    const [newProduct] = await db.insert(products).values({
        name,
        category,
        shortDescription,
        fullDescription,
        imageUrl,
        active: true,
    }).returning();

    // Handle Plans
    // We expect inputs like plan_12, plan_24, etc.
    const plans = [12, 24, 36, 48, 60];

    for (const months of plans) {
        const priceStr = formData.get(`plan_${months}`) as string;
        if (priceStr) {
            await db.insert(rentalPlans).values({
                productId: newProduct.id,
                months: months,
                monthlyPrice: priceStr.toString(), // Drizzle handles decimal as string/number
                includesMaintenance: true,
            });
        }
    }

    revalidatePath('/');
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function deleteProduct(formData: FormData) {
    const productId = formData.get('id') as string;
    await db.delete(products).where(eq(products.id, productId));

    revalidatePath('/');
    revalidatePath('/admin/products');
}
