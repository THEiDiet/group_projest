export type InputPropsType = {
  id?: string
  name: string
  type: string
  onChange: (value: any) => void
  value: string
  onBlur?: (e: any) => void
  icon?: string
  onClick?: () => void
  label?: string
}
