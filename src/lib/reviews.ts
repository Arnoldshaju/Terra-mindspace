export type Review = {
  id: string;
  dishId: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  photoUrl?: string;
};

export type DishStats = {
  averageRating: number;
  totalReviews: number;
  counts: Record<1 | 2 | 3 | 4 | 5, number>;
};

// Authentic sample reviews for TERRA Mindspace signature dishes
const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    dishId: "puttum-beefum",
    author: "Anand R.",
    rating: 5,
    date: "2026-09-20",
    comment:
      "Hands down the best Thrissur-style beef ularthiyathu in Chalakudy! The puttu was soft and piping hot, and coconut slivers were crispy.",
  },
  {
    id: "rev-2",
    dishId: "puttum-beefum",
    author: "Sneha Menon",
    rating: 5,
    date: "2026-09-18",
    comment:
      "Must try signature dish! The spice blend on the beef is incredible and pairs perfectly with hot tea.",
  },
  {
    id: "rev-3",
    dishId: "puttum-beefum",
    author: "Vipin K.",
    rating: 4,
    date: "2026-09-15",
    comment:
      "Super tasty and generous portion size. Spicier than expected, but absolutely loved it.",
  },
  {
    id: "rev-4",
    dishId: "malabar-chicken-biryani",
    author: "Fahad P.",
    rating: 5,
    date: "2026-09-22",
    comment:
      "Authentic Malabar dum biryani with short-grain kaima rice. The chicken was tender and fried shallots added great aroma.",
  },
  {
    id: "rev-5",
    dishId: "malabar-chicken-biryani",
    author: "Deepa S.",
    rating: 5,
    date: "2026-09-19",
    comment: "Generous portion, fresh raita and pickle. My go-to Sunday lunch order in Chalakudy!",
  },
  {
    id: "rev-6",
    dishId: "kappa-meen",
    author: "Mathew Varghese",
    rating: 5,
    date: "2026-09-21",
    comment: "Kudampuli fish curry with steamed tapioca. Spicy, tangy and rich coconut oil flavor!",
  },
  {
    id: "rev-7",
    dishId: "beef-ularthiyathu",
    author: "Sidharth N.",
    rating: 5,
    date: "2026-09-17",
    comment: "Dark roasted pepper beef. Amazing flavor with Malabar porotta!",
  },
  {
    id: "rev-8",
    dishId: "kanthari-prawns",
    author: "Reshma B.",
    rating: 5,
    date: "2026-09-16",
    comment: "Fresh prawns with bird's eye chilli! Heat level is 10/10.",
  },
  {
    id: "rev-9",
    dishId: "banana-fritters",
    author: "Gokul M.",
    rating: 5,
    date: "2026-09-14",
    comment: "Golden pazham pori with hot chai — perfect evening snack!",
  },
];

const STORAGE_KEY = "terra_dish_reviews_v1";

export function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return INITIAL_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(raw) as Review[];
  } catch (err) {
    console.error("Failed to load reviews from localStorage:", err);
    return INITIAL_REVIEWS;
  }
}

export function saveReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error("Failed to save reviews to localStorage:", err);
  }
}

export function getDishReviews(dishId: string): Review[] {
  const all = getStoredReviews();
  return all.filter((r) => r.dishId === dishId);
}

export function getDishStats(dishId: string): DishStats {
  const reviews = getDishReviews(dishId);
  const counts: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (reviews.length === 0) {
    // Default fallback stats if no reviews yet
    return {
      averageRating: 4.8,
      totalReviews: 5,
      counts: { 5: 4, 4: 1, 3: 0, 2: 0, 1: 0 },
    };
  }

  let totalSum = 0;
  for (const r of reviews) {
    const rounded = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    counts[rounded] = (counts[rounded] || 0) + 1;
    totalSum += r.rating;
  }

  const averageRating = Number((totalSum / reviews.length).toFixed(1));

  return {
    averageRating,
    totalReviews: reviews.length,
    counts,
  };
}

export function addDishReview(newReview: Omit<Review, "id" | "date">): Review {
  const all = getStoredReviews();
  const created: Review = {
    ...newReview,
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split("T")[0] ?? "2026-09-23",
  };
  const updated = [created, ...all];
  saveReviews(updated);
  return created;
}
