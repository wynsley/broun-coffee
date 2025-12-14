const apiFetch = async (route, method, body) => {
  try {
    const url = `http://localhost:3000${route}`;
    
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // 1. LEER COMO TEXTO PRIMERO (Para ver qué responde realmente)
    const text = await response.text();

    // 2. Si la respuesta falló (404, 500, etc), avisamos y retornamos null
    if (!response.ok) {
      console.error(`Error API (${response.status}):`, text); 
      return null;
    }

    // 3. Si es exitosa, intentar convertir a JSON con seguridad
    try {
      return text ? JSON.parse(text) : {}; 
    } catch (e) {
      console.warn("El servidor respondió OK pero el contenido no es JSON:", text, e);
      return null;
    }

  } catch (error) {
    console.error("Error de conexión (Backend apagado o CORS):", error);
    return null;
  }
}

export { apiFetch };