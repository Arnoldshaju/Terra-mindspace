export type AiIngredientInfo = {
  name: string;
  origin: string;
  benefit: string;
};

export type AiDishInsight = {
  dishId: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  healthTags: string[];
  heritageStory: string;
  keyIngredients: AiIngredientInfo[];
};

export const AI_DISH_INSIGHTS: Record<string, AiDishInsight> = {
  "puttum-beefum": {
    dishId: "puttum-beefum",
    calories: 520,
    protein: 34,
    carbs: 48,
    fat: 20,
    fiber: 6,
    healthTags: ["High Protein", "Iron Rich", "Authentic Heritage"],
    heritageStory:
      "A timeless Thrissur breakfast staple. The beef is slow-marinated with crushed red shallots, wild curry leaves, and black pepper from the Western Ghats foothills, then slow-roasted with toasted coconut slivers until caramelised.",
    keyIngredients: [
      {
        name: "Wayanad Black Pepper",
        origin: "Wayanad Hills, Kerala",
        benefit: "Rich in piperine which enhances nutrient absorption and boosts metabolism.",
      },
      {
        name: "Fresh Coconut Slivers",
        origin: "Chalakudy Coconut Groves",
        benefit: "Provides healthy medium-chain triglycerides (MCTs) for sustained energy.",
      },
      {
        name: "Steamed Rice Puttu",
        origin: "Local Stone Ground Rice",
        benefit: "Easy to digest, gluten-free complex carbs steamed with freshly grated coconut.",
      },
    ],
  },
  "kappa-meen": {
    dishId: "kappa-meen",
    calories: 440,
    protein: 28,
    carbs: 52,
    fat: 14,
    fiber: 5,
    healthTags: ["Omega-3 Rich", "Gut Health", "Gluten Free"],
    heritageStory:
      "The quintessential Travancore fisherman's delight. Fresh tapioca root is boiled with turmeric and crushed shallots, accompanied by a fiery red fish curry simmered in clay pots with sun-dried Kudampuli (Garcinia cambogia).",
    keyIngredients: [
      {
        name: "Kudampuli (Malabar Tamarind)",
        origin: "Central Travancore, Kerala",
        benefit: "Natural antioxidant known for digestive wellness and appetite regulation.",
      },
      {
        name: "Mashed Tapioca (Kappa)",
        origin: "Thrissur Organic Farms",
        benefit: "Rich in resistant starch that feeds beneficial gut bacteria.",
      },
      {
        name: "Cold-Pressed Coconut Oil",
        origin: "Kerala Mill Estate",
        benefit: "Contains lauric acid which supports immune system health.",
      },
    ],
  },
  "kerala-sadya": {
    dishId: "kerala-sadya",
    calories: 490,
    protein: 16,
    carbs: 82,
    fat: 12,
    fiber: 9,
    healthTags: ["Vegetarian", "Probiotic Rich", "High Fiber"],
    heritageStory:
      "Served on a fresh banana leaf, this plant-based feast highlights Kerala's Ayurvedic culinary principles — balancing sweet, sour, salty, bitter, pungent, and astringent flavors across moru, sambar, avial, and pickles.",
    keyIngredients: [
      {
        name: "Curd & Moru (Buttermilk)",
        origin: "Traditional Dairy Farm",
        benefit: "Probiotic powerhouse that aids digestion and cools the body.",
      },
      {
        name: "Avial Mixed Vegetables",
        origin: "Local Farmers Market",
        benefit: "Loaded with vitamins A, C, and dietary fiber from drumsticks and ash gourd.",
      },
    ],
  },
  "malabar-chicken-biryani": {
    dishId: "malabar-chicken-biryani",
    calories: 680,
    protein: 42,
    carbs: 76,
    fat: 24,
    fiber: 4,
    healthTags: ["High Protein", "Aromatic Spices", "Satisfying Meal"],
    heritageStory:
      "Originating from the Moplah culinary tradition in Thalassery. Made exclusively with short-grain Kaima (Jeerakasala) rice instead of Basmati, sealed with dough (Dum cooked) with ghee-roasted cashews, raisins, and aromatic green cardamom.",
    keyIngredients: [
      {
        name: "Kaima (Jeerakasala) Rice",
        origin: "Malabar Region",
        benefit:
          "Fragrant short grain rice with a low glycemic index compared to standard white rice.",
      },
      {
        name: "Pure Country Ghee",
        origin: "Kerala Village Co-op",
        benefit: "Rich in fat-soluble vitamins A, E, and K.",
      },
      {
        name: "Cardamom & Cloves",
        origin: "Cardamom Hills, Idukki",
        benefit: "Natural digestive stimulant and oral health booster.",
      },
    ],
  },
  "mutton-biryani": {
    dishId: "mutton-biryani",
    calories: 740,
    protein: 46,
    carbs: 72,
    fat: 30,
    fiber: 4,
    healthTags: ["High Protein", "Iron & B12 Rich", "Traditional Dum"],
    heritageStory:
      "Tender goat meat slow-cooked with roasted mace, star anise, nutmeg, and fried shallots. The meat juices infuse deep savory umami straight into the Kaima rice during the sealed dum process.",
    keyIngredients: [
      {
        name: "Nutmeg & Mace (Jathikka)",
        origin: "Angamaly Nutmeg Orchards",
        benefit: "Known in Ayurveda for calming properties and relieving digestive discomfort.",
      },
      {
        name: "Free-range Mutton",
        origin: "Local Ethical Farms",
        benefit: "Excellent source of bioavailable heme iron and Vitamin B12.",
      },
    ],
  },
  "ghee-rice": {
    dishId: "ghee-rice",
    calories: 380,
    protein: 7,
    carbs: 58,
    fat: 14,
    fiber: 2,
    healthTags: ["Vegetarian", "Comfort Food", "Gluten Free"],
    heritageStory:
      "Fragrant Kaima rice gently sautéed in golden cow ghee with fried cashews, raisins, and sweet whole spices. A comforting Malabar classic served alongside rich chicken or beef curry.",
    keyIngredients: [
      {
        name: "Golden Cashews",
        origin: "Kollam Cashew Capital",
        benefit: "Packed with heart-healthy monounsaturated fats and magnesium.",
      },
    ],
  },
  "beef-ularthiyathu": {
    dishId: "beef-ularthiyathu",
    calories: 460,
    protein: 38,
    carbs: 12,
    fat: 28,
    fiber: 3,
    healthTags: ["Keto Friendly", "High Protein", "Signature Spice"],
    heritageStory:
      "Slow-marinated beef cubes roasted in a heavy iron uruli till dark and glistening. Seasoned with crushed shallots, crushed green chillies, mustard seeds, and fried coconut chips.",
    keyIngredients: [
      {
        name: "Fresh Curry Leaves",
        origin: "Chalakudy Kitchen Garden",
        benefit: "Rich in plant alkaloids, iron, and blood-sugar balancing properties.",
      },
    ],
  },
  "nadan-chicken-curry": {
    dishId: "nadan-chicken-curry",
    calories: 420,
    protein: 36,
    carbs: 14,
    fat: 24,
    fiber: 3,
    healthTags: ["High Protein", "Immunity Booster"],
    heritageStory:
      "Country chicken simmered in roasted coconut gravy with coriander seeds, fennel, and Kashmiri chilli. Deeply spiced with an intoxicating aroma.",
    keyIngredients: [
      {
        name: "Roasted Coriander Seeds",
        origin: "Palakkad Spice Mills",
        benefit: "Helps lower cholesterol and promotes healthy kidney function.",
      },
    ],
  },
  "meen-pollichathu": {
    dishId: "meen-pollichathu",
    calories: 390,
    protein: 35,
    carbs: 10,
    fat: 22,
    fiber: 3,
    healthTags: ["Omega-3 Rich", "Low Carb", "Banana Leaf Grilled"],
    heritageStory:
      "Pearl Spot (Karimeen) coated in Kashmiri chilli and Shallot masala, wrapped in a charred banana leaf and pan-grilled. The leaf imparts a smoky botanical fragrance to the tender fish.",
    keyIngredients: [
      {
        name: "Banana Leaf Wrap",
        origin: "Local Farm",
        benefit: "Infuses polyphenols (antioxidants) into the fish during natural steam grilling.",
      },
      {
        name: "Kashmiri Chilli",
        origin: "High Range Spices",
        benefit: "Vibrant natural color with mild heat and high Vitamin C content.",
      },
    ],
  },
  "kanthari-prawns": {
    dishId: "kanthari-prawns",
    calories: 320,
    protein: 32,
    carbs: 8,
    fat: 18,
    fiber: 2,
    healthTags: ["Low Carb", "Metabolism Boost", "High Protein"],
    heritageStory:
      "Fresh sea prawns tossed with crushed Kanthari (bird's eye chilli) and garlic in coconut oil. Kanthari is Kerala's fiercest chilli pepper, prized in traditional wellness remedies.",
    keyIngredients: [
      {
        name: "Kanthari (Bird's Eye Chilli)",
        origin: "Highland Homesteads",
        benefit: "Contains high capsicum concentration that ignites metabolism and circulation.",
      },
    ],
  },
  "banana-fritters": {
    dishId: "banana-fritters",
    calories: 240,
    protein: 3,
    carbs: 42,
    fat: 8,
    fiber: 4,
    healthTags: ["Vegetarian", "Potassium Rich", "Teatime Classic"],
    heritageStory:
      "Ripe Nendran bananas sliced long, dipped in turmeric-tinged golden batter, and fried crisp. The ultimate evening tea pairing across Malabar tea shops.",
    keyIngredients: [
      {
        name: "Nendran Bananas",
        origin: "Thrissur Plantations",
        benefit: "Rich in potassium, vitamin B6, and natural sweet energy.",
      },
    ],
  },
  sulaimani: {
    dishId: "sulaimani",
    calories: 35,
    protein: 0,
    carbs: 8,
    fat: 0,
    fiber: 0,
    healthTags: ["Zero Fat", "Digestive Tea", "Antioxidant Rich"],
    heritageStory:
      "An iconic Malabar black tea steeped with crushed cardamom, cinnamon, fresh lemon juice, and mint leaves. Traditionally served after rich biryanis as a refreshing digestif.",
    keyIngredients: [
      {
        name: "Fresh Mint & Lemon Juice",
        origin: "Mindspace Herb Garden",
        benefit: "Cleanses palate, aids digestion, and alkalinizes the body.",
      },
    ],
  },
};

export function getAiDishInsight(dishId: string): AiDishInsight {
  const insight = AI_DISH_INSIGHTS[dishId];
  if (insight) return insight;

  // Default fallback for items not explicitly listed
  return {
    dishId,
    calories: 350,
    protein: 18,
    carbs: 40,
    fat: 12,
    fiber: 4,
    healthTags: ["Freshly Cooked", "Authentic Kerala"],
    heritageStory:
      "Prepared fresh to order using traditional Kerala spice blends, cold-pressed coconut oil, and locally sourced ingredients from Chalakudy markets.",
    keyIngredients: [
      {
        name: "Kerala Whole Spices",
        origin: "Western Ghats",
        benefit: "Natural source of digestive essential oils and antioxidants.",
      },
    ],
  };
}

export type CartNutritionSummary = {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  healthGrade: string;
  summaryText: string;
};

export function calculateCartNutrition(
  items: Array<{ id: string; quantity: number }>,
): CartNutritionSummary {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;

  for (const item of items) {
    const insight = getAiDishInsight(item.id);
    const qty = item.quantity || 1;
    totalCalories += insight.calories * qty;
    totalProtein += insight.protein * qty;
    totalCarbs += insight.carbs * qty;
    totalFat += insight.fat * qty;
    totalFiber += insight.fiber * qty;
  }

  let healthGrade = "Balanced Meal ⚖️";
  let summaryText = "Good balance of carbohydrates, proteins, and healthy fats.";

  if (totalProtein >= 50) {
    healthGrade = "High Protein Power 💪";
    summaryText = "Excellent protein density for muscle recovery and long-lasting satiety.";
  } else if (totalFiber >= 10) {
    healthGrade = "Digestive Wellness 🌿";
    summaryText = "Rich in dietary fiber and gut-friendly Kerala spices.";
  }

  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    totalFiber,
    healthGrade,
    summaryText,
  };
}
