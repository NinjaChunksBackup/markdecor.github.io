from flask import Flask, request, render_template, redirect, url_for
import json
app = Flask(__name__)
# Load page mappings from a configuration file

with open('pages.json', 'r') as f:

    page_map = json.load(f)
@app.route('/')

def index():
    return render_template('index.html')
@app.route('/<page>')

def load_page(page):
    if page in page_map:
        return render_template(page_map[page])
    else:
        return redirect(url_for('index'))
app = app