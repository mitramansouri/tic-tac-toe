import { useState } from "react";


export default function Player({initialName , sympol, ...props}){

    const [playerName, setPlayerName] = useState(initialName);

    const [isEditing, setIsEditing] = useState(false);

    function handleChange(event){
        console.log(event.target.value);
        setPlayerName(event.target.value);
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
        <li> 
            <span className="player"> 
              {playerContent}
            </span>
            <button onClick={setEditingHandler} {...props}>{editText}</button>
          </li>
    );
}