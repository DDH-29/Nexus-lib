export const THEMES = {
  light: {
    bg: '#F8FAFC',        // Cool Slate White
    primary: '#4F46E5',   // Electric Indigo
    primaryDark: '#3730A3',
    accent: '#0EA5E9',    // Sky Blue
    text: '#0F172A',      // Dark Slate
    cardBg: '#FFFFFF',    // Pure White
    secondaryText: '#64748B', // Slate Grey
    borderColor: '#E2E8F0'
  },
  dark: {
    bg: '#020617',        // Deep Space Black
    primary: '#6366F1',   // Brighter Indigo for dark mode
    primaryDark: '#4338ca',
    accent: '#38BDF8',    // Sky Blue
    text: '#F1F5F9',      // Off-white text
    cardBg: '#1E293B',    // Dark Slate Blue
    secondaryText: '#94A3B8', // Muted Grey
    borderColor: '#334155'
  }
};

export const CATEGORIES = ["All", "Classic", "Sci-Fi", "Science", "Romance", "Fantasy", "History"];

export const BOOKS = [
  { id: 1, title: "The Old Man and the Sea", author: "Ernest Hemingway", genre: "Classic", rating: 4.8, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", desc: "The story of an old Cuban fisherman and his supreme ordeal: a relentless, agonizing battle with a giant marlin." },
  { id: 2, title: "Silent Spring", author: "Rachel Carson", genre: "Science", rating: 4.9, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400", desc: "Documenting the adverse environmental effects caused by the indiscriminate use of pesticides." },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", rating: 4.7, cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400", desc: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides." },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", rating: 4.6, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", desc: "A romantic novel of manners that grounds its historical significance in the 19th century." },
  { id: 5, title: "Cosmos", author: "Carl Sagan", genre: "Science", rating: 5.0, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400", desc: "A personal voyage into the mystery of the universe and the human brain." },
];