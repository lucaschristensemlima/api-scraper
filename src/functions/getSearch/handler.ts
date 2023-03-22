import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import type { Event } from "../../types/getSearch";

const client = new DynamoDBClient({});

/**
 * @command sls invoke local -f GetSearch --path src/functions/getSearch/mock.json
 */
export async function main(event: Event) {
  const searchId = event.pathParameters.searchId;

  const input = {
    Key: marshall({
      id: searchId,
    }),
    TableName: process.env.tableName,
  };

  try {
    const command = new GetItemCommand(input);

    const result = await client.send(command);

    if (!result.Item) {
      const body = {
        error: `não foi possível encontrar a search de id: ${searchId}`,
      };
      return {
        statusCode: 404,
        body: JSON.stringify(body),
      };
    }

    const search = unmarshall(result.Item);

    return {
      statusCode: 200,
      body: JSON.stringify({
        search,
        message: "Busca retornada com sucesso!",
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
