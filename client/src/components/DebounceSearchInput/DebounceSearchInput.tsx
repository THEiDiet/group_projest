import {useDebounce} from 'hooks';
import React, {
    ChangeEvent,
    DetailedHTMLProps,
    FC,
    forwardRef,
    InputHTMLAttributes,
    memo,
    RefAttributes,
    useCallback,
    useState
} from 'react'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

type DebounceSearchFieldPropsType = DefaultInputPropsType &
    RefAttributes<HTMLInputElement> & {
    searchValue: (value: string) => void;
};

export const DebounceSearchInput: FC<DebounceSearchFieldPropsType> = memo(
    forwardRef(({searchValue, ...restProps}, ref) => {

        const [value, setValue] = useState('')

        const search = (question: string): void => {
            searchValue(question)
        }

        const debounceSearch = useDebounce(search, 500)
        const onSearchQuestionChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
            setValue(e.currentTarget.value)
            debounceSearch(e.currentTarget.value)
        }, [])

        return <input ref={ref} type="text" value={value} {...restProps}/>

    }))
