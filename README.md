```
# after git clone
python -m venv .venv
```

```
# after activate the virtual environment in the root directory
# .venv\Scripts\activate
pip install -r requirements.txt
```

```
# install nessesary package for frontend
cd easyconnect-aid
easyconnect-aid>npm i

easyconnect-aid>npm i axios
```

Next you need to generate a django SECRETE KEY
in this website
```
https://djecrety.ir/
```
and copy the key generated to 
SECRET_KEY in backend/.env file.


Create a .env file in backend directory as this format
```
#backend/.env

OPENAI_API_KEY=

SECRET_KEY=

DEBUG=True
```

All the set up is done,
Now you can activate the backend and the frontend

```
# activate backend
cd backend

backend>daphne backend.asgi:application
```

```
# activate frontend
cd easyconnect-aid

easyconnect-aid>npm run dev
```