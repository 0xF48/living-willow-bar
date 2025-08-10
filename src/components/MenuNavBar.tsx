'use client';


import { useSurvey } from '../hooks/useSurvey';
import { STYLE, CONFIG } from '@/data/enums';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { MessageCircleHeartIcon } from 'lucide-react';



export function MenuNavBar() {

  const { responseList } = useSurvey();
  const router = useRouter();

  const handleSurveyClick = () => {
    router.push('/');
  };

  const completedSteps = responseList.length;
  const totalSteps = CONFIG.SURVEY_MAX_QUESTIONS;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black to-transparent pt-8 pb-4">
      <div className="transform w-full max-w-lg flex items-center gap-3 px-4 justify-between mx-auto">

        {/* Survey Button - Left Side */}
        <button
          onClick={handleSurveyClick}
          className={cn(
            STYLE.BUTTON,
            STYLE.SLATE,
            'relative font-bold shadow-lg min-w-[120px]'
          )}
        >
          <MessageCircleHeartIcon />
          survey
          {/* {completedSteps > 0 && (
            <div className='absolute left-1/2 -translate-x-1/2 -top-6 font-bold text-sm text-gray-400 w-full'>
              {completedSteps} of {totalSteps}
            </div>
          )} */}
        </button>

      </div>
    </div>
  );
}