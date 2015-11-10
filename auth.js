import registeredUsers from './registeredUsers';

export function checkUserExists(username) {
  return registeredUsers.hasOwnProperty(username);
}

export function authenticate(username, password) {
  // traverse object to see if there is a username match
  if (checkUserExists(username)) {
    // check if password for that user matched input password
    return registeredUsers[username].password === password;
  }
}
