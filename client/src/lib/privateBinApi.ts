const BASE_URL = `http://localhost:5000/api`

async function create({text, password}:{text: string,  password : string}) {
    const url = `${BASE_URL}/create-paste-bin`
    return performApiCall(url, "POST", {text, password})
}

async function performApiCall(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Object,
) {
    let response: Response;

    if (method === 'GET') {
        response = await fetch(url, { method });
    } else {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
  
        response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });
    }
    if (!response.ok) {
        let message = response.statusText;
        try {
            message = await response.text();
        } catch (error) {
            console.error(error);
        } finally {
            throw new Error(message);
        }
    }
    return response.json();
}

const privateBinApi = { create };

export { privateBinApi };
