import React from 'react';
import TextField from '../../Atom/TextField';

interface Props {
  expression: string,
  meaning: string,
  onExpressionChange: React.ChangeEventHandler,
  onMeaningChange: React.ChangeEventHandler
}

const ZoopInput:React.FC<Props> = ({expression, meaning, onExpressionChange, onMeaningChange}) => {
    return <>
      <div className='md:mb-5 mb-2'>
        <h1 className='text-center md:text-3xl text-xl md:mb-5 mb-2'>
          <div>
            미디어에서 주워들은 표현을
          </div>
          <div>
            내걸로 만드는 과정
          </div>
          </h1>
        <h3 className='md:text-2xl text-lg center font-semibold text-center'>🙌🏻 Zoop Zoop 🙌🏻</h3>
      </div>
      <TextField tails="rounded-b-none" onChange={onExpressionChange} value={expression} align='center' label='오늘은 어떤 표현을 줍줍하셨나요? ⏎' />
      <TextField tails='rounded-t-none' onChange={onMeaningChange} value={meaning} align='center' label='줍줍한 표현의 뜻을 적어주세요!(뜻은 나중에 적어도 좋아요 👍🏻) ⏎' />
      <button className='hidden' type='submit'></button>
    </>
}

export default ZoopInput;