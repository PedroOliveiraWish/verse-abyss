export async function getFavoritedTextsByUser (
    page: number, 
    userId: number
) : Promise<Response> {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3001/api/favorito/get-by-user/${userId}?page=${page}&limit=10`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer,${token}`
        }
    })

    return response;
}

export async function createFavorite(
    textId: number
) : Promise<Response> {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3001/api/favorito/create-favorite', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer,${token}`
        },
        body: JSON.stringify({textId})
    })

    return response;
}