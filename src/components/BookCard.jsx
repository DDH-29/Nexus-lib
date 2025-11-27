import React from 'react';

export default function BookCard({ book, studyMode, onClick, colors }) {
  if (studyMode) {
    // List View
    return (
      <div 
        className="flex flex-col sm:flex-row p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
        style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
        onClick={() => onClick(book)}
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: colors.text }}>{book.title}</h3>
          <p className="text-sm font-medium mb-2" style={{ color: colors.secondaryText }}>{book.author}</p>
          <span className="text-xs font-semibold px-2 py-1 rounded opacity-80" style={{ backgroundColor: colors.bg, color: colors.text }}>{book.genre}</span>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm hover:shadow-md transition" style={{ backgroundColor: colors.primary }}>
            Access
          </button>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div 
      className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
      style={{ backgroundColor: colors.cardBg }}
      onClick={() => onClick(book)}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-200">
        <img src={book.cover} alt={book.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-sm line-clamp-2">{book.desc}</p>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-base leading-tight mb-1 line-clamp-1" style={{ color: colors.text }}>{book.title}</h3>
        <p className="text-sm" style={{ color: colors.secondaryText }}>{book.author}</p>
      </div>
    </div>
  );
}