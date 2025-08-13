'use client';

import { CONFIG, OptionType, SurveyOption, STYLE } from '@/data/enums';
import { useSurvey } from '../hooks/useSurvey';
import { SurveyNavBar } from '../components/SurveyNavBar';
import cn from 'classnames'
import { ArrowBigRightDashIcon, MessageCircleHeartIcon, X, Loader, XIcon, TrashIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import MotionBox from '../components/MotionBox';
import _clone from 'lodash/clone'
import { TopMatchButton } from '@/components/TopMatchButton';

function ResetSurveyButton({ onSubmit, disabled, showText }: { onSubmit: any, disabled: boolean, showText: boolean }) {
  return <button
    disabled={disabled}
    onClick={onSubmit}
    className={
      cn(
        STYLE.BUTTON,
        disabled
          ? STYLE.BUTTON_DISABLED
          : STYLE.BLACK,
        'font-bold w-fit gap-4'
      )
    }>

    <TrashIcon />
    {showText ? <span>reset survey</span> : null}


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
            : cn(STYLE.BLUE, STYLE.BUTTON_BLUE_SHADOW),
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
const TEXT_ANSWER_BUTTON_FIXED_POS = 'fixed bottom-30 left-1/2 -translate-x-1/2 max-w-[40rem] h-[20rem] w-[calc(100%-40px)]'


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

  const hasText = textResponse.trim().length > 0

  if (textResponseOpen == false) {
    position = TEXT_ANSWER_BUTTON_RELATIVE_POS

    content = <div
      onClick={() => { setTextResponseOpen(true) }}
      className={cn(
        STYLE.BUTTON,
        STYLE.SLATE,
        'font-bold'
      )}>
      <MessageCircleHeartIcon /> custom
    </div>
  } else {
    position = TEXT_ANSWER_BUTTON_FIXED_POS
    content = <div
      className="w-full h-full">
      {/* <div>{currentQuestion}</div> */}
      <textarea
        autoFocus={true}
        value={textResponse}
        onChange={(e) => setTextResponse(e.target.value)}
        className={cn(
          'font-bold w-full h-full p-10 outline-none ring-0 hover:ring-0'
        )}
        placeholder='custom response'>
      </textarea>

      <div className="flex gap-4 w-full justify-between p-10 absolute left-0 bottom-0 pointer-events-none">
        <button
          disabled={false}
          className={cn(
            STYLE.BUTTON,
            STYLE.ORANGE,
            'font-bold w-20 pointer-events-auto'
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
            'font-bold w-40 pointer-events-auto'
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
          cn("z-60 w-full h-full fixed transition-opacity duration-200 left-0 top-0 bg-slate-200/60 backdrop-blur-sm cursor-pointer",
            textResponseOpen ? ' opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} ></div >, document.body)}
    <MotionBox
      classNames={{
        style: textResponseOpen ? cn('z-80', STYLE.BUTTON, hasText ? STYLE.SLATE_SELECTED : STYLE.SLATE) : '',
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
    selected ? STYLE.SLATE_SELECTED : STYLE.SLATE
  )}>
    <div className='w-14 -ml-2 text-2xl'>
      {option.emoji}
    </div>
    <div className='flex flex-col items-start'>
      <div className='text-xl font-bold text-left'>{option.text}</div>
      <div className='text-md text-left'>{option.hint}</div>
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
    const new_selected = _clone(selected)
    new_selected[index] = !!!new_selected[index]
    setSelected(new_selected)
  }

  const noResponses = responseList.length == 0

  const nonSelected = selected.filter((v) => {
    return v === true
  }).length == 0

  // Don't render anything until the form is loaded (prevents hydration mismatch)
  if (!currentForm.header || !currentForm.prompt) {
    return <>
      <div className='w-full h-auto mt-20 flex flex-col justify-center max-w-lg mx-auto gap-8 px-4 pb-24' >
        <div className='w-full text-center text-sm text-gray-500'>
          Loading...
        </div>
      </div>
      <SurveyNavBar />
    </>
  }

  return <>
    <div className='w-full h-auto mt-20 flex flex-col justify-center max-w-lg mx-auto gap-8 px-4 pb-24' >

      {/* Progress indicator */}

      <div className='w-full text-center text-sm text-gray-500'>
        Question {responseList.length + 1} of {CONFIG.SURVEY_MAX_QUESTIONS}
      </div>


      <div className='w-full text-center font-bold text-4xl font-header'>
        {currentForm.header}
      </div>

      <div className='w-full text-left text-lg'>
        {currentForm.prompt}
      </div>

      {currentForm.drinkId ? <div className='flex flex-col items-center gap-4'>
        <TopMatchButton topMatch={{ drinkId: currentForm.drinkId, score: 0 }} />
        <ResetSurveyButton onSubmit={resetSurvey} disabled={noResponses} showText={true} />
      </div> : <>
        {currentForm.options.map((opt, i) => {
          return <SurveyOptionButton onSelect={toggleOptionSelect} key={i} index={i} option={opt} selected={selected[i] === true} />
        })}

        {!currentForm.options.length ? (
          <div className='w-full text-center text-green-600 font-bold'>
            Assessment complete! Your recommendation is ready.
          </div>
        ) : (
          <div className='w-full flex flex-row gap-4'>
            <ResetSurveyButton onSubmit={resetSurvey} disabled={noResponses} showText={false} />
            <TextAnswerButton currentQuestion={currentForm.prompt} onSubmit={submitResponseText} />
            <SubmitAnswerButton onSubmit={submitResponseOptions} disabled={nonSelected} isLoading={isLoading} />
          </div>
        )}
      </>}


    </div>

    {/* Survey Navigation Bar */}
    <SurveyNavBar />
  </>
}