import { z } from 'zod';
import { ProjectSchema, ExperienceSchema, TechCategorySchema, GithubRepoSchema, HeroDataSchema, ObjectiveDataSchema, ActivityDataSchema, ContributionDaySchema } from './schemas';

export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type TechCategory = z.infer<typeof TechCategorySchema>;
export type GithubRepo = z.infer<typeof GithubRepoSchema>;
export type HeroData = z.infer<typeof HeroDataSchema>;
export type ObjectiveData = z.infer<typeof ObjectiveDataSchema>;
export type ActivityData = z.infer<typeof ActivityDataSchema>;
export type ContributionDay = z.infer<typeof ContributionDaySchema>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
