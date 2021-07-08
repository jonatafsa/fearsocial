import { createContext, ReactNode, useEffect, useState } from 'react'
//Ferramenta usada para navegação
import { useHistory } from 'react-router-dom'

import toast from 'react-hot-toast'
import { auth, database, firebase } from '../services/firebase'

//Definindo o tipo do usuário
type User = {
  id: string
  name: string | null
  avatar: string | null
}

//Definindo o tipo do Contexto
type AuthContextType = {
  //user recebe o tipo 'User do usuário de contexto'
  user: User | undefined
  signInWithEmail: any
  SignUpWithEmail: any
  signInWithGoogle: any
  signInWithGithub: any
  //signInWithGoogle recebe uma função de processamento assíncrona(Promise), sem retorno'<void>'
  // signInWithGoogle: () => Promise<void>
}

//As propriedades do contexto(children) recebe o tipo ReactNode(JSX.Element), nativo do React
type AuthContextProviderProps = {
  children: ReactNode
}

type FriendListProps = Record<string, {
  id: string
  name: string
  avatar: string
}>

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const history = useHistory()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    //Função que verifica se o usuário já esta autenticado
    const unsubscribe = auth.onAuthStateChanged(user => {

      //LÓGICA:
      //Se o useEffect achar um usuário(user)
      if (user) {
        //Cria uma constante contendo os seguintes dados a seguir
        const { displayName, photoURL, uid } = user;

        //Se dentro desse usuário(user), não houver os seguintes dados
        if (!displayName || !photoURL) {
          //Retorna uma mensagem de erro
          throw new Error('Missing information from Google Account.');
        }

        //define o usuário com os dados existentes
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    //Retorna uma função do useEffect para fazer a limpeza
    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithEmail(email: string, password: string) {

    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        if (userCredential.user) {
          const { uid, displayName, photoURL } = userCredential.user

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })

          const userRef = database.ref('users')

          userRef.once('value', users => {
            const friendList: FriendListProps = users.val()
            const userId = Object.entries(friendList ?? {}).find(([key, value]) => value.id === uid)?.[0] || null
    
            if (!userId) {
              console.log('Não vou salvar ninguém...')
              return
            } else {
              userRef.push({
                id: uid,
                name: displayName,
                avatar: photoURL,
                friendList: null,
                messages: null,
                state: 'offline',
              })
            }
          })
        }

        history.push('/feed')
      })
      .catch((error) => {
        toast.error(`Erro: ${error.code}`)
        toast.error(`reason: ${error.message}`)
      })
  }

  //Função que tenta cadastrar o usuário
  async function SignUpWithEmail(user: any) {
    const { name, avatar, email, password } = user

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = firebase.auth().currentUser;
        var photoURL
        console.log(user)

        const storageRef = firebase.storage().ref()

        storageRef.child(`images/${email}.jpg`).put(avatar)
          .then(result => {
            console.log(result)
            var photoURL = 'Xablau'
            return photoURL
          }).catch((error) => {
            console.log(`Erro Upload Image: ${error}`)
          })

        user?.updateProfile({
          displayName: name,
          photoURL: photoURL
        }).then(() => {
          console.log(`Dados do usuário alterados: ${userCredential.user}`)
        }).catch((error) => {
          console.log(`Erro na alteração de dados do usuário: ${error}`)
        })

        history.push('/')
      })
      .catch((error) => {
        toast.error(`Erro: ${error.code} - ${error.message}`)
      })
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const userCredential = await auth.signInWithPopup(provider)

    if (userCredential.user) {
      const { uid, displayName, photoURL } = userCredential.user

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

      const userRef = database.ref('users')

      userRef.once('value', users => {
        const friendList: FriendListProps = users.val()
        const userId = Object.entries(friendList ?? {}).find(([key, value]) => value.id === uid)?.[0] || null

        if (!userId) {
          console.log('Não vou salvar ninguém...')
          return
        } else {
          userRef.push({
            id: uid,
            name: displayName,
            avatar: photoURL,
            friendList: null,
            messages: null,
            state: 'offline',
          })
        }
      })

      history.push('/feed')
    }
  }

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider()
    const userCredential = await auth.signInWithPopup(provider)

    if (userCredential.user) {
      const { uid, displayName, photoURL } = userCredential.user

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

      const userRef = database.ref('users')

      userRef.once('value', users => {
        const friendList: FriendListProps = users.val()
        const userId = Object.entries(friendList ?? {}).find(([key, value]) => value.id === uid)?.[0] || null

        if (!userId) {
          console.log('Não vou salvar ninguém...')
          return
        } else {
          userRef.push({
            id: uid,
            name: displayName,
            avatar: photoURL,
            friendList: null,
            messages: null,
            state: 'offline',
          })
        }
      })

      history.push('/feed')
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signInWithEmail,
      SignUpWithEmail,
      signInWithGoogle,
      signInWithGithub
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}