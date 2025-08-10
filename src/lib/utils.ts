import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomItem(items: any[]) {
  const i = Math.floor(Math.random() * items.length)
  return items[i]
}


