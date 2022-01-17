# Front end 

## Environment file
Create an .env file under frontend folder and add the following content:

### Using docker for both the frontend and backend

```
WDS_SOCKET_PORT=3000
REACT_APP_API_URL=/api
```

### Using docker for backend and yarn start for frontend
```
WDS_SOCKET_PORT=3000
REACT_APP_API_URL=http://localhost:8080/
```

## Scripts
