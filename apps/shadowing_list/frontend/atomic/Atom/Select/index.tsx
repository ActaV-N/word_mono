import React from 'react';

interface Props{
    label?:string
    children: React.ReactNode
    onChange: React.ChangeEventHandler,
    value?: string | number,
    name?: string
}

const Select: React.FC<Props> = ({
    label="선택",
    children,
    onChange,
    value,
    name
}) => {
    return <div>
        <input name={name} value={value} type="hidden" />
        <div>
            <Item>{label}</Item>
            {children}
        </div>
    </div>
}

interface ItemProps{
    value?: string | number,
    children: React.ReactNode
}

const Item: React.FC<ItemProps> = ({value, children}) => {
    return <option value={value}>
        {children}
    </option>
}

(Select as typeof Select & {Item: React.FC<ItemProps>})
.Item = ({
    value,
    children
}) => <Item value={value}>{children}</Item>

export default (Select as typeof Select & {Item: React.FC<ItemProps>});