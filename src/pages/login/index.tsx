import './style.scss'
import signInImage from '../../assets/signin.svg'
import signUpImage from '../../assets/signup.svg'

import { SiGithub, SiGoogle } from 'react-icons/si'
import toast, { Toaster } from 'react-hot-toast'

import { FormEvent, useContext, useState } from 'react'
import { auth } from '../../services/firebase'
import firebase from 'firebase'
import { AuthContext } from '../../contexts/AuthContext'

export function SignIn() {
  const { signInWithEmail, SignUpWithEmail, signInWithGoogle, signInWithGithub } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] =useState<any>(null)


  async function handleSignInWithEmail(e: FormEvent) {
    e.preventDefault()

    if (email.trim() === '' && password.trim() === '') {
      toast.error('Os campos abaixo são obrigatórios!')
      return
    }

    signInWithEmail(email, password)
  }

  async function handleSignUpWithEmail(e: FormEvent) {
    e.preventDefault()

    const user = {
      name,
      avatar,
      email,
      password
    }

    SignUpWithEmail(user)
  }

  async function handleSignInWithGoogle() {
    signInWithGoogle()
  }

  async function handleSignInWithGithub() {
    signInWithGithub()
  }

  function handleSignUpForm() {
    const signIn = document.getElementById('signIn')
    const signUp = document.getElementById('signUp')
    signIn?.classList.add('deactivate')
    signUp?.classList.remove('deactivate')
  }

  function handleSignInForm() {
    const signIn = document.getElementById('signIn')
    const signUp = document.getElementById('signUp')
    signIn?.classList.remove('deactivate')
    signUp?.classList.add('deactivate')
  }

  return (
    <div className="container">
      <aside>
        <img src={signInImage} alt="Logo" />
        <h2>Fearsocial</h2>
        <p>Entre e se conecte com seus amigos de todo mundo com o Fear Social</p>
      </aside>

      <div className="content">
        <div className="social-account" id="signIn">
          <form>
            <input
              type="text"
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
            />

            <button
              onClick={handleSignInWithEmail}
            >
              Entrar
            </button>
            <div className="account-settings">
              <a href="#" onClick={handleSignUpForm}>Não tem conta?</a>
              <a href="#nogo">Esqueci a senha</a>
            </div>
          </form>

          <div className="divider">Ou entre com</div>

          <button className="google-button" onClick={handleSignInWithGoogle}>
            <SiGoogle size={25} />
            Google
          </button>

          <button className="github-button" onClick={handleSignInWithGithub}>
            <SiGithub size={25} />
            Github
          </button>
        </div>

        <div className="social-account deactivate" id="signUp">
          <form>
            <input
              type="text"
              placeholder="Nome"
              onChange={e => setName(e.target.value)}
            />

            <label className="custom-file-upload">
              <input
                type="file"
                placeholder="Escolha uma capa para a sala"
                onChange={(e: any) => setAvatar(e.target.files[0])}
              />
              Selecionar avatar
            </label>

            <input
              type="text"
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
            />

            <button
              onClick={handleSignUpWithEmail}
            >
              Entrar
            </button>
            <div className="account-settings">
              <a href="#" onClick={handleSignInForm}>Já tem conta?</a>
            </div>
          </form>
          <img src={signUpImage} alt="" />
        </div>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}