import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import s from 'components/common/DebounceRange/MultiRange/DoubleRangeSlider.module.scss'
import { OtherProps } from 'types'

export type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperDoubleRangePropsType = DefaultInputPropsType & OtherProps
export enum noMagicNumber {
  null = 0,
  one = 1,
  ten = 10,
  hundred = 100,
}
export const DoubleRangeSlider: FC<SuperDoubleRangePropsType> = props => {
  const { onChangeRange, values, className, min, max, ...rest } = props
  const minValue = values ? values[noMagicNumber.null] : noMagicNumber.null
  const maxValue = values ? values[noMagicNumber.one] : noMagicNumber.hundred
  const minValueRef = useRef(null)
  const maxValueRef = useRef(null)
  const rangeRef = useRef(null)

  const onHandleMinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+e.currentTarget.value, maxValue - noMagicNumber.one)
    e.currentTarget.value = value.toString()
    // eslint-disable-next-line no-unused-expressions
    onChangeRange && onChangeRange([value, maxValue])
  }

  const onHandleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+e.currentTarget.value, minValue + noMagicNumber.one)
    // eslint-disable-next-line no-unused-expressions
    onChangeRange && onChangeRange([minValue, value])
  }
  const minClassName = `${s.thumbRange} ${s.thumbRangeIndex3} ${
    values && values[noMagicNumber.null] > values[noMagicNumber.one] - noMagicNumber.ten
      ? s.thumbRangeIndex5
      : ''
  }`
  const maxClassName = `${s.thumbRange} ${s.thumbRangeIndex4}`
  const getPercent = useCallback(
    value =>
      // @ts-ignore
      Math.round(((value - min) / (max - min)) * noMagicNumber.hundred),
    [min, max],
  )

  useEffect(() => {
    if (maxValueRef.current) {
      const minPercent = getPercent(minValue)
      // @ts-ignore
      const maxPercent = getPercent(+maxValueRef.current.value)

      if (rangeRef.current) {
        // @ts-ignore
        rangeRef.current.style.left = `${minPercent}%`
        // @ts-ignore
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minValue, getPercent])

  useEffect(() => {
    if (minValueRef.current) {
      // @ts-ignore
      const minPercent = getPercent(+minValueRef.current.value)
      const maxPercent = getPercent(maxValue)

      if (rangeRef.current) {
        // @ts-ignore
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxValue, getPercent])

  return (
    <div className={s.range}>
      <div className={s.slider}>
        <div className={s.sliderTrack} />
        <div className={s.sliderRange} ref={rangeRef} />
      </div>
      <div className={s.thumbRangeContainer}>
        <span className={s.lowValue}>{minValue}</span>
        <input
          type="range"
          min={min}
          max={max}
          ref={minValueRef}
          value={minValue}
          onChange={onHandleMinValueChange}
          className={minClassName}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </div>
      <div className={s.thumbRangeContainer}>
        <label htmlFor="max" className={s.highValue}>
          {maxValue}
        </label>
        <input
          type="range"
          min={min}
          max={max}
          id="max"
          ref={maxValueRef}
          value={maxValue}
          onChange={onHandleMaxValueChange}
          className={maxClassName}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </div>
    </div>
  )
}
