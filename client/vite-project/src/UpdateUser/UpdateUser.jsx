import {Link,useParams,useNavigate} from 'react-router-dom';
import {useState} from 'react'
import axios from "axios";

export function UpdateUser(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setuser] = useState({name:"", email:"", address:""})
    
    function inputHandler(e){
        const {name, value} = e.target;
        setuser({...user, [name]: value}); 
        
    }
    
    async function SubmitForm(e){
        e.preventDefault();
        
        try {
           const updated = await axios.put(`http://localhost:8080/api/update/user/${id}`,user);
           alert("Updated Succesfully")
           navigate('/')
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <div className="form-container">
            <Link to="/">
                <button>..Back</button>
            </Link>
            
            <form className="form-data" onSubmit={SubmitForm}>
                <label htmlFor="ip1">Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    id="ip1" 
                    value={user.name} // ✅ Added controlled input
                    onChange={inputHandler} 
                    placeholder="Enter Name" 
                    required 
                />
                
                <label htmlFor="ip2">Email: </label>
                <input 
                    type="email" 
                    name="email" 
                    id="ip2" 
                    value={user.email} // ✅ Added controlled input
                    onChange={inputHandler} 
                    placeholder="Enter Email" 
                    required 
                />
                
                <label htmlFor="ip3">Address: </label>
                <input 
                    type="text" 
                    name="address" 
                    id="ip3" 
                    value={user.address} // ✅ Added controlled input
                    onChange={inputHandler} 
                    placeholder="Enter Address" 
                    required 
                />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}