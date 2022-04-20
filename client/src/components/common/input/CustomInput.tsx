import React from 'react'

import styles from 'components/common/input/styles/Input.module.scss'
import { InputPropsType } from 'types/InputPropsType'

export const Input: React.FC<InputPropsType> = props => {
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
          <button onClick={onClick} type="button" className={styles.button}>
            <img className={styles.icon} src={icon} alt="Button for show/close password" />
          </button>
        )}
      </div>
    </div>
  )
}
