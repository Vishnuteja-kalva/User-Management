
import '../AddUser/AddUser.css'
import {Link} from 'react-router-dom';
import {useState} from 'react'
import axios from "axios"

export function AddUser(){
    const [user, setuser] = useState({name:"", email:"", address:""})
    
    function inputHandler(e){
        const {name, value} = e.target;
        setuser({...user, [name]: value}); 
        
    }
    
    async function SubmitForm(e){
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8080/api/users", user);
            alert("User added successfully!");
            
            // Reset form after successful submission
            setuser({name:"", email:"", address:""});
            
        } catch (error) {
            console.error("Error details:", error);
            if (error.response?.data?.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("Failed to add user. Please try again.");
            }
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