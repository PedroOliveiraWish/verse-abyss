export async function getUserById(
    url: string
): Promise<Response> {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer,${token}`
        }
    });

    return response;
}

export async function getAllTextsByUserId (
    page: number,
): Promise<Response> {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3001/api/texto/get-by-user?page=${page}&limit=10`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer,${token}`
        }
    })

    return response;
}

export async function deleteUser(): Promise<Response> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3001/auth/delete`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer,${token}`
        }
    });

    return response;
}