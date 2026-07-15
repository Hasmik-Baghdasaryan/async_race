import { API_BASE_URL } from '@/constants/constants';

const HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
} as const;

export class HttpError extends Error {
  status: number;
  userMessage: string;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.userMessage = HttpError.toUserMessage(status);
  }

  private static toUserMessage(status: number): string {
    if (status >= HTTP_STATUS.INTERNAL_SERVER_ERROR)
      return 'Server error. Please try again.';
    return 'Failed. Please try again.';
  }
}

interface FetchOptionsBase {
  endpoint: string;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

interface FetchOptionsWithoutBody extends FetchOptionsBase {
  method?: 'GET' | 'DELETE' | 'PATCH';
  body?: never;
}

interface FetchOptionsWithBody extends FetchOptionsBase {
  method: 'POST' | 'PUT' | 'PATCH';
  body: unknown;
}

type FetchOptions = FetchOptionsWithoutBody | FetchOptionsWithBody;

async function makeRequest<T>(
  options: FetchOptions,
): Promise<{ data: T; headers: Headers }> {
  const { endpoint, method = 'GET', headers = {}, signal } = options;
  const body = 'body' in options ? options.body : undefined;

  const requestOptions: RequestInit = { method, signal };

  if (body !== undefined) {
    requestOptions.headers = { 'Content-Type': 'application/json', ...headers };
    requestOptions.body = JSON.stringify(body);
  } else {
    requestOptions.headers = headers;
  }

  const response = await fetch(
    `${API_BASE_URL}/${endpoint.replace(/^\//, '')}`,
    requestOptions,
  );

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
    ? ((await response.json()) as T)
    : ((await response.text()) as T);

  if (!response.ok) {
    throw new HttpError(
      `HTTP ${response.status}: ${endpoint}`,
      response.status,
    );
  }

  return { data, headers: response.headers };
}

export async function fetchData<T>(options: FetchOptions): Promise<T> {
  const { data } = await makeRequest<T>(options);
  return data;
}

export async function fetchWithHeaders<T>(
  options: FetchOptions,
): Promise<{ data: T; headers: Headers }> {
  return makeRequest<T>(options);
}
