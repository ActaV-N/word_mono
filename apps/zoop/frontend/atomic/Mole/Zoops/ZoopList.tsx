import React from 'react';
import ZoopItem from './ZoopItem';

interface Props{
    zoops: any,
    isLoading: boolean,
    isError: any,
}

const ZoopList: React.FC<Props> = ({zoops, isLoading, isError}) => {
    if(isLoading){
        return <div className='flex items-center justify-center h-full tracking-wide'>
            Loading...
        </div>
    }

    if(isError){
        return <div className='flex items-center justify-center h-full tracking-wide'>
            뭔가 잘못됐어요..!
        </div>
    }

    return <>
        {zoops.length === 0 ? 
        <div className='flex items-center justify-center h-full tracking-wide'>
            오늘 줍줍한 표현들이 없어요! 얼른 줍줍하러 가볼까요?
        </div>
        : zoops
        .map((zoop:any) => <ZoopItem key={zoop.id} zoop={zoop} />)}
    </>
}

export default ZoopList