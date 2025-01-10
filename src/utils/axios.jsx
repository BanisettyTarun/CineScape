import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWYzNTFjODM1N2QyNzU2OGJiODljMGY2ZmFmZWZlZSIsIm5iZiI6MTczNTgzMzE4Ny44MjIsInN1YiI6IjY3NzZiNjYzZGQxNzljNWIzNTkyOTZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5QRflW73PIq3R6ThiEk27oQ_3L7Nivgi11LlaG79RsY'
      }
})

export default instance;