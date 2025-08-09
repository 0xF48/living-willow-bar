'use client';

import { OptionType, SurveyOption } from '@/data/enums';
import { useSurvey } from '../hooks/useSurvey';
import cn from 'classnames'



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
  const { toggleCurrentOptionSelect, currentQuestion, currentTitle, currentOptions } = useSurvey()
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
  </div>
}