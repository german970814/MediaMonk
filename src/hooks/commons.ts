import { useCallback, useEffect, useMemo, useReducer } from "react";

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Fetch<Q, R = any> = (
  params: {
    [key in keyof Q]?: Q[key];
  },
  replace?: boolean
) => R;

export const useState = <T>(initialState = {} as T) => {
  const reducer = useCallback(
    (state: T, payload: { [key in keyof T]?: T[key] }) => ({
      ...state,
      ...payload,
    }),
    []
  );
  return useReducer(reducer, initialState);
};

export const usePagination = <T extends Fetch<Q>, Q = {}, D = any>(
  fetchFunction: T,
  {
    onError,
    onGetData,
    withTimestamp,
    normalizeFunction,
    fetchOnMount = true,
    keepValuesInLocalState = true,
  }: {
    fetchOnMount?: boolean;
    withTimestamp?: boolean;
    onError?: (error: any) => void;
    keepValuesInLocalState?: boolean;
    normalizeFunction: (response: ThenArg<ReturnType<T>>) => D[];
    onGetData?: (data: D[], options: { isReplacement: boolean }) => void;
  }
) => {
  type State = {
    data: D[];
    params?: Q;
    page: number;
    loading: boolean;
    timestamp?: number;
    refreshing: boolean;
    shouldRequest: boolean;
  };

  const initialState: State = {
    page: 1,
    data: [],
    refreshing: false,
    loading: fetchOnMount,
    shouldRequest: fetchOnMount,
    timestamp: withTimestamp ? Date.now() : undefined,
  };

  const [
    { page, shouldRequest, data, loading, params, refreshing, timestamp },
    setState,
  ] = useState(initialState);

  const nextPage = useCallback(
    (params?: Q) => {
      setState({
        params,
        loading: true,
        page: page + 1,
      });
    },
    [page]
  );

  const fetchData = useCallback(
    (page: number, params?: Q) => {
      return fetchFunction(
        { page, timestamp, ...(params ?? ({} as Q)) },
        page === 1
      )
        .then((response: any) => {
          const dataInResponse = normalizeFunction(response);
          setState({
            loading: false,
            refreshing: false,
            shouldRequest: !!dataInResponse.length,
            data: keepValuesInLocalState
              ? page === 1
                ? dataInResponse
                : [...data, ...dataInResponse]
              : [],
          });
          onGetData?.(dataInResponse, { isReplacement: page === 1 });
        })
        .catch((error: any) => {
          onError?.(error);
          setState({ loading: false, refreshing: false });
        });
    },
    [data, page, timestamp]
  );

  const reloadData = useCallback(
    (params?: Q) => {
      if (page === 1) {
        fetchData(page, params);
      }

      setState({
        params,
        page: 1,
        loading: false,
        refreshing: true,
        shouldRequest: true,
        timestamp: withTimestamp ? Date.now() : undefined,
      });
    },
    [page, withTimestamp, fetchData]
  );

  useEffect(() => {
    if (shouldRequest) {
      fetchData(page, params);
    }
  }, [page]);

  return useMemo(
    () => ({
      data,
      loading,
      nextPage,
      fetchData,
      refreshing,
      reloadData,
    }),
    [data, loading, nextPage, fetchData, refreshing, reloadData]
  );
};
