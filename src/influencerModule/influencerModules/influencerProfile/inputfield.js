import React, { useEffect, useRef, useState } from 'react';
import '../../influencerModule.css';

const Editform = (props) => {
    const [update, setUpdate] = useState();

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    })

    const handleSubmit = (e) => {
      if(!update || /^\s*$/.test(update )){
        alert("oops!! you left the the data empty");
        return;
      }
        props.sendUpdate(update);
        setUpdate("");
    }

    const handleCancle = (e) => {
      props.cancleUpdate(true);
    }
    const handleChange = (event) => {
        setUpdate(event.target.value);
    }
    
  return (
    <div>
      {props.type === "text" || props.type === "date" || props.type === "email"?
      <>
          <input
          type={props.type}
            placeholder='Update your item'
            onChange={handleChange}
            name=  'text'
            ref={inputRef}
            className='todo-input edit'
            required={true}
          />
          <button className='profileEditButton update' onClick={handleSubmit}>
            Update
          </button>
          <button className='profileEditButton cancle' onClick={handleCancle}>
            Cancle
          </button>
          </>:null}
    </div>
  )
}

export default Editform;