{
    "version": 2,
    "alias": "noteful",
    "name": "noteful",
    "routes": [
      {
        "src": "^/static/(.*)",
        "dest": "/static/$1"
      },
      {
        "src": ".*",
        "dest": "/index.html"
      }
    ]
  }