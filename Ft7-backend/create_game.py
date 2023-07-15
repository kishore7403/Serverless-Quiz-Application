from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore
import json

firebase_admin.initialize_app()
db = firestore.client()

def create_game(request):
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
    
    game_data = request.get_json()
    game_name = game_data['gameName']
    game_id = game_data['gameId']
    category = game_data['category']
    difficulty = game_data['difficulty']
    time_frame = game_data['timeFrame']
    question_numbers = game_data['questionNumbers']

    game_ref = db.collection('games').document('g'+ str(game_id))
    game_ref.set({
        'gameId': game_id,
        'gameName': game_name,
        'category': category,
        'difficulty': difficulty,
        'timeFrame': time_frame,
        'questionNumbers': question_numbers
    })
    return (json.dumps({'status': 'Game succesfully added'}), 200, headers)

# Function dependencies, for example:
# package>=version
# Flask==2.0.2
# requests==2.26.0
# google-cloud-firestore==2.1.0
# Flask-Cors==3.0.10
# firebase-admin==5.0.1