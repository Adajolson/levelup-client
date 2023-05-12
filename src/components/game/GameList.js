import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames, deleteGame } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const navigate = useNavigate()
    const [ games, setGames ] = useState([])
    const { gameId } = useParams()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button onClick={deleteGame(gameId)}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}