from flask import Flask, jsonify, request
from flask_cors import CORS
from model.todo import Todo
from datetime import datetime
from config import bigquery_functions
from utils import uuid_generator
from google.cloud import bigquery

# Initialize the Flask backend and enable CORS
application = Flask(__name__)
CORS(application)

# Initialize the client/table from BigQuery
client = bigquery.Client()
table = client.get_table('todo-list-392602.todo_list.all_todos')


@application.route("/api/todos", methods=['POST'])
def add_todo():
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    id = uuid_generator.generate_uuid()

    username = request.json.get('username')
    task = request.json.get('task')
    new_todo = Todo(username=username, id=id, task=task, completed=False, created=current_time, updated=current_time, deleted=False)
    bigquery_functions.insert_new_todo(new_todo, client, table)

    return jsonify(new_todo.__dict__), 201


@application.route("/api/todos", methods=['DELETE'])
def delete_todo():
    data = request.json['todo']

    username = data.get('username')
    id = data.get('id')
    task = data.get('task')
    completed = data.get('completed')
    created = data.get('created')
    updated = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    deleted_todo = Todo(username=username, id=id, task=task, completed=completed, created=created, updated=updated, deleted=True)

    bigquery_functions.insert_new_todo(deleted_todo, client, table)
    return jsonify(f"Removed task ID: {deleted_todo}")


@application.route("/api/todos/complete", methods=['POST'])
def complete_todo():
    data = request.json['todo']

    username = data.get('username')
    id = data.get('id')
    task = data.get('task')
    created = data.get('created')
    updated = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    deleted = data.get('deleted')

    completed_todo = Todo(username=username, id=id, task=task, completed=True, created=created, updated=updated, deleted=deleted)

    bigquery_functions.insert_new_todo(completed_todo, client, table)
    return jsonify(f"Completed task ID: {completed_todo}")


if __name__ == '__main__':
    application.run()
    bigquery_functions.reset_table()
