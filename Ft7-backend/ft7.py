from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

app = Flask(__name__)

CORS(app)
# Allow specific HTTP methods (e.g., GET, POST, PUT) 
CORS(app, methods=['GET', 'POST', 'PUT']) #[2]
# Allow specific headers in the request
CORS(app, headers=['Content-Type']) # [2]
# Allow cookies to be included in cross-origin requests
CORS(app, supports_credentials=True) 

cred = credentials.Certificate("sdp-19-firebase-adminsdk-e51x6-10b557a74f.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

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

    doc_ref = db.collection('questions').document('q'+str(question_number))
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

    return jsonify({'message': 'Question added successfully'})

@app.route('/creategame', methods=['POST'])
def create_game():
    # Extract the game data from the request JSON
    game_data = request.get_json()
    game_name = game_data['gameName']
    game_id = game_data['gameId']
    category = game_data['category']
    difficulty = game_data['difficulty']
    time_frame = game_data['timeFrame']
    question_numbers = game_data['questionNumbers']

    game_ref = db.collection('games').document(game_name)
    game_ref.set({
        'gameId': game_id,
        'gameName': game_name,
        'category': category,
        'difficulty': difficulty,
        'timeFrame': time_frame,
        'questionNumbers': question_numbers
    })

    return 'Game created successfully', 200

@app.route('/editquestion', methods=['POST'])
def edit_question():
    try:
        question_number = request.json.get('questionNumber')
        doc_ref = db.collection('questions').document('q'+str(question_number))
        doc = doc_ref.get()
        if doc.exists:
            question_data = doc.to_dict()
            return jsonify(question_data), 200
        else:
            return jsonify({'message': 'Question not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/deletequestion', methods=['POST'])
def delete_document():
    try:
        document_id = request.json['questionNumber']
        db.collection('questions').document('q'+str(document_id)).delete()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
