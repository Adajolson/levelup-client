import { useState, useEffect } from "react"
import { useNavigate,useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"
import { getEventById, updateEvent } from "../../managers/EventManager"

export const UpdateEvent = () => {
    const [event, setEvent] = useState({
        description: "",
        date: "",
        time: "",
        organizer: 1,
        game: "",
    })
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    const navigate = useNavigate()


    useEffect(
        () => {
            getEventById(eventId).then((res) => setEvent(res))
        }, [])

    useEffect(
        () => {
            getGames().then((res) => setGames(res))
        }, []
    )
    
    const changeEventState = (domEvent) => {
        const copy = {...event}
        copy[domEvent.target.name] = domEvent.target.value
        setEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" value={event.game}
                    onChange={changeEventState}>
                        <option>Choose a Game:</option>
                            {
                                games.map(
                                    game => {
                                        return <option value={game.id}>{game.title}</option>
                                    }
                                )
                            }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedEvent = {
                        id: eventId,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        organizer: event.organizer,
                        game: event.game
                    }

                    // Send POST request to your API
                    updateEvent(updatedEvent)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}