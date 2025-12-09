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
