from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
