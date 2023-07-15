from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore
import json

firebase_admin.initialize_app()
db = firestore.client()

def delete_question(request):
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
        document_id = request.json['questionNumber']
        db.collection('questions').document('q'+str(document_id)).delete()
        return (json.dumps({'Status':"Success"}), 200, headers)
    except Exception as e:
        return json.dumps({'Status': "Failed", 'error': str(e)}), 500

# Function dependencies, for example:
# package>=version
# Flask==2.0.2
# requests==2.26.0
# google-cloud-firestore==2.1.0
# Flask-Cors==3.0.10
# firebase-admin==5.0.1