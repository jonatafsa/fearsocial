import { BrowserRouter, Route } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'
import { Feed } from './pages/feed/index'
import { SignIn } from './pages/login/index'
// import { Test } from './pages/test'

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={SignIn} />
        <Route path="/feed" exact component={Feed} />
        {/* <Route path="/teste" exact component={Test} /> */}
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
