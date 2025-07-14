export async function getAllTags(): Promise<Response> {

    const response = await fetch(`http://localhost:3001/api/tag/get-all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response;
}