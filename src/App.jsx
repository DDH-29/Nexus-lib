import React, { useState } from 'react';
import { Search, Star, Heart, X, Zap, List, Grid, Bot } from 'lucide-react'; // Added 'Bot' icon
import { THEMES, CATEGORIES, BOOKS } from './constants';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [studyMode, setStudyMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Set Dark Mode to true by default
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Get current theme colors based on state
  const colors = isDarkMode ? THEMES.dark : THEMES.light;

  // 1. Primary Filter Logic (Category + Search)
  const filteredBooks = BOOKS.filter(book => {
    const matchesCategory = activeCategory === "All" || book.genre === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Suggestion Logic (Runs only when no results found)
  // It searches the ENTIRE library (BOOKS) ignoring categories.
  const getSuggestions = () => {
    if (!searchQuery) return [];
    
    // Try to find books that match at least ONE word from the search
    const searchWords = searchQuery.toLowerCase().split(" ").filter(w => w.length > 2);
    
    let suggestions = BOOKS.filter(book => {
        // Don't show books that were already filtered out (though here filteredBooks is empty)
        return searchWords.some(word => 
            book.title.toLowerCase().includes(word) || 
            book.author.toLowerCase().includes(word)
        );
    });

    // If loose matching fails, just show the top-rated books as a fallback
    if (suggestions.length === 0) {
        suggestions = BOOKS.filter(b => b.rating >= 4.8).slice(0, 3);
    }

    // Limit to 4 suggestions
    return suggestions.slice(0, 4);
  };

  const suggestedBooks = filteredBooks.length === 0 ? getSuggestions() : [];

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }} className="relative transition-colors duration-300 overflow-x-hidden">
      
      <Navbar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setSearchQuery={setSearchQuery}
        studyMode={studyMode}
        setStudyMode={setStudyMode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        colors={colors}
      />

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] -z-10 transition-colors duration-500"
             style={{ backgroundColor: isDarkMode ? '#6366f120' : '#c7d2fe60' }}></div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight" style={{ color: colors.text }}>
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400">Knowledge</span> Hub.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: colors.secondaryText }}>
          Connect with your next great adventure. A modern archive for the digital age.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 group-focus-within:text-indigo-500 transition-colors" style={{ color: colors.secondaryText }} />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 rounded-2xl shadow-xl border-0 ring-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg transition-all"
            style={{ backgroundColor: colors.cardBg, color: colors.text, ringColor: colors.borderColor }}
            placeholder="Search the Nexus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Filters */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          <div className="flex overflow-x-auto gap-3 no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md flex-shrink-0 border`}
                style={{ 
                  backgroundColor: activeCategory === cat ? colors.primary : colors.cardBg,
                  color: activeCategory === cat ? '#fff' : colors.text,
                  borderColor: activeCategory === cat ? colors.primary : colors.borderColor
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. Conditional Rendering: Results OR No Results State --- */}
        {filteredBooks.length > 0 ? (
          // A. SHOW RESULTS
          <div className={studyMode ? "space-y-4" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"}>
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                studyMode={studyMode} 
                onClick={setSelectedBook} 
                colors={colors}
              />
            ))}
          </div>
        ) : (
          // B. SHOW "NO RESULTS" STATE (The Mascot)
          <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <div className="inline-flex p-6 rounded-full mb-6 relative group" style={{ backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9' }}>
                {/* Animated Question Mark */}
                <div className="absolute -top-2 -right-2 text-4xl font-bold animate-bounce" style={{ color: colors.accent }}>?</div>
                <Bot className="h-24 w-24 opacity-80" style={{ color: colors.secondaryText }} />
              </div>
              <h3 className="text-3xl font-bold mb-3" style={{ color: colors.text }}>I don't think we have that here...</h3>
              <p className="text-lg max-w-md mx-auto" style={{ color: colors.secondaryText }}>
                Our digital archives came up empty for "<span style={{ color: colors.primary }}>{searchQuery}</span>".
              </p>
            </div>

            {/* Suggestions Section */}
            <div className="border-t pt-10" style={{ borderColor: colors.borderColor }}>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
                <Zap className="h-5 w-5 text-amber-500" />
                Are you perhaps looking for this?
              </h4>
              
              <div className={studyMode ? "space-y-4" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"}>
                {suggestedBooks.map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    studyMode={studyMode} 
                    onClick={setSelectedBook} 
                    colors={colors}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(15, 23, 42, 0.4)' }}>
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-200"
               style={{ backgroundColor: colors.cardBg }}>
            
            <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 p-2 rounded-full z-10 backdrop-blur-sm hover:bg-opacity-20 hover:bg-gray-500 transition" 
                    style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }}>
              <X className="h-6 w-6" style={{ color: colors.text }} />
            </button>
            
            <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0 bg-gray-200">
               <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-1 rounded uppercase tracking-wider" 
                      style={{ backgroundColor: isDarkMode ? '#312e81' : '#e0e7ff', color: colors.primary }}>
                  {selectedBook.genre}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-bold" style={{ color: colors.text }}>{selectedBook.rating}</span>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: colors.text }}>{selectedBook.title}</h2>
              <p className="text-lg font-medium mb-6" style={{ color: colors.secondaryText }}>{selectedBook.author}</p>
              
              <p className="text-sm leading-relaxed mb-8" style={{ color: colors.text }}>{selectedBook.desc}</p>
              
              <div className="mt-auto flex gap-3 pb-2">
                <button className="flex-1 py-3 px-6 rounded-xl text-white font-bold shadow-lg transition-all hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                  Read Digital Copy
                </button>
                <button className="p-3 rounded-xl border transition hover:bg-opacity-10 hover:bg-gray-500" style={{ borderColor: colors.borderColor, color: colors.text }}>
                  <Heart className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}