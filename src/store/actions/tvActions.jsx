import axios from '../../utils/axios';
import { loadTV } from '../reducers/tvSlice';

export const asyncLoadTV = (id) => async (dispatch, getState) => {
  try {
    const details = await axios(`/tv/${id}`);
    const externalIds = await axios(`/tv/${id}/external_ids`);
    const recommendations = await axios(`/tv/${id}/recommendations`);
    const similar = await axios(`/tv/${id}/similar`);
    const videos = await axios(`/tv/${id}/videos`);
    const watchProviders = await axios(`/tv/${id}/watch/providers`);
    const translations = await axios(`/tv/${id}/translations`);
    
    const tvData = {
      details: details.data,
      externalIds: externalIds.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map(t=>t.english_name),
      videos: videos.data.results.filter((v) => v.type === 'Trailer'),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(loadTV(tvData));
  } catch (error) {
    console.error(error);
  }
};
