import { useState } from "react";


export default function Player({name , sympol, ...props}){
    const [isEditing, setIsEditing] = useState(false);

    function setEditingHandler(){
        setIsEditing((editing)=> !editing);
    }
    let editText = 'Edit';
    let playerContent = <span>
        <span className="player-name">{name}</span> <span className="player-symbol">{sympol}</span>
    </span> ;

    if (isEditing){
        playerContent = <span>
            <input type="text" required value={name}/> 
             <span className="player-symbol">{sympol}</span>
        </span>
        editText = 'Save';
    }
    return (
        <li> 
            <span className="player"> 
              {playerContent}
            </span>
            <button onClick={setEditingHandler} {...props}>{editText}</button>
          </li>
    );
}