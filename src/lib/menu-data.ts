import biryaniImg from "@/assets/dish-biryani.jpg";
import kappaMeenImg from "@/assets/dish-kappa-meen.jpg";
import puttumBeefumImg from "@/assets/dish-puttum-beefum.jpg";

export type MenuItem = {
  id: string;
  name: string;
  malayalam?: string;
  description: string;
  price: number;
  category: string;
  veg: boolean;
  signature?: boolean;
  image?: string;
};

export const CATEGORIES = [
  "Kerala Combos",
  "Biryani & Rice",
  "Curries",
  "Breads & Breakfast",
  "Starters",
  "Beverages & Sweets",
] as const;

export const MENU: MenuItem[] = [
  {
    id: "puttum-beefum",
    name: "Puttum Beefum",
    malayalam: "പുട്ടും ബീഫും",
    description:
      "Steamed rice-coconut puttu with slow-roasted Thrissur-style beef ularthiyathu, coconut slivers and curry leaf.",
    price: 180,
    category: "Kerala Combos",
    veg: false,
    signature: true,
    image: puttumBeefumImg,
  },
  {
    id: "kappa-meen",
    name: "Kappa & Meen Curry",
    malayalam: "കപ്പയും മീൻ കറിയും",
    description: "Mashed tapioca with fiery kudampuli fish curry, shallots and coconut oil.",
    price: 210,
    category: "Kerala Combos",
    veg: false,
    signature: true,
    image: kappaMeenImg,
  },
  {
    id: "kerala-sadya",
    name: "Kerala Veg Meals",
    description: "Rice, sambar, avial, thoran, pickle, pappadam and moru — served on banana leaf.",
    price: 130,
    category: "Kerala Combos",
    veg: true,
  },
  {
    id: "malabar-chicken-biryani",
    name: "Malabar Chicken Biryani",
    description: "Kaima rice dum-cooked with chicken, fried shallots, raita and lemon pickle.",
    price: 240,
    category: "Biryani & Rice",
    veg: false,
    signature: true,
    image: biryaniImg,
  },
  {
    id: "mutton-biryani",
    name: "Thalassery Mutton Biryani",
    description: "Tender mutton, whole spice masala, ghee-roasted cashew and mint.",
    price: 320,
    category: "Biryani & Rice",
    veg: false,
  },
  {
    id: "ghee-rice",
    name: "Ghee Rice",
    description: "Fragrant short-grain rice tossed in ghee with cashew and raisin.",
    price: 110,
    category: "Biryani & Rice",
    veg: true,
  },
  {
    id: "beef-ularthiyathu",
    name: "Beef Ularthiyathu",
    description: "Dry-roasted beef, black pepper, coconut chips — the house favourite.",
    price: 260,
    category: "Curries",
    veg: false,
    signature: true,
  },
  {
    id: "nadan-chicken-curry",
    name: "Nadan Chicken Curry",
    description: "Country chicken in roasted coconut masala, thick and deeply spiced.",
    price: 230,
    category: "Curries",
    veg: false,
  },
  {
    id: "meen-pollichathu",
    name: "Meen Pollichathu",
    description: "Pearl spot marinated in kashmiri chilli, wrapped in banana leaf and griddled.",
    price: 340,
    category: "Curries",
    veg: false,
  },
  {
    id: "kadala-curry",
    name: "Kadala Curry",
    description: "Black chana simmered with coconut and fennel — perfect with puttu or appam.",
    price: 90,
    category: "Curries",
    veg: true,
  },
  {
    id: "appam",
    name: "Appam (2 nos)",
    description: "Lacy fermented rice hoppers with soft coconut centre.",
    price: 40,
    category: "Breads & Breakfast",
    veg: true,
  },
  {
    id: "malabar-porotta",
    name: "Malabar Porotta (2 nos)",
    description: "Flaky layered porotta, slapped and folded to order.",
    price: 40,
    category: "Breads & Breakfast",
    veg: true,
  },
  {
    id: "idiyappam",
    name: "Idiyappam & Egg Roast",
    description: "String hoppers with spicy onion-tomato egg roast.",
    price: 120,
    category: "Breads & Breakfast",
    veg: false,
  },
  {
    id: "chicken-65",
    name: "Chicken 65",
    description: "Crisp boneless chicken tossed with curry leaf and green chilli.",
    price: 200,
    category: "Starters",
    veg: false,
  },
  {
    id: "kanthari-prawns",
    name: "Kanthari Prawn Fry",
    description: "Prawns wok-fried with bird's eye chilli, garlic and coconut oil.",
    price: 290,
    category: "Starters",
    veg: false,
    signature: true,
  },
  {
    id: "banana-fritters",
    name: "Pazham Pori",
    description: "Nendran banana fritters in golden batter, served hot.",
    price: 60,
    category: "Starters",
    veg: true,
  },
  {
    id: "sulaimani",
    name: "Sulaimani",
    description: "Spiced black tea with lemon and mint — the Malabar digestif.",
    price: 30,
    category: "Beverages & Sweets",
    veg: true,
  },
  {
    id: "tender-coconut",
    name: "Tender Coconut Payasam",
    description: "Chilled coconut payasam with jaggery and cardamom.",
    price: 90,
    category: "Beverages & Sweets",
    veg: true,
  },
  {
    id: "filter-coffee",
    name: "Kerala Filter Coffee",
    description: "Strong decoction coffee, frothed and served hot.",
    price: 40,
    category: "Beverages & Sweets",
    veg: true,
  },
];

export const RESTAURANT = {
  name: "TERRA Mindspace",
  tagline: "Malabar soul food in the heart of Chalakudy",
  phone: "62380 46258",
  phoneHref: "tel:+916238046258",
  whatsapp: "916238046258",
  address: "Kottatt, Chalakudy, Kerala 680731, India",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=TERRA+Mindspace+Kottatt+Chalakudy+Kerala+680731",
  hours: "11:30 am – 10:30 pm · Every day",
  rating: 4.2,
  reviews: 83,
  priceRange: "₹200–400 per person",
};
