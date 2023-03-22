import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import type { Event } from "../../types/listSearches";

const client = new DynamoDBClient({});

/**
 * @command sls invoke local -f ListSearches
 */
export async function main(event: Event) {
  const input = {
    TableName: process.env.tableName,
  };

  try {
    const data = await client.send(new ScanCommand(input));
    const searches = data.Items.map((item) => unmarshall(item));
    return {
      statusCode: 200,
      body: JSON.stringify({
        searches,
        message: "Buscas retornadas com sucesso!",
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
