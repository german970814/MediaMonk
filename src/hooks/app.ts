import _ from "lodash";
import { useMemo } from "react";
import appActions from "@md/actions";
import { createSelector } from "reselect";
import { usePagination } from "./commons";
import { ApplicationState } from "@md/reducers";
import { useDispatch, useSelector } from "react-redux";

export const useAppActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => appActions(dispatch), [dispatch]);
};

export const useGetAlbums = (fetch?: boolean) => {
  const actions = useAppActions();
  return usePagination(() => actions.getAlbums(), {
    fetchOnMount: fetch,
    keepValuesInLocalState: false,
    normalizeFunction: (data) => data,
  });
};

export const useGetPhotos = (album: Album, fetch?: boolean) => {
  const actions = useAppActions();
  return usePagination(() => actions.getPhotosByAlbum(album), {
    fetchOnMount: fetch,
    keepValuesInLocalState: false,
    normalizeFunction: (data) => data,
  });
};

export const useAlbums = () => {
  return useSelector(
    createSelector(
      (state: ApplicationState) => state.app?.data,
      (data) => _.values(data)
    )
  );
};

export const useAlbumsCount = () => {
  return useSelector(
    createSelector(
      (state: ApplicationState) => state.app?.data,
      (data) => _.values(data).length
    )
  );
};

export const usePhotosFromAlbum = (album: Album) => {
  return useSelector(
    (state: ApplicationState) => state.app?.data[album.id].photos
  );
};
