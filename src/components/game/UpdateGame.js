import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getGameById, updateGame } from "../../managers/GameManager"

export const UpdateGame = () => {
    const [game, setGame] = useState({
        skill_level: 0,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            getGameById(gameId).then((res) => setGame(res))
        }, [])

    useEffect(
        () => {
            getGameTypes().then((res) => setGameTypes(res))
        }, []
    )
    
    const changeGameState = (domEvent) => {
        const copy = {...game}
        copy[domEvent.target.name] = domEvent.target.value
        setGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <select name="number_of_players" value={game.number_of_players}
                    onChange={changeGameState}>
                        <option value="0">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <select name="skill_level" value={game.skill_level}
                    onChange={changeGameState}>
                        <option value="0">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type_id">Game Type: </label>
                    <select name="game_type_id" value={game.game_type}
                    onChange={changeGameState}>
                        <option>Choose a category:</option>
                            {
                                gameTypes.map(
                                    gameType => {
                                        return <option value={gameType.id}>{gameType.label}</option>
                                    }
                                )
                            }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        id: parseInt(gameId),
                        maker: game.maker,
                        title: game.title,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: parseInt(game.skill_level),
                        game_type: parseInt(game.game_type)
                    }

                    // Send POST request to your API
                    updateGame(updatedGame)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}

