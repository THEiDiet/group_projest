import React, {
  DetailedHTMLProps,
  FC,
  forwardRef,
  InputHTMLAttributes,
  memo,
  RefAttributes,
  useCallback,
  useState,
} from 'react'

import { DoubleRangeSlider } from 'components/common/DebounceRange/MultiRange/DoubleRangeSlider'
import { EDebounceDelay } from 'enums'
import { useAppSelector, useDebounce } from 'hooks'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type DebounceViewRangePropsType = DefaultInputPropsType &
  RefAttributes<HTMLInputElement> & {
    showQuantityPacks: (value: [number, number]) => void
  }

export const DebounceRange: FC<DebounceViewRangePropsType> = memo(
  forwardRef(({ showQuantityPacks, ...restProps }, ref) => {
    const allPackLength = useAppSelector(state => state.cards.actualPacks.length)
    const minValue = 0
    const [values, setValues] = useState<[number, number]>([minValue, allPackLength])
    const search = (value: [number, number]): void => {
      showQuantityPacks(value)
    }
    const debounceSearch = useDebounce(search, EDebounceDelay.Range)
    const onSearchQuestionChange = useCallback((newValues: [number, number]): void => {
      const index0 = 0
      const index1 = 1
      setValues([newValues[index0], newValues[index1]])
      // console.log(newValues)
      debounceSearch([newValues[index0], newValues[index1]])
    }, [])
    return (
      <div>
        <DoubleRangeSlider
          ref={ref}
          onChangeRange={onSearchQuestionChange}
          values={values}
          min={minValue}
          max={allPackLength}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
        />
      </div>
    )
  }),
)
