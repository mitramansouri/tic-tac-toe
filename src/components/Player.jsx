import { useState, useEffect } from "react";


export default function Player({initialName , sympol, isActive,onNameChange, ...props}){

    const [playerName, setPlayerName] = useState(initialName);

    const [isEditing, setIsEditing] = useState(false);

    function handleChange(event){
        setPlayerName(event.target.value);
        onNameChange(event.target.value); // Trigger the callback on name change
    }

    function setEditingHandler(){
        setIsEditing((editing)=> !editing);
    }

    let editText = 'Edit';

    let playerContent = <span>
        <span className="player-name">{playerName}</span> <span className="player-symbol">{sympol}</span>
    </span> ;

    if (isEditing){
        playerContent = <span>
            <input type="text" required value={playerName} onChange={handleChange}/> 
             <span className="player-symbol">{sympol}</span>
        </span>
        editText = 'Save';
    }
    return (
        <li className={isActive ? 'active' : undefined}> 
            <span className="player"> 
              {playerContent}
            </span>
            <button onClick={setEditingHandler} {...props}>{editText}</button>
          </li>
    );
}