export const updateConnectionId = `mutation UpdateConnectionID($input: UpdateUserInput!) {
  updateUser(input: $input) {
    email
    connectionId
  }
}
`
