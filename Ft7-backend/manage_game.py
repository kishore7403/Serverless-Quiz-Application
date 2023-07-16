from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore
import json

firebase_admin.initialize_app()
db = firestore.client()

def manage_game(request):
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

    data = request.get_json()
    game_id = data.get('gameId')

    if game_id is None:
        return jsonify({'error': 'Invalid game ID'})

    try:
        game_ref = db.collection('games').document('g'+str(game_id))
        game_doc = game_ref.get()

        if game_doc.exists:
            game_data = game_doc.to_dict()
        else:
            return jsonify({'error': 'Game not found'}),404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch game details', 'message': str(e)}),500

    return (json.dumps(game_data), 200, headers)

# Function dependencies, for example:
# package>=version
# Flask==2.0.2
# requests==2.26.0
# google-cloud-firestore==2.1.0
# Flask-Cors==3.0.10
# firebase-admin==5.0.1

  
    