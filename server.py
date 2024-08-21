from flask import Flask, send_from_directory, request
from flask_cors import CORS  
import os
import privatebinapi

app = Flask(__name__, static_folder='client/build')

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/create-paste-bin', methods=['POST'])
def process_data():
    data = request.get_json()  # Get the JSON data sent in the request
    password = data.get('password')
    text = data.get('text')

    send_response = privatebinapi.send("https://privatebin.dev-franceconnect.fr", text=text, password=password, burn_after_reading=False, expiration="1week")

    return {"url": send_response.get("full_url")}


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5000)
