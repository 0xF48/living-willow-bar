'use client';

import { CONFIG, OptionType, SurveyOption, STYLE } from '@/data/enums';
import { useSurvey } from '../hooks/useSurvey';
import { SurveyNavBar } from '../components/SurveyNavBar';
import cn from 'classnames'
import { ArrowBigRightDashIcon, MessageCircleHeartIcon, X, Loader, XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import MotionBox from '../components/MotionBox';
import _clone from 'lodash/clone'

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
    if (textResponse.trim().length > 0) {
      onSubmit(textResponse.trim())
      setTextResponse('')
      setTextResponseOpen(false)
    }
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
          <ArrowBigRightDashIcon />
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


function SurveyOptionButton({ option, onSelect, selected, index }: { index: number, option: SurveyOption, onSelect: any, selected: boolean }) {
  return <button onClick={() => {
    onSelect(index)
  }} className={cn(
    STYLE.BUTTON,
    'flex-row justify-start',
    selected ? STYLE.YELLOW : STYLE.SLATE
  )}>
    <div className='w-16 text-2xl'>
      {option.emoji}
    </div>
    <div className='flex flex-col items-start'>
      <div className='text-xl font-bold'>{option.text}</div>
      <div className='text-md'>{option.text}</div>
    </div>
  </button>



}




export function SurveyView() {

  const { isLoading, resetSurvey, currentForm, responseList, submitForm } = useSurvey()

  const [selected, setSelected] = useState<boolean[]>([])


  useEffect(() => {
    setSelected([])
  }, [currentForm])


  function submitResponseOptions() {
    let responseText = ""
    currentForm.options.forEach((opt, i) => {
      if (selected[i] === true) {
        responseText += ' & ' + opt.text
      }
    })
    submitForm({
      prompt: currentForm.prompt,
      response: responseText
    })
  }

  function submitResponseText(text: string) {
    submitForm({
      prompt: currentForm.prompt,
      response: text
    })
  }

  function toggleOptionSelect(index: number) {
    let new_selected = _clone(selected)
    new_selected[index] = !!!new_selected[index]
    setSelected(new_selected)
  }

  const noResponses = responseList.length == 0

  const nonSelected = selected.filter((v) => {
    return v === true
  }).length == 0


  return <>
    <div className='w-full h-auto mt-20 flex flex-col justify-center max-w-lg mx-auto gap-8 px-4 pb-24' >

      {/* Progress indicator */}

      <div className='w-full text-center text-sm text-gray-500'>
        Question {responseList.length + 1} of {CONFIG.SURVEY_MAX_QUESTIONS}
      </div>


      <div className='w-full text-center font-bold text-2xl'>
        {currentForm.header}
      </div>

      <div className='w-full text-left'>
        {currentForm.prompt}
      </div>

      {currentForm.options.map((opt, i) => {
        return <SurveyOptionButton onSelect={toggleOptionSelect} key={i} index={i} option={opt} selected={selected[i] === true} />
      })}

      {!currentForm.options ? (
        <div className='w-full text-center text-green-600 font-bold'>
          Assessment complete! Your recommendation is ready.
        </div>
      ) : (
        <div className='w-full flex flex-row gap-4'>
          <ResetSurveyButton onSubmit={resetSurvey} disabled={noResponses} />
          <TextAnswerButton currentQuestion={currentForm.prompt} onSubmit={submitResponseText} />
          <SubmitAnswerButton onSubmit={submitResponseOptions} disabled={nonSelected} isLoading={isLoading} />
        </div>
      )}


    </div>

    {/* Survey Navigation Bar */}
    <SurveyNavBar />
  </>
}