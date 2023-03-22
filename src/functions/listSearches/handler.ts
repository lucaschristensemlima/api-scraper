import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import type { Event } from "../../types/listSearches";

const client = new DynamoDBClient({});

/**
 * @command sls invoke local -f ListSearches --path src/functions/listSearches/mock.json
 */
export async function main(event: Event) {
  const createdAt = event.queryStringParameters?.createdAt;

  let input;

  if (!createdAt) {
    input = {
      TableName: process.env.tableName,
    };
  } else {
    input = {
      TableName: process.env.tableName,
      FilterExpression: "begins_with(createdAt, :createdAt)",
      // Define the expression attribute value, which are substitutes for the values you want to compare.
      ExpressionAttributeValues: {
        ":createdAt": { S: createdAt },
      },
    };
  }

  try {
    const data = await client.send(new ScanCommand(input));
    const searches = data.Items.map((item) => unmarshall(item));
    return {
      statusCode: 200,
      body: JSON.stringify({
        searches,
        message: "Buscas retornadas com sucesso!",
        count: data.Count,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
