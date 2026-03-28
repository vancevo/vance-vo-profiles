import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  year: z.string(),
  tags: z.array(z.string()),
  image: z.string().url("Must be a valid URL")
});

export const ExperienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  period: z.string(),
  description: z.array(z.string())
});

export const TechCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  iconName: z.string(),
  items: z.array(z.string())
});

// Github API models
export const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string()
});
