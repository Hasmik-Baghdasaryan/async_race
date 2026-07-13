import { API_BASE_URL } from '@/constants/constants';

interface FetchOptionsBase {
  endpoint: string;
  headers?: Record<string, string>;
  body?: unknown;
}

interface FetchOptionsWithoutBody extends FetchOptionsBase {
  method?: 'GET' | 'DELETE';
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
  const { endpoint, method = 'GET', body, headers = {} } = options;

  const requestOptions: RequestInit = { method };

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
    throw new Error(`HTTP ${response.status}: ${endpoint}`);
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
