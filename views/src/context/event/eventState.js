import React, { useReducer } from 'react';
import axios from 'axios';
import EventContext from './eventContext';
import EventReducer from './eventReducer';
import url from '../../server';
import {
  GET_UPCOMING_EVENTS,
  GET_COMPLETED_EVENTS,
  FIND_INDIV_EVENT,
  SET_SELECTED_EVENT,
} from '../types';

const EventState = (props) => {
  const initialState = {
    upcomingEvents: null,
    completedEvents: null,
    indivEvent: null,
    selectedEvent: null,
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  // GET UPCOMING EVENT

  const getUpcomingEvent = async () => {
    const events = await axios.get(url + 'event/upcomingEvents');
    dispatch({ payload: events.data.events, type: GET_UPCOMING_EVENTS });
  };

  // GET COMPLETED EVENT

  const getCompletedEvent = async () => {
    const events = await axios.get(url + 'event/completedEvents');
    dispatch({ payload: events.data.events, type: GET_COMPLETED_EVENTS });
  };

  const setIndividualEvent = (eventId, isUpcomming) => {
    let event;
    if (isUpcomming) {
      event = state.upcomingEvents.filter((event) => event._id === eventId);
    } else {
      event = state.completedEvents.filter((event) => event._id === eventId);
    }
    dispatch({ payload: event[0], type: FIND_INDIV_EVENT });
  };

  const setSelectedEvent = (eventId) => {
    dispatch({ payload: eventId, type: SET_SELECTED_EVENT });
  };

  return (
    <EventContext.Provider
      value={{
        upcomingEvents: state.upcomingEvents,
        completedEvents: state.completedEvents,
        indivEvent: state.indivEvent,
        selectedEvent: state.selectedEvent,
        getUpcomingEvent,
        getCompletedEvent,
        setIndividualEvent,
        setSelectedEvent,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
