import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate } from 'react-router-dom'
import { deleteEvent, leaveEvent, joinEvent } from "../../managers/EventManager"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleEventDelete = (eventId) => {
        deleteEvent(eventId)
        .then(() => getEvents().then(data => setEvents(data)))
    }

    const handleEventLeave = (eventId) => {
        leaveEvent(eventId)
        .then(() => getEvents().then(data => setEvents(data)))
    }

    const handleEventJoin = (eventId) => {
        joinEvent(eventId)
        .then(() => getEvents().then(data => setEvents(data)))
    }

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                        <div className="event__organizer">Organized by: {event.organizer}</div>
                        <div className="event__game">Game: {event.game}</div>
                        <div className="event__attendees">Number of attendees: {event.attendees}</div>
                        <button type="button" className="btn btn-1" onClick={() => (handleEventDelete(event.id))}>Delete</button>
                        {
                            event.joined ?
                            // TODO: create the Leave button
                            <button type="button" className="btn btn-3" onClick={() => (handleEventLeave(event.id))}>Leave</button>
                            :
                            // TODO: create the Join button
                            <button type="button" className="btn btn-2" onClick={() => (handleEventJoin(event.id))}>Join</button>

                        }
                    
                    </section>
                })
            }
        </article>
    )
}