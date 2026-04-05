import "server-only";
import { Pinecone } from "@pinecone-database/pinecone";

let pineconeClient: Pinecone | null | undefined;

export function getPineconeClient() {
  if (pineconeClient !== undefined) {
    return pineconeClient;
  }

  if (!process.env.PINECONE_API_KEY) {
    pineconeClient = null;
    return pineconeClient;
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    sourceTag: "reflectdraw-web",
  });

  return pineconeClient;
}

export function getPineconeIndex() {
  const client = getPineconeClient();
  const indexName = process.env.PINECONE_INDEX_NAME;

  if (!client || !indexName) {
    return null;
  }

  return client.index(indexName, process.env.PINECONE_INDEX_HOST);
}

export function getPineconeReadiness() {
  const hasApiKey = Boolean(process.env.PINECONE_API_KEY);
  const hasIndexName = Boolean(process.env.PINECONE_INDEX_NAME);
  const hasIndexHost = Boolean(process.env.PINECONE_INDEX_HOST);

  return {
    configured: hasApiKey && hasIndexName,
    hasApiKey,
    hasIndexName,
    hasIndexHost,
    namespace: process.env.PINECONE_NAMESPACE ?? "reflectdraw-prompts",
  };
}
