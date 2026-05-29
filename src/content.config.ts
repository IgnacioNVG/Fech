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

const pleno = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/pleno',
		generateId: stripExtension,
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
			author: z.string().default('Pleno FECh'),
		}),
});

const centros = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/centros',
		generateId: stripExtension,
	}),
	schema: () =>
		z.object({
			sigla: z.string(),
			nombre: z.string(),
			facultad: z.string(),
			campus: z.string(),
			color: z.string(),
			integrantes: z.array(z.object({
				nombre: z.string(),
				cargo: z.string(),
				email: z.string().optional(),
			})).default([]),
		}),
});

const publicaciones = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/publicaciones',
		generateId: stripExtension,
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
			centro: z.string(),
		}),
});

export const collections = { articulos, pleno, centros, publicaciones };
