import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Player(props){
    return(
        <div className="cont-player" onClick={props.function}>
            <div className="cont-image">
                <img src={props.data.img}/>
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
        {id: 0, nombre:"Eduardo", img:"0.jpg"},
        {id: 1, nombre:"Daniel", img:"1.jpg"},
        {id: 2, nombre:"Pedro", img:"2.jpg"},
        {id: 3, nombre:"Alicia", img:"3.jpg"},
        {id: 4, nombre:"Katherine", img:"4.jpg"},
    ]

    const Team1 = []
    Team1.push({id: 5, nombre:"CAPI", img:"5.jpg"})
    const Team2 = []
    Team2.push({id: 5, nombre:"CAPI", img:"5.jpg"})

    const [board,setBoard] = useState(Personas);
    const [team1,setTeam1] = useState(Team1);
    const [team2,setTeam2] = useState(Team2);
    const [turnTeam1,setTurn] = useState(true);

    // function removePlayer1(id){
    //     // const newTeam =  team1.slice()
    //     // newTeam.splice(i)
    //     // setTeam1(newTeam)
    // }

    // function removePlayer2(id){
    //     // const newTeam =  team2.slice()
    //     // newTeam.splice(i)
    //     // setTeam2(newTeam)
    // }

    function addPlayer(id){
        console.log(id)
        if(turnTeam1){
            const player = Personas.filter(item => item.id === id)
            const newBoard = board.filter(item => item.id !== id)
            const newTeam = team1.slice()
            newTeam.push(player[0])
            setTeam1(newTeam)
            setBoard(newBoard)
            console.log("Team1")
            console.log(team1)
        }else{
            const player = Personas.filter(item => item.id === id)
            const newBoard = board.filter(item => item.id !== id)
            const newTeam = team2.slice()
            newTeam.push(player[0])
            setTeam2(newTeam)
            setBoard(newBoard)
            console.log("Team2")
            console.log(team2)
        }
        setTurn(!turnTeam1)
    }
    function ret(){
        return
    }
    return(
        <div className="main-cont">
            <ContPlayers key={0} data={Team1} function={ret}/>
            <ContPlayers key={1} data={Team2} function={ret}/>
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