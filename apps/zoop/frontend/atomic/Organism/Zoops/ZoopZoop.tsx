import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEvent, MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequestWithCookieToken } from '../../../lib/utils/authUtils';
import Container from '../../Atom/Container';
import PaperContainer from '../../Atom/Container/PaperContainer';
import ZoopInput from '../../Mole/Zoops/ZoopInput';
import ZoopList from '../../Mole/Zoops/ZoopList';

const ZoopZoop = () => {
  // Fetch Today's Zoop
  const {data, isLoading, isError: fetchingError} = useQuery('todayZoop', () => makeRequestWithCookieToken('get', '/expressions/today_zoop'));

  // For sending mutation to the server
  const queryClient = useQueryClient();
  const createExpression = useMutation(async (newZoop:any) => {
    return makeRequestWithCookieToken('post', '/expressions/create', {
      ...newZoop
    })
  }, {
    onMutate: async newZoop => {
      await queryClient.cancelQueries('todayZoop');
      
      const previous = queryClient.getQueryData<[]>('todayZoop');

      return {previous};
    },
    onError: (_, newZoop, context)=>{
      queryClient.setQueryData('todayZoop', context?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries('todayZoop')
    },
    onSuccess: () => {
      queryClient.invalidateQueries('todayZoop');
    }
  })


  // Variables for new today's Zoop
  const formRef = useRef<HTMLFormElement>(null)
  const [zoopInputs, setZoopInputs] = useState({
    content: "",
    meaning: ""
  })
  const [isError, setIsError] = useState(false);
  
  // For changing Inputs
  const handleZoopInputChange: ChangeEventHandler = (event: ChangeEvent) => {
    const el = event.target as HTMLInputElement;
    
    const name = el.name;
    const value = el.value;

    // Expression field is required
    if(name === "content" && value.trim() !== "" && isError){
      setIsError(false);
    }

    setZoopInputs(zoop => ({
      ...zoop,
      [name]:value
    }))
  }

  // Submit
  const handleSubmit:FormEventHandler = (event:FormEvent) => {
    event.preventDefault();

    if(zoopInputs.content.trim() === "") {
      setIsError(true);
      return;
    }

    createExpression.mutate(zoopInputs)
    
    setZoopInputs({
      content:"",
      meaning:""
    })

    if(formRef.current){
      (document.activeElement as HTMLInputElement).blur();
    }
  }

  return <Container>
        <form ref={formRef} onSubmit={handleSubmit} className='relative'>
          <ZoopInput content={zoopInputs.content} meaning={zoopInputs.meaning} onChange={handleZoopInputChange} />
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
            <ZoopList
              isLoading={isLoading}
              zoops={data}
              isError={fetchingError}
            />
          </div> 
        </PaperContainer>
      </Container>
}

export default ZoopZoop