authenticate(username, password) => {
  if(username === 'ben' && password === 123) return true;
}

var registeredUsers = {
  ben: {
    password: 123
  },
  jerry: {
    password: 'icecream'
  }
}