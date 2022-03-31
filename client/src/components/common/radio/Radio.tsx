import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './style/Radio.module.scss'

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperRadioPropsType = DefaultRadioPropsType & {
  options?: string[]
  onChangeOption?: (option: string) => void
}

export const Radio: React.FC<SuperRadioPropsType> = ({
  type,
  name,
  options,
  value,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-unused-expressions
    onChange && onChange(e)
    // eslint-disable-next-line no-unused-expressions
    onChangeOption && onChangeOption(e.target.name)
  }

  // eslint-disable-next-line no-undef
  const mappedOptions: JSX.Element[] = options
    ? options.map((o, i) => (
        <span key={o} className={s.inputRadio}>
          <input
            id={o}
            type={'radio' || type}
            name={o}
            checked={value === o}
            value={o}
            onChange={onChangeCallback}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
          />
          {/* eslint-disable-next-line react/no-array-index-key */}
          <label key={`${name}-${i}`} htmlFor={o} className={s.label}>
            {o}
          </label>
        </span>
      ))
    : []

  return <div className={s.radioBtns}>{mappedOptions}</div>
}

Radio.defaultProps = {
  options: undefined,
  onChangeOption: () => {},
}
