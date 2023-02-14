import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import { TodayDataT } from '../../../mocks/data';
import Container from '../../Atom/Container';
import PaperContainer from '../../Atom/Container/PaperContainer';
import ZoopInput from '../../Mole/Zoops/ZoopInput';
import ZoopItem from '../../Mole/Zoops/ZoopItem';

const ZoopZoop = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [zoops, setZoops] = useState<TodayDataT[]>([])
  const [zoopInputs, setZoopInputs] = useState({
    expression: "",
    meaning: ""
  })
  const [isError, setIsError] = useState(false);

  const handleZoopInputChange: ChangeEventHandler = (event: ChangeEvent) => {
    const el = event.target as HTMLInputElement;
    
    const name = el.name;
    const value = el.value;

    if(name === "expression" && value.trim() !== "" && isError){
      setIsError(false);
    }

    setZoopInputs(zoop => ({
      ...zoop,
      [name]:value
    }))
  }

  const handleSubmit:FormEventHandler = (event:FormEvent) => {
    event.preventDefault();

    if(zoopInputs.expression.trim() === "") {
      setIsError(true);
      return;
    }
    
    // Add new data for zoop
    const newData:TodayDataT = {
      id: zoops.length,
      ...zoopInputs,
      created_at: new Date(Date.now())
    }

    setZoopInputs({
      expression:"",
      meaning:""
    })

    setZoops((zoops) => ([newData, ...zoops]));
    if(formRef.current){
      (document.activeElement as HTMLInputElement).blur();
    }
  }

  const handleZoopDelete: MouseEventHandler = (event: MouseEvent) => {
    const el = event.currentTarget as HTMLButtonElement;
    const id: number = parseInt(`${el.dataset.id}`);

    setZoops((zoops) => zoops.filter(data => data.id !== id));
  }

  return <Container>
        <form ref={formRef} onSubmit={handleSubmit} className='relative'>
          <ZoopInput expression={zoopInputs.expression} meaning={zoopInputs.meaning} onChange={handleZoopInputChange} />
          {isError && 
          <div className='absolute bottom-0 right-3 translate-y-full md:text-sm text-xs text-red pt-1'>
            표현 입력은 필수에요!
          </div>}
        </form>
        <PaperContainer tails='md:mt-8 mt-6'>
          <p className='md:text-base text-sm px-5 md:py-3 py-1 md:h-[50px] h-[40px] text-center text-black font-semibold tracking-wider text-green-900 border-b border-solid border-[#ddd] flex items-center justify-center'>
            TODAY
          </p>
          <div className='md:text-base text-sm text-slate-800 text-center md:h-[calc(100%-50px)] h-[calc(100%-40px)] overflow-auto'>
          {zoops.length === 0 ? 
            <div className='flex items-center justify-center h-full tracking-wide'>
              오늘 줍줍한 표현들이 없어요! 얼른 줍줍하러 가볼까요?
            </div>
          : zoops
          .map(zoop => <ZoopItem key={zoop.id} onDelete={handleZoopDelete} zoop={zoop} />)}
          </div> 
        </PaperContainer>
      </Container>
}

export default ZoopZoop