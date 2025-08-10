'use client';

import { useApp } from '../context/AppContext';
import { Nav } from '@/data/enums';
import { SurveyView } from '../views/SurveyView';
import { MenuView } from '../views/MenuView';

export function AppShell() {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case Nav.SURVEY:
        return <SurveyView />;
      case Nav.MENU:
        return <MenuView />;
      default:
        return <SurveyView />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
    </div>
  );
}