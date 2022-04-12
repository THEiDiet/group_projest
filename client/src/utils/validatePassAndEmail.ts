import { LoginParamsType } from 'types/UserApiType'

const MIN_PASS_LENGTH = 7

export const validatePassAndEmail = (
  values: Omit<LoginParamsType, 'rememberMe'>,
): Omit<LoginParamsType, 'rememberMe'> => {
  const errors = {} as Omit<LoginParamsType, 'rememberMe'>
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password.length < MIN_PASS_LENGTH) {
    errors.password = 'Password must be more than 7 symbols'
  } else if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}
