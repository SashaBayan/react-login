import registeredUsers from './registeredUsers';

export default function authenticate(username, password) {
  // traverse object to see if there is a username match
  if (registeredUsers[username]) {
    // check if password for that user matched input password
    return registeredUsers[username].password === password;
  }
}
