import { ApiErrorsMessage } from '../../constants';

export interface HttpRequest {
  body?: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
}

export interface EndpointResponse {
  status: number;
  body: unknown;
  msg: `${ApiErrorsMessage}`;
}

export type RequestValidator<K, T extends HttpRequest = HttpRequest> = (req: T) => Promise<K>;

export type Controller = (req: HttpRequest, res?: unknown) => Promise<EndpointResponse>;
