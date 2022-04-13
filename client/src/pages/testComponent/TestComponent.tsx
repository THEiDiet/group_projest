import React, { FC } from 'react'

import { Button } from '../../components/common'
import { Paginator } from '../../components/common/Pagination/Paginator'
import { Radio } from '../../components/common/radio/Radio'

export const TestComponent: FC = () => (
  <div>
    <Button>Button</Button>
    <Radio options={['cat', 'fish']} />
    <Paginator />
  </div>
)
