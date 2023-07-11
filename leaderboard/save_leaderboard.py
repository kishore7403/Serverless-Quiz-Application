import json
import boto3
import uuid
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime, timedelta

TABLE_NAME = 'leaderboard'

# Create a DynamoDB resource
dynamodb = boto3.resource('dynamodb')
# Retrieve the DynamoDB table
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    data = json.loads(event['body'])

    # Save leaderboard data to DynamoDB
    table.put_item(
        Item={
            'id': uuid.uuid4().hex,
            'entity_type': data['type'],
            'entity_name': data['name'],
            'score': data['score'],
            'right_answers': data['right_answers'],
            'wrong_answers': data['wrong_answers'],
            'category': data['category'],
            'create_time': int(datetime.timestamp(datetime.now()))
        }
    )

    response = {
        'statusCode': 200,
        'body': json.dumps({'message': 'Leaderboard data saved successfully'})
    }

    return response
