import firebase_admin
from firebase_admin import credentials
from flask import Flask, request, jsonify

cred = credentials.Certificate("sdp-19-firebase-adminsdk-e51x6-10b557a74f.json")
firebase_admin.initialize_app(cred)


app = Flask(__name__)

questions = []

@app.route('/api/questions', methods=['POST'])
def add_question():
    question_data = request.json

    # Extract the required fields from the question data
    question_number = question_data.get('questionNumber')
    question_text = question_data.get('questionText')
    options = question_data.get('options')
    correct_answer_index = question_data.get('correctAnswerIndex')
    category = question_data.get('category')
    difficulty_level = question_data.get('difficultyLevel')

    # Create a new question object
    question = {
        'questionNumber': question_number,
        'questionText': question_text,
        'options': options,
        'correctAnswerIndex': correct_answer_index,
        'category': category,
        'difficultyLevel': difficulty_level
    }

    # Add the question to the questions list
    questions.append(question)

    # Return a success response
    return jsonify({'message': 'Question added successfully'})

if __name__ == '__main__':
    app.run()
