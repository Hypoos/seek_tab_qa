from flask import Flask, request, jsonify
from langchain_community.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma
import os
import getpass

os.environ['OPENAI_API_KEY'] = getpass.getpass('OpenAI API Key:')


app = Flask(__name__)

embeddings = OpenAIEmbeddings()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
db = Chroma(embedding_function=embeddings)

def store_text_in_chroma(text, tab_id):
    temp_file_path = f'temp_{tab_id}.txt'
    with open(temp_file_path, 'w', encoding='utf-8') as f:
        f.write(text)
    
    raw_documents = TextLoader(temp_file_path).load()
    os.remove(temp_file_path)
    
    documents = text_splitter.split_documents(raw_documents)
    db.add_documents(documents)

@app.route('/store_text', methods=['POST'])
def store_text():
    data = request.get_json()
    tab_id = data['tabId']
    text = data['text']
    
    store_text_in_chroma(text, tab_id)
    
    return jsonify({"status": "success", "message": "Text stored successfully", "tab_id": tab_id}), 200

@app.route('/query_vector_store', methods=['POST'])
def query_vector_store():
    data = request.get_json()
    question = data['question']

    results = db.similarity_search(question)
    response = results[0].page_content if results else "No relevant information found."
    
    return jsonify({"status": "success", "response": response}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)