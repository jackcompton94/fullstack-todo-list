from google.cloud import bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = '/Users/jackcompton/GCP Token/todo-list-392602-69e9e0d2eccf.json'


def insert_new_todo(new_todo, client, table):
    # Initialize the client/table if not initialized
    if client is None:
        client = bigquery.Client()
    if table is None:
        table = client.get_table('todo-list-392602.todo_list.all_todos')

    row = {
        'username': new_todo.username,
        'id': new_todo.id,
        'task': new_todo.task,
        'completed': new_todo.completed,
        'created': new_todo.created,
        'updated': new_todo.updated,
        'deleted': new_todo.deleted
    }
    errors = client.insert_rows_json(table, [row])

    if errors:
        print(f"There was an error inserting todo into BigQuery: {errors}")
    else:
        print(f"Insert successful!")


def reset_table():
    client = bigquery.Client()

    # Tear down and build all_todos table for testing
    client.query(query='DROP TABLE todo_list.all_todos')
    client.query(query='CREATE TABLE todo_list.all_todos(username STRING,id STRING,task STRING,completed BOOLEAN,created TIMESTAMP,updated TIMESTAMP,deleted BOOLEAN)')
