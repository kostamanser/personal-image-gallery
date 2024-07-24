from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from anywhere for testing
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow only requests from the frontend origin


UPLOAD_FOLDER = './data/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///metadata.db'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), UPLOAD_FOLDER)
db = SQLAlchemy(app)

class ImageMetadata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)

db.create_all()



# @app.route('/api/hello', methods=['GET'])
# def hello():
#     return jsonify(message="Hello from Flask!")

### New file upload backend:

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        description = request.form['description']
        new_image = ImageMetadata(filename=filename, description=description)
        db.session.add(new_image)
        db.session.commit()
        return jsonify({"message": "File uploaded successfully"}), 201

@app.route('/images', methods=['GET'])
def get_images():
    images = ImageMetadata.query.all()
    result = [{"filename": img.filename, "description": img.description} for img in images]
    return jsonify(result), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


### Original file upload backend code:
# Endpoint to handle file uploads
# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return 'No file part', 400
#     file = request.files['file']
#     if file.filename == '':
#         return 'No selected file', 400
#     file.save(os.path.join(UPLOAD_FOLDER, file.filename))
#     return 'File uploaded successfully', 200

# # Endpoint to list all images
# @app.route('/images', methods=['GET'])
# def get_images():
#     files = os.listdir(UPLOAD_FOLDER)
#     return jsonify(files)

# # Endpoint to serve an image
# @app.route('/images/<filename>', methods=['GET'])
# def get_image(filename):
#     return send_from_directory(UPLOAD_FOLDER, filename)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', debug=True)
