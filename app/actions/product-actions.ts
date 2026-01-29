'use server';

import { db } from "@/lib/db";
import { products, rentalPlans, categories } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    // const category = formData.get('category') as string; // Legacy
    const categoryId = formData.get('categoryId') as string;
    let categoryName = 'Outros';

    if (categoryId) {
        const cat = await db.query.categories.findFirst({
            where: eq(categories.id, categoryId)
        });
        if (cat) categoryName = cat.name;
    }

    const shortDescription = formData.get('shortDescription') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const imageUrl = formData.get('imageUrl') as string;

    try {
        // Insert Product
        const [newProduct] = await db.insert(products).values({
            name,
            category: categoryName, // Fallback legacy
            categoryId: categoryId || null,
            shortDescription,
            fullDescription,
            imageUrl,
            active: true,
        }).returning();

        // Handle Plans
        const plans = [12, 24, 36, 48, 60];
        for (const months of plans) {
            const priceStr = formData.get(`plan_${months}`) as string;
            if (priceStr) {
                await db.insert(rentalPlans).values({
                    productId: newProduct.id,
                    months: months,
                    monthlyPrice: priceStr.toString(),
                    includesMaintenance: true,
                });
            }
        }

        revalidatePath('/');
        revalidatePath('/admin/products');
    } catch (error) {
        console.error("❌ FALHA AO CRIAR PRODUTO:", error);
        throw error; // Re-throw to ensure Vercel logs it as an error
    }

    redirect('/admin/products');
}

export async function deleteProduct(formData: FormData) {
    const productId = formData.get('id') as string;
    await db.delete(products).where(eq(products.id, productId));

    revalidatePath('/');
    revalidatePath('/admin/products');
}

export async function updateProduct(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    // const category = formData.get('category') as string;
    const categoryId = formData.get('categoryId') as string;
    let categoryName = 'Outros';

    if (categoryId) {
        const cat = await db.query.categories.findFirst({
            where: eq(categories.id, categoryId)
        });
        if (cat) categoryName = cat.name;
    }

    const shortDescription = formData.get('shortDescription') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const imageUrl = formData.get('imageUrl') as string;

    try {
        // Update Product
        await db.update(products).set({
            name,
            category: categoryName,
            categoryId: categoryId || null,
            shortDescription,
            fullDescription,
            imageUrl,
        }).where(eq(products.id, id));

        // Replace Plans (Delete all and re-create)
        await db.delete(rentalPlans).where(eq(rentalPlans.productId, id));

        const plans = [12, 24, 36, 48, 60];
        for (const months of plans) {
            const priceStr = formData.get(`plan_${months}`) as string;
            if (priceStr) {
                await db.insert(rentalPlans).values({
                    productId: id,
                    months: months,
                    monthlyPrice: priceStr.toString(),
                    includesMaintenance: true,
                });
            }
        }

        revalidatePath('/');
        revalidatePath('/admin/products');
    } catch (error) {
        console.error("❌ FALHA AO ATUALIZAR PRODUTO:", error);
        throw error;
    }

    redirect('/admin/products');
}

export async function toggleProductStatus(formData: FormData) {
    const id = formData.get('id') as string;
    const currentStatus = formData.get('currentStatus') === 'true';

    try {
        await db.update(products)
            .set({ active: !currentStatus })
            .where(eq(products.id, id));

        revalidatePath('/');
        revalidatePath('/admin/products');
    } catch (error) {
        console.error("❌ FALHA AO ALTERAR STATUS:", error);
        throw error;
    }
}
