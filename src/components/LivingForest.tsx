import React from 'react';
import TreeCard, { TreeStatus } from './TreeCard';

interface Tree {
  id: string;
  name: string;
  species: string;
  status: TreeStatus;
  lastVerified: string;
  location: string;
}

interface LivingForestProps {
  onSelectTree: (id: string) => void;
}

const mockTrees: Tree[] = [
  {
    id: '1',
    name: 'Elder Oak',
    species: 'Quercus robur',
    status: 'healthy',
    lastVerified: '2 hours ago',
    location: 'North Grove',
  },
  {
    id: '2',
    name: 'Morning Pine',
    species: 'Pinus sylvestris',
    status: 'healthy',
    lastVerified: '5 hours ago',
    location: 'East Ridge',
  },
  {
    id: '3',
    name: 'River Willow',
    species: 'Salix alba',
    status: 'needs-attention',
    lastVerified: '3 days ago',
    location: 'Streamside',
  },
  {
    id: '4',
    name: 'Guardian Maple',
    species: 'Acer saccharum',
    status: 'healthy',
    lastVerified: '1 day ago',
    location: 'Central Park',
  },
  {
    id: '5',
    name: 'Sentinel Birch',
    species: 'Betula pendula',
    status: 'critical',
    lastVerified: '7 days ago',
    location: 'West Hollow',
  },
  {
    id: '6',
    name: 'Whispering Ash',
    species: 'Fraxinus excelsior',
    status: 'healthy',
    lastVerified: '12 hours ago',
    location: 'South Meadow',
  },
];

const LivingForest: React.FC<LivingForestProps> = ({ onSelectTree }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 opacity-0 animate-fade-rise">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
            The living forest
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Each tree is an entity, not a record. Someone planted it. Someone cares for it.
          </p>
        </div>

        {/* Tree grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrees.map((tree, index) => (
            <div
              key={tree.id}
              className="opacity-0 animate-gentle-scale"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <TreeCard
                {...tree}
                onClick={() => onSelectTree(tree.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LivingForest;
