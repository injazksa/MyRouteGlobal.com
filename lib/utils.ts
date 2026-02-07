import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateCRSScore(age: number, education: number, experience: number, language: number): number {
  let score = 0;
  if (age >= 18 && age <= 29) score += 110;
  else if (age > 29 && age < 45) score += Math.max(0, 110 - (age - 29) * 5);
  score += education * 5;
  score += experience * 15;
  score += language * 12;
  return Math.floor(score);
}
