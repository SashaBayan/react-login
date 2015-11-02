function authenticate(username, password) {
  return username === 'ben' && password === 123;
}

var registeredUsers = {
  ben: {
    password: 123
  },
  jerry: {
    password: 'icecream'
  }
}
