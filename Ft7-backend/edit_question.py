from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore
import json

firebase_admin.initialize_app()
db = firestore.client()

def edit_question(request):
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
    try:
        question_number = request.json.get('questionNumber')
        doc_ref = db.collection('questions').document('q'+str(question_number))
        doc = doc_ref.get()
        if doc.exists:
            question_data = doc.to_dict()
        else:
            return json.dumps({'message': 'Question not found'}), 404
    except Exception as e:
        return json.dumps({'message': str(e)}), 500

    return (json.dumps(question_data), 200, headers)

# Function dependencies, for example:
# package>=version
# Flask==2.0.2
# requests==2.26.0
# google-cloud-firestore==2.1.0
# Flask-Cors==3.0.10
# firebase-admin==5.0.1