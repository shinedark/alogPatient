// eslint-disable
// this is an auto generated file. This will be overwritten

export const getLog = `query GetLog($id: ID!) {
  getLog(id: $id) {
    id
    log
    description
    mood
    date
    meds
  }
}
`;
export const listLogs = `query ListLogs($filter: ModelLogFilterInput, $limit: Int, $nextToken: String) {
  listLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      log
      description
      mood
      date
      meds
    }
    nextToken
  }
}
`;
