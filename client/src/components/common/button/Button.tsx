import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './styles/Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
}

export const Button: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  ...restProps
}) => {
  const finalClassName = `${s.button} ${red ? s.red : s.default} ${className}`

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <button type="button" className={finalClassName} {...restProps} />
}

Button.defaultProps = { red: false }
