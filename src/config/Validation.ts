import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

export const CodeSchema = yup.object().shape({
  code: yup
    .string()
    .required()
    .min(4)
    .matches(/^[a-zA-Z0-9]*$/)
})

export const ConfirmationSchema = yup.object().shape({
  code: yup.string().required()
})

export const RecoverPasswordSchema = yup.object().shape({
  code: yup.string().required()
})

export const HabitSchema = yup.object().shape({
  title: yup.string().required().min(5),
  description: yup.string(),
  period: yup.string().required()
})
