import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import img5 from "./img/5.jpg"
import img4 from "./img/4.jpg"
import img6 from "./img/6.jpg"
import img7 from "./img/7.jpg"

import './index.css';

type Persona={
    id:number,
    nombre:string,
    img:string,
    function: (id:number) => void,
    capitan:boolean;
}

type data = {
    id:number,
    nombre:string,
    img:string,
    capitan:boolean;
}[];

interface PropsContPlayer{
    data:data,
    function: (id:number) => void,
    team?:boolean;
}


const Player:React.FC<Persona> = (props) => {
    const capitan = props.capitan

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () =>{
        console.log("CLICK PAPU")
        props.function(props.id)
        return 
    }

    if(capitan){
        return(
            <div className="cont-player">
                <div className="cont-image">
                    <img src={props.img} alt="Player"/>
                </div>
                <div className="cont-description">
                    <p>{props.nombre}</p>
                </div>
            </div>
        )
    }else{
        return(
            <div className="cont-player" onClick={handleClick}>
                <div className="cont-image">
                    <img src={props.img} alt="Player"/>
                </div>
                <div className="cont-description">
                    <p>{props.nombre}</p>
                </div>
            </div>
        )
    }
}


const ContPlayers: React.FC<PropsContPlayer> = (props) =>{
    const isTeam  = props.team
    if(isTeam){
    return(
        <div className="cont-teams team"> 
            {
                props.data.map(player =>(
                    <Player 
                        key={player.id}
                        nombre = {player.nombre}
                        img = {player.img}
                        capitan = {player.capitan} 
                        id={player.id} 
                        function={() => props.function(player.id)}/>
                ))
            }
        </div>
    )
    }else{
    return(
        <div className="cont-teams"> 
            {
                props.data.map(player =>(
                    <Player 
                        key={player.id}
                        nombre = {player.nombre}
                        img = {player.img}
                        capitan = {player.capitan} 
                        id={player.id} 
                        function={() => props.function(player.id)}/>
                ))
            }
        </div>
        )
    }
};

const App = () =>{

    const Personas = [
        {id: 0, nombre:"Eduardo", img: img1, capitan: false},
        {id: 1, nombre:"Daniel", img: img2, capitan: false},
        {id: 2, nombre:"Pedro", img: img3, capitan: false},
        {id: 3, nombre:"Alicia", img: img4, capitan: false},
        {id: 4, nombre:"Katherine", img: img5, capitan: false},
    ]
    const Team1 = []
    Team1.push({id: 5, nombre:"CAPI", img: img6, capitan: true})
    const Team2 = []
    Team2.push({id: 6, nombre:"CAPI", img: img7, capitan: true})

    const [board,setBoard] = useState(Personas);
    const [team1,setTeam1] = useState(Team1);
    const [team2,setTeam2] = useState(Team2);
    const [turnTeam1,setTurn] = useState(true);
    const [turno,setTurno] = useState(true);

    function removePlayer1(id:number){
        const player = Personas.filter(item => item.id === id)
        const newBoard = board.slice() 
        const newTeam1 = team1.filter(item => item.id !== id)
        newBoard.push(player[0])
        setTeam1(newTeam1)
        setBoard(newBoard)
    }

    function removePlayer2(id:number){
        const player = Personas.filter(item => item.id === id)
        const newBoard = board.slice() 
        const newTeam2 = team2.filter(item => item.id !== id)
        newBoard.push(player[0])
        setTeam2(newTeam2)
        setBoard(newBoard)
    }

    function addPlayer(id:number){
        setTurno(!turno)
        if(turnTeam1){
            const player = Personas.filter(item => item.id === id)
            const newBoard = board.filter(item => item.id !== id)
            const newTeam = team1.slice()
            newTeam.push(player[0])
            setTeam1(newTeam)
            setBoard(newBoard)
        }else{
            const player = Personas.filter(item => item.id === id)
            const newBoard = board.filter(item => item.id !== id)
            const newTeam = team2.slice()
            newTeam.push(player[0])
            setTeam2(newTeam)
            setBoard(newBoard)
        }
        setTurn(!turnTeam1)
    }
    let valorTurno = ""
    if(turno){
        valorTurno = "Equipo de la Izq"
    }else{
        valorTurno = "Equipo de la Der"
    }
    return(
        <div className="intentoBody">
            <div className="header">
                <h1>Seleccionador poderoso de equipos</h1>
                <hr/>
            </div>
            <div className="main-cont">
                <ContPlayers key={0} data={team1} function={removePlayer1} team={true}/>
                <ContPlayers key={1} data={team2} function={removePlayer2} team={true}/>
                <ContPlayers key={2} data={board} function={addPlayer} team={false}/>
            </div>
            <h2>Turno de {valorTurno}</h2>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)