export async function authLogin(
    email: string,
    password: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    return response;
}

export async function authSignup(
    nome: string,
    email: string,
    password: string,
    url: string
): Promise<Response> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, password })
    })

    return response;
}