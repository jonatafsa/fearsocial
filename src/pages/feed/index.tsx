import { Navigation } from '../../components/navigation/index'

import { RiNotification3Fill, RiSendPlaneFill } from 'react-icons/ri'
import { SiGooglemessages } from 'react-icons/si'
import { GiHearts } from 'react-icons/gi'

import './style.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Feed() {
  const { user } = useContext(AuthContext)
  const [friends, setFriends] = useState('')

  async function friendList() {
    console.log('minha lista de amigos:')
  }

  function handleTextarea() {
    const textarea: any = document.getElementById('textarea')
    const divTextarea: any = document.getElementById('div-textarea')
    // tx.setAttribute("style", "height" +  + "px")
    divTextarea.style.height = textarea.scrollHeight + "px"
  }

  if (!user) {
    console.log(user)
    return (
      <h1>Não está autenticado</h1>
    )
  }

  return (
    <div className="container">

      <header>
        <h2>Fearsocial</h2>

        <input type="text" placeholder="Busque por amigo, ou mensagem" />

        <div className="social">
          <div className="social-icons">
            <SiGooglemessages />
            <RiNotification3Fill />
            <GiHearts />
          </div>
          <img src="https://github.com/jonatafsa.png" alt="" />
        </div>
      </header>

      <div className="friends">
        <input type="text" placeholder="Buscar Amigo" />

        <div className="list-friends">
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZvTqqPEdT17PtRcePu3YgOHr7Ic4eLSOsMQOskxoqlQow4ST3-7RPBd6_R-CRNHLODxw&usqp=CAU" alt="" />
            <span>Armando Bueno</span>
            <div className="online"></div>
          </div>

          <div>
            <img src="https://www.urologicomogi.com.br/wp-content/uploads/2019/02/person2.jpg" alt="" />
            <span>Paula Maria</span>
            <div className="ausente"></div>
          </div>

          <div>
            <img src="https://eletropeldistribuidora.com.br/wp-content/uploads/2019/05/person-1-1.jpg" alt="" />
            <span>Aronh Detah</span>
            <div className="offline"></div>
          </div>

          <div>
            <img src="https://www.urologicomogi.com.br/wp-content/uploads/2019/02/person2.jpg" alt="" />
            <span>Paula Maria</span>
            <div className="ausente"></div>
          </div>

        </div>
      </div>

      <div className="chat">
        <div className="chat-header">
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZvTqqPEdT17PtRcePu3YgOHr7Ic4eLSOsMQOskxoqlQow4ST3-7RPBd6_R-CRNHLODxw&usqp=CAU" alt="" />
            <span>Armando Botelho Pinto</span>
          </div>
          <div className="online"></div>
        </div>

        <div className="chat-content">
          <span className="chat-friend">Hello Jhon</span>
          <span className="chat-profile">Hello, how are you Paula? Long time no see.</span>
          <span className="chat-profile">bla bla bla bla bla.</span>
          <span className="chat-friend">Bla bla bla bla, yes, bla bla.</span>
        </div>

        <div className="footer" id="div-textarea">
          <textarea id="textarea" onChange={handleTextarea} />
          <button onClick={friendList}>
            <RiSendPlaneFill />
            Enviar
          </button>
        </div>

      </div>

      <Navigation />
    </div>
  )
}
