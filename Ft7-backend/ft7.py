from flask import Flask, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json


cred = credentials.Certificate("sdp-19-firebase-adminsdk-e51x6-10b557a74f.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


app = Flask(__name__)

CORS(app)
# Allow specific HTTP methods (e.g., GET, POST, PUT) 
CORS(app, methods=['GET', 'POST', 'PUT']) #[2]
# Allow specific headers in the request
CORS(app, headers=['Content-Type']) # [2]
# Allow cookies to be included in cross-origin requests
CORS(app, supports_credentials=True) 

questions = []

@app.route('/addquestion', methods=['POST'])
def add_question():
    question_data = request.json

    # Extract the required fields from the question data
    question_number = question_data.get('questionNumber')
    question_text = question_data.get('questionText')
    options = question_data.get('options')
    correct_answer_index = question_data.get('correctAnswerIndex')
    category = question_data.get('category')
    difficulty_level = question_data.get('difficultyLevel')

    doc_ref = db.collection('questions').document(str(question_number))
    doc_ref.set({
        'questionNumber': question_number,
        'questionText': question_text,
        'options': options,
        'correctAnswerIndex': correct_answer_index,
        'category': category,
        'difficultyLevel': difficulty_level
    })


    
    # # Add the question to the questions list
    # questions.append(question)

    # Return a success response
    return jsonify({'message': 'Question added successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
