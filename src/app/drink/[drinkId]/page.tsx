import { DrinkView } from '../../../views/DrinkView';

interface DrinkPageProps {
  params: Promise<{
    drinkId: string;
  }>;
}

export default async function DrinkPage({ params }: DrinkPageProps) {
  const { drinkId } = await params;
  return <DrinkView drinkId={drinkId} />
}