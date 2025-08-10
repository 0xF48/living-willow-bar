import { DrinkId } from '@/data/enums';
import { getDrink } from '@/data/drinks';

interface DrinkViewProps {
  drinkId: string;
}

export function DrinkView({ drinkId }: DrinkViewProps) {
  const drink = getDrink(drinkId as DrinkId);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{drink.name}</h1>
        <div 
          className="w-full h-64 rounded-2xl bg-cover bg-center mb-6"
          style={{ backgroundImage: `url(${drink.imageSrc})` }}
        />
        <p className="text-lg mb-4">{drink.effects}</p>
        <p className="text-gray-300">{drink.baseDrink}</p>
      </div>
    </div>
  );
}