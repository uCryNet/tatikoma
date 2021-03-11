import React from 'react'

interface ButtonProps {
  clas?: 'button--middle' | 'button--yellow' | 'button--grey' | 'button--red' | 'button--green'
  onClick?: () => void
}


export const Button: React.FC<ButtonProps> = ({ children, clas, onClick }) => {
  return (
    <button className={'button ' + (clas ? clas : '')} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
