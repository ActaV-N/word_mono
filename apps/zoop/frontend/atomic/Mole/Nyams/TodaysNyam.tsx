import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';
import { makeRequestWithCookieToken } from '../../../lib/utils/authUtils';
import { ShowEnum } from '../../Organism/Nyams/NyamNyam';
import NyamAccordian from './NyamAccordian';

interface Props{
    showState: keyof typeof ShowEnum
}

const TodaysNyam:React.FC<Props> = ({showState}) => {
    const {data, isLoading, isError} = useQuery('todays_nyam', () => makeRequestWithCookieToken('get', '/expressions/todays_nyam'))

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
                오늘 냠냠할 표현을 아직 설정하지 않았어요! 😋
            </div>
        </div>
    }

    return <div>
        {data
        .map((nyam: any) => <NyamAccordian key={nyam.id} nyam={nyam} showState={showState} />)}
    </div>
}

export default TodaysNyam;