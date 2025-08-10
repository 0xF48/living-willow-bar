import { DrinkView } from '../../../views/DrinkView';

interface DrinkPageProps {
  params: {
    drinkId: string;
  };
}

export default function DrinkPage({ params }: DrinkPageProps) {
  return <DrinkView drinkId={params.drinkId} />
}