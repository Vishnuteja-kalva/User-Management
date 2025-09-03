
import {UserDisplay} from '../src/UserDisplay/UserDisplay.jsx'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AddUser } from '../src/AddUser/AddUser.jsx';
import { UpdateUser } from '../src/UpdateUser/UpdateUser.jsx';
function App(){
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<UserDisplay/>}></Route>
        <Route path = "/add" element = {<AddUser/>}></Route>
        <Route path = {`/update/:id`} element = {<UpdateUser/>}></Route>
        
      </Routes>
    </Router>
  )
}
export default App;