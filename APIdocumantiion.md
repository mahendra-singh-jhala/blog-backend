API DOCUMENTION using POSTMAN click to link

URL = https://documenter.getpostman.com/view/38758930/2sB2qXj3Aw


<!-- Check upper Link -->
Example : -

<!-- Request -->
curl --location 'http://localhost:5000/api/auth/signup' \
--data-raw '{
    "name": "Ram",
    "email": "ram@gmail.com",
    "password": "ram1234"
}'

<!-- Response -->
{
  "message": "User registered successfully"
}