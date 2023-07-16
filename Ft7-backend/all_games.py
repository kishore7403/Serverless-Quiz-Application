from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore
import json

firebase_admin.initialize_app()
db = firestore.client()

def all_games(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET',  
            'Access-Control-Allow-Headers': 'Content-Type', 
            'Access-Control-Max-Age': '3600',
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
    }
    try:
        collection_ref = db.collection("games")
        docs = collection_ref.get()
        document_ids = [doc.id for doc in docs]
        return (json.dumps(document_ids), 200, headers)

    except Exception as e:
        return jsonify({'error': 'Failed to fetch game details', 'message': str(e)}),500, headers


# Function dependencies, for example:
# package>=version
# Flask==2.0.2
# requests==2.26.0
# google-cloud-firestore==2.1.0
# Flask-Cors==3.0.10
# firebase-admin==5.0.1