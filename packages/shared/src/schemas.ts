import { z } from 'zod';

const LocalizedTextSchema = z.object({
  EN: z.string(),
  VN: z.string()
});

export const ProjectSchema = z.object({
  id: z.string().optional(),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  year: z.string(),
  tags: z.array(z.string()),
  image: z.string().url("Must be a valid URL")
});

export const ExperienceSchema = z.object({
  id: z.string().optional(),
  company: LocalizedTextSchema,
  role: LocalizedTextSchema,
  period: z.string(),
  description: z.array(LocalizedTextSchema)
});

export const TechCategorySchema = z.object({
  id: z.string().optional(),
  name: LocalizedTextSchema,
  iconName: z.string(),
  items: z.array(z.string())
});

export const HeroDataSchema = z.object({
  role: LocalizedTextSchema,
  titleHighlight: LocalizedTextSchema,
  titleSuffix: LocalizedTextSchema,
  description: LocalizedTextSchema
});

export const ObjectiveDataSchema = z.object({
  p1: LocalizedTextSchema,
  p2: LocalizedTextSchema
});

// Github API models
export const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.union([z.number(), z.string()]),
  language: z.string().nullable(),
  updated_at: z.string()
});

export const ContributionDaySchema = z.object({
  date: z.string(),
  count: z.number(),
  level: z.number().min(0).max(4)
});

export const ActivityDataSchema = z.object({
  totalContributions: z.number(),
  contributions: z.array(z.array(ContributionDaySchema))
});
