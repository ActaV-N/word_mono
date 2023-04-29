import React, { use, useEffect } from 'react';
import { useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';
import { makeRequestWithCookieToken } from '../../../lib/utils/authUtils';
import { ShowEnum } from '../../Organism/Nyams/NyamNyam';
import NyamAccordian from './NyamAccordian';

interface Props{
    showState: keyof typeof ShowEnum
}

const ZoopSoFar: React.FC<Props> = ({showState}) => {
    const {data, isLoading, isError} = useQuery('zoops', () => makeRequestWithCookieToken('get', '/expressions'))

    if(isLoading){
        return <div className='h-full flex items-center justify-center'>
            <div>
                <HashLoader/>
            </div>
        </div>
    }

    if(isError){
        return <div className='h-full flex items-center justify-center'>
            <div>
                서버에서 오류가 발생했어요 🥺
            </div>
        </div>
    }

    if(data.length === 0){
        return <div className='h-full flex items-center justify-center'>
            <div>
            아직 줍줍한 표현들이 없어요!🥲
            </div>
        </div>
    }

    return <div>
        {data
        .map((nyam: any) => <NyamAccordian key={nyam.id} nyam={nyam} showState={showState} />)}
    </div>
}

export default ZoopSoFar