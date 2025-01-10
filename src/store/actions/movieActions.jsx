import axios from '../../utils/axios';
import { loadMovie } from '../reducers/movieSlice';

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios(`/movie/${id}`);
    const externalIds = await axios(`/movie/${id}/external_ids`);
    const recommendations = await axios(`/movie/${id}/recommendations`);
    const similar = await axios(`/movie/${id}/similar`);
    const videos = await axios(`/movie/${id}/videos`);
    const watchProviders = await axios(`/movie/${id}/watch/providers`);
    const translations = await axios(`/movie/${id}/translations`);
    
    const movieData = {
      details: details.data,
      externalIds: externalIds.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t=>t.english_name),
      videos: videos.data.results.filter((v) => v.type === 'Trailer'),
      watchProviders: watchProviders.data.results.IN,
    };

    dispatch(loadMovie(movieData));
  } catch (error) {
    console.error(error);
  }
};
