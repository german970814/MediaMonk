import _ from "lodash";
import { Reducer as _Reducer } from "redux";
import { Action, ActionType } from "@md/actions";

export interface State {
  data: {
    [key: string]: Album & { photos: Photo[] };
  };
}

export const initialState: State = {
  data: {},
};

type Reducer = {
  [key in Action]?: _Reducer<State | undefined, ActionType>;
};

const reducer: Reducer = {
  SET_ALBUMS: (state: State | undefined, { albums }) => {
    return {
      ...state!,
      data: {
        ...state?.data,
        ..._.reduce(
          albums,
          (acc, curr) => {
            acc[curr.id.toString()] = { ...curr, photos: [] };
            return acc;
          },
          {} as State["data"]
        ),
      },
    };
  },
  SET_PHOTOS: (state: State | undefined, { photos }) => {
    const firstPhoto = _.first(photos); // assuming all photos belongs to one album

    if (!firstPhoto) {
      return state!;
    }

    return {
      ...state!,
      data: {
        ...state?.data,
        [firstPhoto.albumId]: {
          ...state!.data[firstPhoto.albumId],
          photos: [...photos!],
        },
      },
    };
  },
};

export default (state: State = initialState, action: ActionType) => {
  return action.type in reducer ? reducer[action.type]?.(state, action) : state;
};
