import React from 'react'

import { useFormik } from 'formik'

import { CardTypePartial } from '../../../types/PackTypes'

import s from './style/AddCardInputForm.module.css'

type propsType = {
  setAddNewCardModal: (value: boolean) => void
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
      setAddNewCardModal(false)
    },
  })
  return (
    <div className={s.container}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="question">Question: </label>
          <input
            id="question"
            name="question"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.question}
          />
        </div>

        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="answer">Answer: </label>
          <input
            id="answer"
            name="answer"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.answer}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
