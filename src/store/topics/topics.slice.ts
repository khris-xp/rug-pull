import { TopicsType } from '@/types/topics.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TopicsAppState {
  topicsList: TopicsType[];
  topics: TopicsType | null;
}

const initialState: TopicsAppState = {
  topicsList: [],
  topics: null,
};

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopicsList: (state, action: PayloadAction<TopicsType[]>) => {
      state.topicsList = action.payload;
    },
    setTopics: (state, action: PayloadAction<TopicsType>) => {
      state.topics = action.payload;
    },
    deleteTopics: (state) => {
      state.topics = null;
    },
  },
});
