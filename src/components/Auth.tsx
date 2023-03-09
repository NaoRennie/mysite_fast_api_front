import { FC } from 'react'
import { RefreshIcon } from '@heroicons/react/solid'
import { useProcessAuth } from '../hooks/useProcessAuth'
import './Auth.css'

export const Auth: FC = () => {
  const {
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
  } = useProcessAuth()
  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className="auth-register ">
        <h1 className="auth-loading">Loading...</h1>
      </div>
    )
  }
  return (
    <div className="auth-content">
      <div className="auth-title-content">
        <span className="auth-title-text">Todo web app</span>
      </div>
      {isLogin ? (
        <form className="auth-form" onSubmit={processAuth}>
          <h2>login</h2>
          <div>
            <input
              className="auth-input"
              name="username"
              type="text"
              autoFocus
              placeholder="user name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <input
              className="auth-input"
              name="email"
              type="email"
              autoFocus
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>
          <div>
            <button
              className="auth-button"
              disabled={!email || !pw || !username}
              type="submit"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      ) : (
        <form className="auth-form" onSubmit={processAuth}>
          <h2>create a new account</h2>
          <div>
            <input
              className="auth-input"
              name="username"
              type="text"
              autoFocus
              placeholder="user name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <input
              className="auth-input"
              name="email"
              type="email"
              autoFocus
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>
          <div>
            <input
              className="auth-input"
              name="birthday"
              type="text"
              autoFocus
              placeholder="birthday(2022/1/1)"
              onChange={(e) => setBirthday(e.target.value)}
              value={birthday}
            />
          </div>
          <div>
            <input
              className="auth-input"
              name="gender"
              type="text"
              autoFocus
              placeholder="gender"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            />
          </div>
          <div>
            <p className="auth-input-p">アバターファイル選択</p>
            <input
              className="auth-input"
              name="avatar"
              type="file"
              accept="image/*"
              autoFocus
              placeholder="avatar"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
          </div>

          <div>
            <p className="auth-input-p">利用規約を読みましたか？</p>
            <label>承諾します</label>
            <input
              className="auth-input"
              name="afarmitive"
              type="radio"
              autoFocus
              placeholder="yes"
              onChange={(e) => setAgreement(true)}
            />
          </div>
          <div>
            <button
              className="auth-button"
              disabled={
                !email ||
                !pw ||
                !username ||
                !birthday ||
                !gender ||
                !avatar ||
                !agreement
              }
              type="submit"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      )}
      <p className="toggle-p">
        {isLogin ? '新しくアカウントを作成する' : 'ログインする'}
      </p>
      <RefreshIcon onClick={() => setIsLogin(!isLogin)} className="auth-icon" />
    </div>
  )
}
