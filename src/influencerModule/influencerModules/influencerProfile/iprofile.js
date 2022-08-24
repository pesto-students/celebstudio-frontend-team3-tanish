import React, { useState } from 'react';
import {FiEdit2} from 'react-icons/fi'


const Iprofile = () => {
    const [profileData, setProfileData] = useState([{
        userID:"",
        fname:"asd",
        lname:"asd",
        email:"sadf",
        cnum:"asdf",
        fcount:"asdf",
        platform:"adf",
        platformUrl:"asdf",
        DOB:"asdf",
        Password:"",
}]);

const handleEdit = (event) => {

}

  return (
    <div className='profileContainer'>
    
                {profileData.map((items) =>(
                    <div className='profileCard'  key={items.userID}>
                      <div>UserID        <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.userID} </div>  </div>
                      <div>FirstName     <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.fname}  </div>  </div>
                      <div>LastName      <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.lname}  </div>  </div>
                      <div>DOB           <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.DOB}    </div>  </div>
                      <div>eMAIL         <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.email}  </div>  </div>  
                      <div>ContactNumber <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.cnum}   </div>  </div>     
                      <div>Fcount        <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">{items.fcount} </div>  </div>   
                      <div>Password      <button className='buttons' onClick={handleEdit}><FiEdit2 /></button> <div className="profileItem">**********     </div>  </div>
                    </div>
                  ))}
    </div>
  )
}

export default Iprofile;