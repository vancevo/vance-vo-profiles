import { z } from 'zod';
import { ProjectSchema, ExperienceSchema, TechCategorySchema, GithubRepoSchema } from './schemas';

export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type TechCategory = z.infer<typeof TechCategorySchema>;
export type GithubRepo = z.infer<typeof GithubRepoSchema>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
