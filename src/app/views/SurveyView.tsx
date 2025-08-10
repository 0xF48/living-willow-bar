'use client';

import { CONFIG, OptionType, SurveyOption, STYLE } from '@/data/enums';
import { useSurvey } from '../hooks/useSurvey';
import { useApp } from '../context/AppContext';
import { SurveyNavButton } from '../components/SurveyNavButton';
import cn from 'classnames'
import { ArrowBigRightDashIcon, MessageCircleHeartIcon, ArrowRight, X, Loader, XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import MotionBox from '../components/MotionBox';


function ResetSurveyButton({ onSubmit, disabled }: { onSubmit: any, disabled: boolean }) {
  return <button
    disabled={disabled}
    onClick={onSubmit}
    className={
      cn(
        STYLE.BUTTON,
        disabled
          ? STYLE.BUTTON_DISABLED
          : STYLE.ORANGE,
        'font-bold w-20'
      )
    }>

    <XIcon />

  </button>
}

function SubmitAnswerButton({ onSubmit, disabled, isLoading }: { onSubmit: any, disabled: boolean, isLoading: boolean }) {

  return <button
    disabled={disabled || isLoading}
    onClick={onSubmit}
    className={
      cn(
        STYLE.BUTTON,
        disabled
          ? STYLE.BUTTON_DISABLED
          : isLoading
            ? STYLE.BUTTON_LOADING
            : STYLE.BLUE,
        'font-bold w-20'
      )
    }>
    {isLoading ? (
      <>
        <Loader className="animate-spin" />
      </>
    ) : (
      <>
        <ArrowBigRightDashIcon />
      </>
    )}
  </button>
}


const TEXT_ANSWER_BUTTON_RELATIVE_POS = 'relative w-full h-14'
const TEXT_ANSWER_BUTTON_FIXED_POS = 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem]'


function TextAnswerButton({ onSubmit, currentQuestion }: { currentQuestion: string, onSubmit: any }) {

  const [textResponse, setTextResponse] = useState('')
  const [textResponseOpen, setTextResponseOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSave = () => {
    onSubmit(textResponse)
    setTextResponseOpen(false)
  }

  const handleClear = () => {
    setTextResponse('')
    setTextResponseOpen(false)
  }

  let position
  let content

  if (textResponseOpen == false) {
    position = TEXT_ANSWER_BUTTON_RELATIVE_POS
    const hasText = textResponse.trim().length > 0
    content = <div
      onClick={() => { setTextResponseOpen(true) }}
      className={cn(
        STYLE.BUTTON,
        hasText ? STYLE.YELLOW : STYLE.SLATE,
        'font-bold'
      )}>
      <MessageCircleHeartIcon /> custom
    </div>
  } else {
    position = TEXT_ANSWER_BUTTON_FIXED_POS
    content = <div
      className="w-full h-full flex items-center flex-col font-display text-black  p-10 gap-9">
      <div>{currentQuestion}</div>
      <textarea
        value={textResponse}
        onChange={(e) => setTextResponse(e.target.value)}
        className={cn(
          STYLE.BUTTON,
          'bg-white text-black hover:ring-slate-200 font-bold w-full min-h-40'
        )}
        placeholder='custom response'>
      </textarea>

      <div className="flex gap-4 w-full justify-between">
        <button
          disabled={false}
          className={cn(
            STYLE.BUTTON,
            STYLE.ORANGE,
            'font-bold w-20'
          )}
          onClick={handleClear}>
          <X />
        </button>
        <button
          disabled={textResponse.trim().length === 0}
          className={cn(
            STYLE.BUTTON,
            textResponse.trim().length === 0
              ? STYLE.BUTTON_DISABLED
              : STYLE.BLUE,
            'font-bold w-40'
          )}
          onClick={handleSave}>
          <ArrowRight />
        </button>
      </div>
    </div>
  }

  return <>
    {isMounted && createPortal(
      <div
        onClick={() => { setTextResponseOpen(false) }}
        className={
          cn("z-10 w-full h-full fixed transition-opacity duration-200 left-0 top-0 bg-slate-100/90 backdrop-blur-xl",
            textResponseOpen ? ' opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} ></div >, document.body)}
    <MotionBox
      classNames={{
        style: 'z-40 ' + CONFIG.ROUNDED,
        position: position
      }}>
      {content}
    </MotionBox >
  </>


}

function SelectableOption({ selected, children, onSelect }: { selected: boolean, children: any, onSelect: any }) {
  return <button onClick={onSelect} className={cn(
    STYLE.BUTTON,
    'flex-row justify-start',
    selected ? STYLE.YELLOW : STYLE.SLATE
  )} >{children}</button>
}

function SurveyBodySystemOptionButton({ option, onSelect }: { option: SurveyOption, onSelect: any }) {
  return <SelectableOption onSelect={() => { onSelect(option.id) }} selected={option.selected}>
    <div className='w-fit text-2xl flex items-center justify-center pr-5 pl-2'>
      {option.icon}
    </div>
    <div className='text-left'>
      <div className='text-md font-bold'>{option.title}</div>
      <div className='text-md font-regular'>{option.description}</div>
    </div>
  </SelectableOption>
}


function SurveySelectAnswerOptionButton({ option, onSelect }: { option: SurveyOption, onSelect: any }) {
  return <SelectableOption onSelect={() => { onSelect(option.id) }} selected={option.selected}>
    <div className='w-20 text-2xl'>
      {option.icon}
    </div>
    <div>
      <div className='text-md font-bold'>{option.title}</div>
    </div>
  </SelectableOption>
}




export function SurveyView() {

  const [customTextResponse, setCustomTextResponse] = useState('')
  const { toggleCurrentOptionSelect, currentQuestion, currentTitle, currentOptions, submitResponse, setCurrentTextResponse, isLoading, conversation, conversationComplete, sortedDrinks, recommendedDrink, resetSurvey } = useSurvey()
  const { updateDrinkRankings, setHasHealthMatrix } = useApp()

  // Clear custom text when a new question is received
  useEffect(() => {
    setCustomTextResponse('')
  }, [currentQuestion])

  // Update app context when drink rankings change
  useEffect(() => {
    if (sortedDrinks.length > 0) {
      updateDrinkRankings(sortedDrinks)
      setHasHealthMatrix(true)
    }
  }, [sortedDrinks, updateDrinkRankings, setHasHealthMatrix])

  // Check if there are any selected options
  const hasSelectedOptions = currentOptions.some(option => option.selected)

  // Check if there's custom text response
  const hasCustomText = customTextResponse.trim().length > 0

  // For follow-up questions (when no options available), only require custom text
  // For initial questions (when options available), require either selection or custom text
  const isSubmitDisabled = currentOptions.length === 0
    ? (!hasCustomText || isLoading)  // Follow-up: only need custom text
    : ((!hasSelectedOptions && !hasCustomText) || isLoading)  // Initial: need options OR custom text

  const handleCustomTextSubmit = (text: string) => {
    setCustomTextResponse(text)
    setCurrentTextResponse(text)
  }


  const resetDisabled = conversation.length == 0





  return <>
    <div className='w-full h-auto mt-20 flex flex-col justify-center max-w-lg mx-auto gap-8 px-4 pb-24' >

      {/* Progress indicator */}

      <div className='w-full text-center text-sm text-gray-500'>
        Question {conversation.length + 1} of {CONFIG.SURVEY_MAX_QUESTIONS}
      </div>


      <div className='w-full text-center font-bold text-2xl'>
        {currentTitle}
      </div>

      <div className='w-full text-left'>
        {currentQuestion}
      </div>

      {/* Show body system options for first question, then continue with follow-up questions */}
      {!conversationComplete && currentOptions.map((opt) => {
        if (opt.type == OptionType.BODY_SYSTEM) {
          return <SurveyBodySystemOptionButton onSelect={toggleCurrentOptionSelect} key={opt.id} option={opt} />
        } else if (opt.type == OptionType.SELECTED_ANSWER) {
          return <SurveySelectAnswerOptionButton onSelect={toggleCurrentOptionSelect} key={opt.id} option={opt} />
        }
      })}

      {/* Show sorted drinks list if we have rankings */}


      {/* Show completion message if survey is done */}
      {conversationComplete ? (
        <div className='w-full text-center text-green-600 font-bold'>
          Assessment complete! Your recommendation is ready.
        </div>
      ) : (
        <div className='w-full flex flex-row gap-4'>
          <ResetSurveyButton onSubmit={resetSurvey} disabled={resetDisabled} />
          <TextAnswerButton currentQuestion={currentQuestion} onSubmit={handleCustomTextSubmit} />
          <SubmitAnswerButton onSubmit={submitResponse} disabled={isSubmitDisabled} isLoading={isLoading} />
        </div>
      )}





    </div>

    {/* Survey Navigation Button */}
    <SurveyNavButton />
  </>
}