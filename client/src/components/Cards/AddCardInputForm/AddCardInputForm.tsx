import React from 'react'

import { useFormik } from 'formik'

import { CardTypePartial } from '../../../types/PackTypes'
import { Button } from '../../common'
import { Input } from '../../index'

import s from './style/AddCardInputForm.module.css'

import styles from 'styles/Auth/Auth.module.scss'

type propsType = {
  setAddNewCardModal: (value: string) => void
  createCard: (card: CardTypePartial) => void
}

export const AddCardInputForm: React.FC<propsType> = ({ setAddNewCardModal, createCard }) => {
  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    onSubmit: values => {
      createCard(values)
      setAddNewCardModal('')
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1>Card Info</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.input_block}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="question">
              <h2>Question: </h2>
            </label>
            <Input
              id="question"
              name="question"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.question}
            />
          </div>

          <div className={styles.input_block}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="answer">
              <h2>Answer:</h2>
            </label>
            <Input
              id="answer"
              name="answer"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.answer}
            />
          </div>
          <div className={s.btn}>
            <Button className={s.cancelButton} type="button" onClick={() => setAddNewCardModal('')}>
              Cancel
            </Button>
            <Button className={s.confirmButton} type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
