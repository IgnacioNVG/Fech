import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stripExtension = ({ entry }: { entry: string }) =>
	entry.replace(/\.(md|mdx)$/, '');

/** Etiquetas temáticas; no repetir el valor de `category`. */
const tags = z.array(z.string()).default([]);

const articulos = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/articulos',
		generateId: stripExtension,
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
			author: z.string().default('Redacción'),
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stripExtension = ({ entry }: { entry: string }) =>
	entry.replace(/\.(md|mdx)$/, '');

/** Etiquetas temáticas; no repetir el valor de `category`. */
const tags = z.array(z.string()).default([]);

const articulos = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/articulos',
		generateId: stripExtension,
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
			author: z.string().default('Redacción'),
			affiliation: z.string().default('UCh'),
			category: z.enum(['Columna de opinión', 'Entrevista']).default('Columna de opinión'),
			tags,
		}),
});

export const collections = { articulos };
