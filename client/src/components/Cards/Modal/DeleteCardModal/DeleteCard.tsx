import React from 'react'

type propsType = {
  setWhatModalIsActive: (value: string) => void
  onConfirmDeleteClickHandler: (id: string) => void
  useStateId: string
}

const DeleteCard: React.FC<propsType> = ({
  setWhatModalIsActive,
  onConfirmDeleteClickHandler,
  useStateId,
}) => (
  <>
    {' '}
    <div> Are you sure you want to delete this card ?</div>
    <button type="button" onClick={() => setWhatModalIsActive('')}>
      No
    </button>
    <button type="button" onClick={() => onConfirmDeleteClickHandler(useStateId)}>
      Yes
    </button>{' '}
  </>
)

export default DeleteCard
