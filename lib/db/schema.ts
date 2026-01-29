import { pgTable, uuid, text, boolean, decimal, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    shortDescription: text('short_description'),
    fullDescription: text('full_description'),
    imageUrl: text('image_url'),
    category: text('category').notNull(), // LEGACY: Kept for backward compatibility
    categoryId: uuid('category_id').references(() => categories.id),
    // categoryName: text('category_name'), // Redundant if we have categoryId relation, but useful if no join
    active: boolean('active').default(true).notNull(),
});

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    imageUrl: text('image_url'),
    active: boolean('active').default(true).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    products: many(products),
}));

export const productsRelations = relations(products, ({ many, one }) => ({
    rentalPlans: many(rentalPlans),
    category: one(categories, {
        fields: [products.categoryId],
        references: [categories.id],
    }),
}));

export const rentalPlans = pgTable('rental_plans', {
    id: uuid('id').defaultRandom().primaryKey(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
    months: integer('months').notNull(), // 12, 24, 36, 48, 60
    monthlyPrice: decimal('monthly_price', { precision: 10, scale: 2 }).notNull(),
    includesMaintenance: boolean('includes_maintenance').default(true).notNull(),
});

export const settings = pgTable('settings', {
    key: text('key').primaryKey(),
    value: text('value').notNull(),
});

export const rentalPlansRelations = relations(rentalPlans, ({ one }) => ({
    product: one(products, {
        fields: [rentalPlans.productId],
        references: [products.id],
    }),
}));
