Create venv
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Make migrations
```
python backend/manage.py makemigrations
python backend/manage.py migrate
```
Run server
```
python backend/manage.py runserver
```
Run frontend
```
cd frontend
npm install
npm start
```
