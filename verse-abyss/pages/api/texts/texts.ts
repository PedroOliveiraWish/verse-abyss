export async function getAllTexts (
    page: number,
    userId: number
): Promise<Response> {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3001/api/texto/get-all/${userId}?page=${page}&limit=10`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer,${token}`
        }
    })

    return response;
}

export async function getAllTextsByTagId (
    page: number,
    tagId: number
): Promise<Response> {

    const response = await fetch(`http://localhost:3001/api/texto/get-by-tag/${tagId}?page=${page}&limit=10`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function createText (
    tagId: number,
    titulo: string,
    conteudo: string
) : Promise<Response> {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3001/api/texto/create-text`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer,${token}`
        },
        body: JSON.stringify({
            tagId,
            titulo,
            conteudo
        })
    })

    return response;
}