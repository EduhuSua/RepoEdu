import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Player(props){
    return(
        <div className="cont-player" onClick={props.function}>
            <div className="cont-image">
                <img src={props.data.img} alt="Player"/>
            </div>
            <div className="cont-description">
                <p>{props.data.nombre}</p>
                <p>{props.data.id}</p>
            </div>
        </div>
    )
}

function ContPlayers(props){
    return(
        <div className="cont-teams"> 
            {
                props.data.map(player =>(
                    <Player 
                        key={player.id} 
                        data={player} 
                        function={() => props.function(player.id)}/>
                ))
            }
        </div>
    )
}

function App(props){

    const Personas = [
        {id: 0, nombre:"Eduardo", img:"./img/1.jpg"},
        {id: 1, nombre:"Daniel", img:"./img/2.jpg"},
        {id: 2, nombre:"Pedro", img:"./img/3.jpg"},
        {id: 3, nombre:"Alicia", img:"./img/.jpg"},
        {id: 4, nombre:"Katherine", img:"./img/5.jpg"},
    ]
    const Team1 = []
    Team1.push({id: 5, nombre:"CAPI", img:"./img/6.jpg"})
    const Team2 = []
    Team2.push({id: 5, nombre:"CAPI", img:"./img/7.jpg"})

    const [board,setBoard] = useState(Personas);
    const [team1,setTeam1] = useState(Team1);
    const [team2,setTeam2] = useState(Team2);
    const [turnTeam1,setTurn] = useState(true);

    function removePlayer1(id){
        const player = Personas.filter(item => item.id === id)
        const newTeam1 = team1.filter(item => item.id !== id)
        setTeam1(newTeam1[0])

        const newBoard = board.push(player[0])
        setBoard(newBoard)
    }

    function removePlayer2(id){
        const player = Personas.filter(item => item.id === id)
        const newTeam2 = team2.filter(item => item.id !== id)
        setTeam1(newTeam2[0])
        
        const newBoard = board.push(player[0])
        setBoard(newBoard)
    }

    function addPlayer(id){
        if(turnTeam1){
            const player = Personas.filter(item => item.id === id)
            const newBoard = board.filter(item => item.id !== id)
            const newTeam = team1.slice()
            newTeam.push(player[0])
            console.log("Team1")
            console.log(newTeam)
            setTeam1(newTeam)
            setBoard(newBoard)
        }else{
            const player = Personas.filter(item => item.id === id)
            const newBoard = board.filter(item => item.id !== id)
            const newTeam = team2.slice()
            newTeam.push(player[0])
            console.log("Team2")
            console.log(newTeam)
            setTeam2(newTeam)
            setBoard(newBoard)
        }
        setTurn(!turnTeam1)
    }
    function ret(){
        return
    }
    return(
        <div className="main-cont">
            <ContPlayers key={0} data={team1} function={ret}/>
            <ContPlayers key={1} data={team2} function={ret}/>
            <ContPlayers 
                key={2} 
                data={board}  
                function={addPlayer}/>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)