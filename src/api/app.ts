import { get } from "./handlers";

export default {
  /**
   * Get the photos given an album
   *
   * @param album The album to query photos
   * @returns Promise<Photo[]>
   */
  getPhotosByAlbum: (album: Album) => {
    return get<Photo[]>(`/albums/${album.id}/photos`, {});
  },

  /**
   * Get the available albums in API
   *
   * @returns Promise<Album[]>
   */
  getAlbums: () => {
    return get<Album[]>(`/albums`, {});
  },
};
