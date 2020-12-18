export enum AllowedTypes {
  ANALYZE_DATA,
  MAGNET_FOUND,
  RETRIEVE_DATA,
  DATA_RETRIEVED,
  GET_DATA,
}

interface AnalyzeDataRequest {
  type: AllowedTypes.ANALYZE_DATA;
  payload: string;
}

interface DataFoundResponse {
  type: AllowedTypes.MAGNET_FOUND;
  payload: string | string[];
}

interface RetrieveDataRequest {
  type: AllowedTypes.RETRIEVE_DATA;
  payload: string | string[];
}

interface DataRetrievedResponse {
  type: AllowedTypes.DATA_RETRIEVED;
  payload: string | string[];
}

interface GetDataRequest {
  type: AllowedTypes.GET_DATA;
  payload: string | string[];
}

export type ProcessType =
  | AnalyzeDataRequest
  | DataFoundResponse
  | RetrieveDataRequest
  | DataRetrievedResponse
  | GetDataRequest;
