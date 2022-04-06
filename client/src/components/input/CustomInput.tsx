import React from 'react'

import styles from './styles/CustomInput.module.scss'

import { InputPropsType } from 'types/InputPropsType'

export const CustomInput = React.memo((props: InputPropsType) => {
  const { label, onClick, icon, type, id, name, onChange, value, ...rest } = props
  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={styles.text_field_label}>
        {label}
      </label>
      <div>
        <input
          required
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          onBlur={rest.onBlur}
        />
        {icon && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span onClick={onClick}>
            <img
              className={styles.icon}
              src={icon}
              alt="Button for show/close password"
            />
          </span>
        )}
      </div>
    </div>
  )
})
