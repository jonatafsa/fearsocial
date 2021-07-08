import { AiOutlineHome, AiOutlineUser, AiOutlineMessage } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { IoMdHelp } from 'react-icons/io'

import './style.scss';

export function Navigation() {
  
  function handleChangeList(e: any) {
    const list = document.querySelectorAll('.list')
    const id = e.nativeEvent.path[2].id
    const myList = document.getElementById(id)
    
    const home = document.getElementById('home')
    home?.classList.remove('active')

    for(let i = 0; i < list.length; i++) {
      list[i].classList.remove('active')
    }

    myList?.classList.add('active')
  }

  function showFullMenu() {
    const menu = document.getElementById('ulNavigation')
    menu?.classList.add('show-menu')
  }

  function hideMenu() {
    const menu = document.getElementById('ulNavigation')
    menu?.classList.remove('show-menu')
  }
  
  return (
    <div className="navigation" id="ulNavigation">
      <ul onMouseOver={showFullMenu} onMouseOut={hideMenu}>
        <li className="list active" id="home" onClick={(e) => handleChangeList(e)}>
          <a href="/feed" id="home">
          <span className="icon"><AiOutlineHome className="react-icons" /></span>
          <span className="title">Home</span>
          </a>
        </li>
        <li className="list" id="profile" onClick={(e) => handleChangeList(e)}>
        <a href="/profile" id="profile">
          <span className="icon"><AiOutlineUser className="react-icons" /></span>
          <span className="title">Profile</span>
          </a>
        </li>
        <li className="list" id="messages" onClick={(e) => handleChangeList(e)}>
        <a href="/messages" id="messages">
          <span className="icon"><AiOutlineMessage className="react-icons" /></span>
          <span className="title">Messages</span>
          </a>
        </li>
        <li className="list" id="friends" onClick={(e) => handleChangeList(e)}>
        <a href="/friends" id="friends">
          <span className="icon"><FiUsers className="react-icons" /></span>
          <span className="title">Friends</span>
          </a>
        </li>
        <li className="list" id="settings" onClick={(e) => handleChangeList(e)}>
        <a href="/settings" id="settings">
          <span className="icon"><IoSettingsOutline className="react-icons" /></span>
          <span className="title">Settings</span>
          </a>
        </li>
        <li className="list" id="help" onClick={(e) => handleChangeList(e)}>
        <a href="/help" id="help">
          <span className="icon"><IoMdHelp className="react-icons" /></span>
          <span className="title">Help</span>
          </a>
        </li>
        <li className="list sign-out" id="signOut" onClick={(e) => handleChangeList(e)}>
        <a href="/logout" id="signOut">
          <span className="icon"><IoLogOutOutline className="react-icons" /></span>
          <span className="title">SignOut</span>
          </a>
        </li>
      </ul>
    </div>
  )
}