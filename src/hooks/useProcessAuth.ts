import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const useProcessAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [username, setUsername] = useState('')
  const [birthday, setBirthday] = useState('')
  const [avatar, setAvatar] = useState('')
  const [gender, setGender] = useState('')
  const [agreement, setAgreement] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        username,
        email,
        password: pw,
        birthday,
        avatar,
        gender,
        agreement,
      })
    } else {
      await registerMutation
        .mutateAsync({
          username,
          email,
          password: pw,
          birthday,
          avatar,
          gender,
          agreement,
        })
        .then(() =>
          loginMutation.mutate({
            username,
            email,
            password: pw,
            birthday,
            avatar,
            gender,
            agreement,
          })
        )
        .catch(() => {
          setPw('')
          setEmail('')
          setUsername('')
          setBirthday('')
          setAvatar('')
          setGender('')
          setAgreement(false)
        })
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries('tasks')
    queryClient.removeQueries('user')
    queryClient.removeQueries('single')
    navigate('/')
  }
  return {
    email,
    setEmail,
    pw,
    setPw,
    birthday,
    setBirthday,
    username,
    setUsername,
    avatar,
    setAvatar,
    gender,
    setGender,
    agreement,
    setAgreement,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout,
  }
}
