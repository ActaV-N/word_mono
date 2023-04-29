import React, { MouseEventHandler } from "react"
import { AiFillDelete } from "react-icons/ai"
import { useMutation, useQueryClient } from "react-query"
import { makeRequestWithCookieToken } from "../../../lib/utils/authUtils"
import { TodayDataT } from "../../../mocks/data"
import IconButton from "../../Atom/Button/IconButton"

interface Props{
    zoop:TodayDataT,
}

const ZoopItem: React.FC<Props> = ({zoop}) => {
    const queryClient = useQueryClient();
    const deleteZoop = useMutation(async () => makeRequestWithCookieToken('delete', `/expressions/delete/${zoop.id}`),
    {
        onMutate: async () => {
            await queryClient.cancelQueries('todayZoop');
            
            const previous = queryClient.getQueryData<[]>('todayZoop');
      
            return {previous};
        },
        onError: (_, __, context)=>{
            queryClient.setQueryData('todayZoop', context?.previous)
        },
        onSettled: () => {
            queryClient.invalidateQueries('todayZoop')
        },
          onSuccess: () => {
            queryClient.invalidateQueries('todayZoop');
        }
    });
    

    const handleZoopDelete: MouseEventHandler = (_) => {
        deleteZoop.mutate();
    }

    return (
    <div>
        <div className='px-5 py-2'>
            <div className='text-left'>
                <div className='flex w-full justify-between items-center'>
                <div>
                    <div className='text-black'>
                    {zoop.content}
                    </div>
                    <div className='text-black text-slate-800 text-sm'>
                    {zoop.meaning}
                    </div>
                    <div className='text-xs text-slate-700'>
                    {zoop.createdAt.toLocaleString()}
                    </div>
                </div>
                <div>
                    <IconButton onClick={handleZoopDelete} Icon={<AiFillDelete/>} />
                </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ZoopItem