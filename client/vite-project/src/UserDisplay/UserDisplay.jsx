import '../UserDisplay/UserDisplay.css'
import axios from "axios"
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
export function UserDisplay(){
    const [userData,setUserData] = useState([])
    
   async function HandleDelete(index){
        const response = await axios.delete(`http://localhost:8080/api/delete/user/${index}`);
        setUserData(userData.filter(user => user._id != index));
    }
   useEffect(()=>{
    const fetchData = async() =>{
        try {
            const response = await axios.get("http://localhost:8080/api/info")
            setUserData(response.data); // ✅ Set the data to state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    fetchData();
},[])
    return(
        <div className = "table-display">
            <Link to = "/add">
            <button id = "add-btn" >Add User+</button>
            </Link>
            
            
    <h3>User Information</h3>
    <table>
        <thead>
      <tr>
        <th>Name: </th>
        <th>Email: </th>
        <th>Address: </th>
        <th>Actions -</th>
      </tr>
      </thead>
     <tbody>
    {userData.length > 0 ? (
        userData.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                    <Link to = {`/update/${user._id}`} >
                    <button >Upd</button>
                    </Link>
                    
                    <button onClick = {() =>{HandleDelete(user._id)}}>Del</button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="4">No users found</td>
        </tr>
    )}
</tbody>
    </table>
  </div>
    )
}