'use client';

import { OptionType, SurveyOption } from '@/data/enums';
import { useSurvey } from '../hooks/useSurvey';
import cn from 'classnames'
import { ArrowBigRightDashIcon, MessageCircleHeartIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import MotionBox from '../components/MotionBox';


function SubmitAnswerButton({ onSubmit }: { onSubmit: any }) {

  return <button onClick={onSubmit} className={
    cn(
      'bg-black text-white font-bold rounded-2xl p-4 cursor-pointer flex items-center justify-center gap-2'
    )
  }>
    <ArrowBigRightDashIcon />
    submit
  </button>
}


const TEXT_ANSWER_BUTTON_RELATIVE_POS = 'relative w-[14em] h-14'
const TEXT_ANSWER_BUTTON_FIXED_POS = 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem]'


function TextAnswerButton({ onSubmit, currentQuestion }: { currentQuestion: string, onSubmit: any }) {

  const [textResponse, setTextResponse] = useState(false)

  const [textResponseOpen, setTextResponseOpen] = useState(false)

  // console.log(textResponseOpen)




  let position
  let content

  if (textResponseOpen == false) {
    position = TEXT_ANSWER_BUTTON_RELATIVE_POS
    content = <div
      onClick={() => { setTextResponseOpen(true) }}
      className="font-bold rounded-2xl p-4 w-full cursor-pointer flex items-center justify-center gap-2 pointer-events-auto">
      <MessageCircleHeartIcon /> custom
    </div>
  } else {
    position = TEXT_ANSWER_BUTTON_FIXED_POS
    content = <div
      className="w-full h-full flex items-start flex-col font-display text-black  bg-white">
      <div>{currentQuestion}</div>
      <textarea className='' placeholder='your response'>

      </textarea>

      <button className={cn(
        'bg-blue-500 text-white'
      )}
        onClick={onSubmit}>
        done
      </button>
    </div>
  }

  return <>
    {createPortal(
      <div
        onClick={() => { setTextResponseOpen(false) }}
        className={
          cn("z-10 w-full h-full fixed transition-opacity duration-200 left-0 top-0 bg-gray-100/90 backdrop-blur-xl",
            textResponseOpen ? ' opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} ></div >, document.body)}
    <MotionBox
      classNames={{
        style: cn(textResponseOpen ? 'bg-white ' : 'bg-gray-100 hover:ring hover:ring-3 ring-gray-200 cursor-pointer ', 'transition-colors rounded-2xl z-40'),
        position: position
      }}>
      {content}
    </MotionBox >
  </>


}

function SelectableOption({ selected, children, onSelect }: { selected: boolean, children: any, onSelect: any }) {
  return <button onClick={onSelect} className={cn(
    'bg-slate-100 rounded-2xl p-4 hover:outline-4 hover:cursor-pointer flex flex-row',
    selected ? 'outline-blue-400 outline-4' : 'outline-slate-300'
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


  const { toggleCurrentOptionSelect, currentQuestion, currentTitle, currentOptions, submitResponse, setCurrentTextResponse } = useSurvey()






  return <div className='w-full h-auto mt-20 flex flex-col justify-center max-w-lg mx-auto gap-8 px-4' >


    <div className='w-full text-center font-bold text-2xl'>
      {currentTitle}
    </div>


    <div className='w-full text-left'>
      {currentQuestion}
    </div>


    {currentOptions.map((opt) => {
      if (opt.type == OptionType.BODY_SYSTEM) {
        return <SurveyBodySystemOptionButton onSelect={toggleCurrentOptionSelect} key={opt.id} option={opt} />
      } else if (opt.type == OptionType.SELECTED_ANSWER) {
        return <SurveySelectAnswerOptionButton onSelect={toggleCurrentOptionSelect} key={opt.id} option={opt} />
      }
    })}


    <div className='w-full flex flex-row gap-4'>
      <TextAnswerButton currentQuestion={currentQuestion} onSubmit={setCurrentTextResponse} />
      <SubmitAnswerButton onSubmit={submitResponse} />
    </div>





  </div>
}