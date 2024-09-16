interface RequestOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    requiresToken?: boolean;
    token?: string;
}

export const fetcher = async ({
    url,
    method = 'GET',
    body,
    requiresToken = false,
    token,
}: RequestOptions) => {
    try {
        // Preparar los headers
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Agregar token de autorización si es necesario
        // if (requiresToken) {
        //     // Intentar obtener el token de las cookies si no se pasa como argumento
        //     const authToken = token || localStorage.getItem('token');
        //     if (authToken) {
        //         headers['Authorization'] = `Bearer ${authToken}`;
        //     } else {
        //         throw new Error('Token de autorización no disponible');
        //     }
        // }

        // Hacer la petición
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la petición');
        }

        // Devolver el resultado en formato JSON
        return await response.json();

    } catch (error: any) {
        throw new Error(error);
    }
};
