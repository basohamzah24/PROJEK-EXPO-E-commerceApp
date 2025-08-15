import React, { createContext, useContext, useState } from 'react';
import { Product } from '../components/ProductCard';

interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addFavorite = (product: Product) => {
    setFavorites(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product]);
  };
  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };
  const isFavorite = (id: number) => favorites.some(p => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
