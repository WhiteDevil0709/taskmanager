import { useState } from 'react';
import '../styles/form.css'

function AddItem(){
 function handleSubmit(){

 }

 const [vars, setVars] = useState({
    "name": null,
    "title": null
 });

 function handleChange(e){
    // console.log(e.target.value);
    setVars({name:e.target.name.value,
            title: e.target.desc.value
    });
 }
    return(
        <>
        <div className="item-form">
            <h3>AddItem</h3>
            <form  className='form-style'>
            <input type="text" name="name" placeholder="Name..." className="input-box" onChange={handleChange} />
            <input type="text" name="desc" placeholder="Name..." className="input-box" onChange={handleChange} />
            <button className="btn" onSubmit={handleSubmit}>Add</button>
            </form>
        </div>
        <div>
            {vars.title}
            {vars.name}
        </div>
        </>
    );
}

export default AddItem;