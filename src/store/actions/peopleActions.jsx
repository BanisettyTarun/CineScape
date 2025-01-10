import axios from '../../utils/axios';
import { loadPeople } from '../reducers/peopleSlice';

export const asyncLoadPeople = (id) => async (dispatch, getState) => {
  try {
    const details = await axios(`/person/${id}`);
    const externalIds = await axios(`/person/${id}/external_ids`);
    const movieCredits = await axios(`/person/${id}/movie_credits`);
    const tvCredits = await axios(`/person/${id}/tv_credits`);
    const combinedCredits = await axios(`/person/${id}/combined_credits`);
    const peopleData = {
      details: details.data,
      externalIds: externalIds.data,
      movieCredits : movieCredits.data,
      tvCredits : tvCredits.data,
      combinedCredits : combinedCredits.data,
    };
    dispatch(loadPeople(peopleData));
  } catch (error) {
    console.error(error);
  }
};
