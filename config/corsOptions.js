const allowedList = ['http://localhost:5173/Exclusive-React/', 'http://localhost:3500'];

const corsOptions = {
  origin: (origin, callback) => {
    if(!origin || allowedList.indexOf(origin) !== -1 ) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed By CORS'));
    }
  }
}

module.exports = corsOptions