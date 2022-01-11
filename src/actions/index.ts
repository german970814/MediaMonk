import api from "../api/app";
import { Dispatch } from "redux";

export type Action = "SET_ALBUMS" | "SET_PHOTOS";

export interface ActionType {
  type: Action;
  albums?: Album[];
  photos?: Photo[];
}

const appActions = (dispatch: Dispatch<ActionType>) => {
  const actions = {
    /**
     * Set the albums in the global state
     *
     * @param albums The array of albums to set
     */
    setAlbums: (albums?: Album[]): ActionType => {
      return dispatch({ albums, type: "SET_ALBUMS" });
    },

    /**
     * Set the photos for an album in the global state
     *
     * @param photos The array of photos to set
     */
    setPhotos: (photos?: Photo[]): ActionType => {
      return dispatch({ photos, type: "SET_PHOTOS" });
    },

    /**
     * Get the available albums in API
     *
     * @returns Promise<Album[]>
     */
    getAlbums(...args: Parameters<typeof api.getAlbums>) {
      return api.getAlbums(...args).then((response) => {
        !!response.length && actions.setAlbums(response);
        return response;
      });
    },

    /**
     * Get the photos given an album
     *
     * @returns Promise<Photo[]>
     */
    getPhotosByAlbum(...args: Parameters<typeof api.getPhotosByAlbum>) {
      return api.getPhotosByAlbum(...args).then((response) => {
        !!response.length && actions.setPhotos(response);
        return response;
      });
    },
  };
  return actions;
};

export default appActions;
