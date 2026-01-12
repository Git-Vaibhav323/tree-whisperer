import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UploadedTree {
  id: string;
  name: string;
  species: string;
  location: string;
  lat: number | null;
  lng: number | null;
  status: 'healthy' | 'needs-attention' | 'critical';
  lastVerified: string;
  uploadedAt: string;
}

interface TreeContextType {
  trees: UploadedTree[];
  addTree: (tree: UploadedTree) => void;
  loadTrees: () => void;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

const STORAGE_KEY = 'uploadedTrees';

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trees, setTrees] = useState<UploadedTree[]>([]);

  // Load trees from localStorage on mount
  const loadTrees = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: UploadedTree[] = JSON.parse(raw);
        setTrees(parsed);
      } else {
        setTrees([]);
      }
    } catch (err) {
      console.error('Failed to load trees:', err);
      setTrees([]);
    }
  };

  // Add a new tree to state and localStorage
  const addTree = (tree: UploadedTree) => {
    const updated = [...trees, tree];
    setTrees(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for cross-tab sync
    window.dispatchEvent(new CustomEvent('treesUpdated'));
  };

  // Load trees on mount
  useEffect(() => {
    loadTrees();

    // Listen for storage events (cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadTrees();
      }
    };

    // Listen for custom events (same-tab updates)
    const handleTreesUpdated = () => {
      loadTrees();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('treesUpdated', handleTreesUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('treesUpdated', handleTreesUpdated);
    };
  }, []);

  return (
    <TreeContext.Provider value={{ trees, addTree, loadTrees }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTrees = () => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTrees must be used within a TreeProvider');
  }
  return context;
};
