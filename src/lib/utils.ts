import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// cn is a classnames utility that merges tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// fetcher function for SWR
export const fetcher = (url: string) => fetch(url).then((res) => res.json())

// mocking a fake data for optimistic update
export const mockOptimisticData = <T extends Array<any>>(
  newData: object,
  oldData: T
): T => {
  const mockNewData = {
    ...newData,
    id: Math.random() * 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return [...oldData, mockNewData] as T
}
