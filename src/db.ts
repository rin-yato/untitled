import { Icon } from "@/components/icons"

export type Category = {
  name: string
  icon: Icon
  items: Array<MenuItem>
}

export type MenuItem = {
  name: string
  price: number
}

export const categories: Array<Category> = [
  {
    name: "Meat",
    icon: "beef",
    items: [
      { name: "Plain Meat", price: 7.5 },
      { name: "Breast Meat", price: 7.5 },
      { name: "Mixed Meat", price: 7.5 },
      { name: "Testicles", price: 25 },
    ],
  },
  {
    name: "Soup",
    icon: "soup",
    items: [
      { name: "Small Soup", price: 10 },
      { name: "Large Soup", price: 12.5 },
      { name: "Special Soup", price: 30 },
    ],
  },
  {
    name: "Sides",
    icon: "apple",
    items: [
      { name: "Okra", price: 0.75 },
      { name: "Smol Egg", price: 0.5 },
      { name: "Khmer Noodle", price: 0.75 },
      { name: "Soup Veggies", price: 0.75 },
    ],
  },
  {
    name: "Drinks",
    icon: "glassWater",
    items: [
      { name: "Juice", price: 0.75 },
      { name: "Water", price: 0.25 },
    ],
  },
  {
    name: "Alcohol",
    icon: "beer",
    items: [
      { name: "ABC", price: 1.75 },
      { name: "Angkor", price: 1.25 },
      { name: "Heineken", price: 1.5 },
      { name: "Tiger L", price: 1.5 },
      { name: "Anchor L", price: 1.25 },
      { name: "Anchor S", price: 1 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
      { name: "Cambodia", price: 1.25 },
    ],
  },
]
