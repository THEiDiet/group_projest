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
import { EDebounceDelay, EHelpers } from 'enums'
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
    const allPackLength = useAppSelector(state => state.cards.cardPacksTotalCount)
    const max = useAppSelector<number>(state => state.cards.rangeValues.maxCardsCount)
    const min = useAppSelector<number>(state => state.cards.rangeValues.minCardsCount)
    const localMinRage = useAppSelector<number>(state => state.cards.localMinRage)
    const localMaxRage = useAppSelector<number>(state => state.cards.localMaxRage)
    const [values, setValues] = useState<[number, number]>([localMinRage, localMaxRage])
    const search = (value: [number, number]): void => {
      showQuantityPacks(value)
    }
    const debounceSearch = useDebounce(search, EDebounceDelay.Range)
    const onSearchQuestionChange = useCallback((newValues: [number, number]): void => {
      setValues([newValues[EHelpers.Zero], newValues[EHelpers.One]])
      debounceSearch([newValues[EHelpers.Zero], newValues[EHelpers.One]])
    }, [])
    return (
      <div>
        <DoubleRangeSlider
          ref={ref}
          onChangeRange={onSearchQuestionChange}
          values={values}
          min={min}
          max={max}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
        />
      </div>
    )
  }),
)
