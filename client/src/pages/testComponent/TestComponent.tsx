import React, { FC } from 'react'

import { Button } from 'components/common'
import { Radio } from 'components/common/radio/Radio'

export const TestComponent: FC = () => (
  <div>
    <Button>Button</Button>
    <Radio options={['cat', 'fish']} />
  </div>
)
