export interface Event {
  queryStringParameters: {
    creatorId?: string;
  };
  pathParameters?: Record<string, unknown>; // objeto com chave do tipo string e valor desconhecido
  body?: string;
}
