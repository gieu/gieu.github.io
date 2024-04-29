import { z, defineCollection } from 'astro:content';

const researchsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.string().optional(),
        title: z.string(),
        volume: z.number().optional(),
        ISSN: z.string().optional(),
        url: z.string(),
        doi: z.string().optional(),
        number: z.number().optional(),
        journal: z.string(),
        publisher: z.string(),
        author: z.array(z.string()),
        year: z.number(),
        month: z.string()
    })
});

export const collections = {
    'researchs': researchsCollection,
};