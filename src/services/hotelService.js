export const apiUrl = 'https://6950845270e1605a108801b6.mockapi.io/hotels';

export async function getHotels() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erro ao buscar hotéis');
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // retorna array vazio em caso de erro
  }
}


