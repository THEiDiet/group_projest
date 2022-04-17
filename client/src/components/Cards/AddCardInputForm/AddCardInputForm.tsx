import React from 'react'

import { useFormik } from 'formik'

type propsType = {
  setAddNewCardModal: (value: boolean) => void
}

export const AddCardInputForm: React.FC<propsType> = ({ setAddNewCardModal }) => {
  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    onSubmit: values => {
      console.log(values)
      setAddNewCardModal(false)
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="question">Question</label>
      <input
        id="question"
        name="question"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.question}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="answer">Answer</label>
      <input
        id="answer"
        name="answer"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.answer}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
