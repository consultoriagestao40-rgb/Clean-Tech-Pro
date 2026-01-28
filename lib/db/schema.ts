import { pgTable, uuid, text, boolean, decimal, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    shortDescription: text('short_description'),
    fullDescription: text('full_description'),
    imageUrl: text('image_url'),
    category: text('category').notNull(), // 'Lavadoras', 'Varredeiras', etc
    active: boolean('active').default(true).notNull(),
});

export const rentalPlans = pgTable('rental_plans', {
    id: uuid('id').defaultRandom().primaryKey(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
    months: integer('months').notNull(), // 12, 24, 36, 48, 60
    monthlyPrice: decimal('monthly_price', { precision: 10, scale: 2 }).notNull(),
    includesMaintenance: boolean('includes_maintenance').default(true).notNull(),
});
