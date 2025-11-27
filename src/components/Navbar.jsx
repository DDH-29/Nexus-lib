import React from 'react';
import { Zap, List, Grid, Moon, Sun } from 'lucide-react';

// Notice we added isDarkMode, setIsDarkMode, and colors to the props below
export default function Navbar({ activeCategory, setActiveCategory, setSearchQuery, studyMode, setStudyMode, isDarkMode, setIsDarkMode, colors }) {
  const handleLogoClick = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-90 w-full transition-colors duration-300" 
         style={{ backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)', borderBottom: `1px solid ${colors.borderColor}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ color: colors.text }}>
              Nexus<span style={{ color: colors.primary }}>Lib</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full transition-all hover:bg-opacity-10 hover:bg-gray-500"
              style={{ color: colors.text }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* View Toggle Button */}
            <button 
              onClick={() => setStudyMode(!studyMode)}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all border hover:shadow-md md:flex"
              style={{ 
                backgroundColor: studyMode ? colors.primary : 'transparent',
                borderColor: studyMode ? colors.primary : colors.borderColor,
                color: studyMode ? 'white' : colors.text 
              }}
            >
              {studyMode ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              <span className="hidden md:block text-sm font-medium">
                {studyMode ? "List View" : "Grid View"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}