export const FARM_RECIPES = [
  {
    id: "rec-1",
    title: "Artisanal Heirloom Caprese & Wildflower Honey Glaze",
    time: "10 mins",
    difficulty: "Easy",
    servings: "2-4 people",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef2396d?auto=format&fit=crop&w=800&q=80",
    description: "Thick-sliced heirloom tomatoes paired with grass-fed cheese, freshly snipped Genovese basil, and a drizzle of raw mountain honeycomb.",
    ingredients: [
      { name: "Sun-Drenched Heirloom Rainbow Tomatoes", prodId: "prod-1", quantity: "2 lbs" },
      { name: "Sweet Genovese Italian Basil", prodId: "prod-10", quantity: "1 bunch" },
      { name: "Raw Mountain Wildflower Honeycomb", prodId: "prod-2", quantity: "1 tbsp" },
      { name: "100% Grass-Fed Farmstead Aged Gouda", prodId: "prod-3", quantity: "4 oz" }
    ],
    instructions: [
      "Slice heirloom tomatoes into 1/2-inch thick rounds and arrange on a rustic serving platter.",
      "Tuck fresh Italian basil leaves and shavings of farmstead Gouda between tomato slices.",
      "Drizzle with cold-pressed olive oil, flake sea salt, and a touch of raw honeycomb nectar."
    ]
  },
  {
    id: "rec-2",
    title: "Golden Pasture Eggs on Sourdough with Microgreens",
    time: "15 mins",
    difficulty: "Easy",
    servings: "2 people",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Soft-poached golden pasture eggs served over toasted ancient spelt loaf, ripe Haas avocado slices, and zesty radish microgreens.",
    ingredients: [
      { name: "Pastured Heritage Brown Eggs", prodId: "prod-9", quantity: "2 eggs" },
      { name: "Coastal Hass Avocados", prodId: "prod-5", quantity: "1 avocado" },
      { name: "Living Spicy Radish Microgreens", prodId: "prod-8", quantity: "1 handful" },
      { name: "Stone-Ground Whole Spelt Ancient Flour", prodId: "prod-7", quantity: "For loaf" }
    ],
    instructions: [
      "Toast thick slices of rustic spelt bread until crisp and golden brown.",
      "Mash ripe Haas avocado with Meyer lemon juice and sea salt, then spread generously over toast.",
      "Top with soft-poached pasture eggs and a generous crown of freshly snipped radish microgreens."
    ]
  }
];
