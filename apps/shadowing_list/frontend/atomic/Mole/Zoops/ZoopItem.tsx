import React from "react"
import { AiFillDelete } from "react-icons/ai"
import { TodayDataT } from "../../../mocks/data"
import IconButton from "../../Atom/Button/IconButton"

interface Props{
    zoop:TodayDataT,
    onDelete: React.MouseEventHandler
}

const ZoopItem: React.FC<Props> = ({zoop, onDelete}) => {
    return (
    <div>
        <div className='px-5 py-2'>
            <div className='text-left'>
                <div className='flex w-full justify-between items-center'>
                <div>
                    <div className='text-black'>
                    {zoop.expression}
                    </div>
                    <div className='text-black text-slate-800 text-sm'>
                    {zoop.meaning}
                    </div>
                    <div className='text-xs text-slate-700'>
                    {zoop.created_at.toLocaleString()}
                    </div>
                </div>
                <div>
                    <IconButton data-id={zoop.id} onClick={onDelete} Icon={<AiFillDelete/>} />
                </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ZoopItem