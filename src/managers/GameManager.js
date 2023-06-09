export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "Post",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game) 
        })
        .then(res => res.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameById = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
    })
    .then(res => res.json())
}

export const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(game)
    })
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    }
    )
}