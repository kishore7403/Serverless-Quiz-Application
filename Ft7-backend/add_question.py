from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore
import json

firebase_admin.initialize_app()
db = firestore.client()

def add_question(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'POST',  
            'Access-Control-Allow-Headers': 'Content-Type', 
            'Access-Control-Max-Age': '3600',
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
    }
    
    question_data = request.json
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
    return (json.dumps({'status': 'success'}), 200, headers)

# Function dependencies, for example:
# package>=version
# Flask==2.0.2
# requests==2.26.0
# google-cloud-firestore==2.1.0
# Flask-Cors==3.0.10
# firebase-admin==5.0.1