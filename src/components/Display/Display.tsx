import React from 'react'

interface DisplayProps {
  expression: any
  value: string
}

export const Display: React.FC<DisplayProps> = ({ value, expression }) => {

  return (
    <div className={'display'}>
      <div className={'display__indicator'}>
        <div className={'display__expression'}>
          {expression}
        </div>
      </div>
      <div className={'display__screen'}>
        {value}
      </div>
    </div>
  )
}

export default Display
