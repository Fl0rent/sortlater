import sqlite3
import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, jsonify, abort

app = Flask(__name__)
app.config['SECRET_KEY'] = 'UNE_CLE_SECRETE_TRES_LONGUE_A_CHANGER'
app.config['API_TOKEN'] = 'ton_token_super_secret_pour_freshrss'  # À changer plus tard

DB_PATH = 'sortlater.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            title TEXT,
            archived BOOLEAN NOT NULL DEFAULT 0,
            createdAt TEXT,
            category TEXT,
            tags TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialisation de la BDD au démarrage
init_db()

@app.route('/')
def index():
    conn = get_db_connection()
    # On récupère tous les liens non archivés
    links = conn.execute('SELECT * FROM links WHERE archived = 0 ORDER BY id DESC').fetchall()
    conn.close()
    return render_template('index.html', links=links)

@app.route('/add', methods=['POST'])
def add_link():
    url = request.form.get('url')
    title = request.form.get('title', '')
    
    if url:
        if not title:
            # Petite astuce pour extraire le nom de domaine si pas de titre
            try:
                from urllib.parse import urlparse
                title = urlparse(url).netloc.replace('www.', '')
            except:
                title = url
                
        now = datetime.now().isoformat()
        conn = get_db_connection()
        conn.execute('INSERT INTO links (url, title, createdAt) VALUES (?, ?, ?)', (url, title, now))
        conn.commit()
        conn.close()
        
    return redirect(url_for('index'))

@app.route('/read/<int:id>')
def read_link(id):
    """Marque un lien comme lu (archivé)."""
    conn = get_db_connection()
    conn.execute('UPDATE links SET archived = 1 WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/delete/<int:id>')
def delete_link(id):
    """Supprime définitivement un lien."""
    conn = get_db_connection()
    conn.execute('DELETE FROM links WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

# =======================================================
# L'API MAGIQUE POUR FRESHRSS ET LE BOOKMARKLET
# =======================================================
@app.route('/api/add')
def api_add():
    token = request.args.get('token')
    url = request.args.get('url')
    title = request.args.get('title', '')
    
    # Sécurité : On vérifie que le token correspond
    if token != app.config['API_TOKEN']:
        abort(401) # Accès refusé
        
    if not url:
        return jsonify({"status": "error", "message": "L'URL est obligatoire"}), 400
        
    now = datetime.now().isoformat()
    conn = get_db_connection()
    conn.execute('INSERT INTO links (url, title, createdAt) VALUES (?, ?, ?)', (url, title, now))
    conn.commit()
    conn.close()
    
    return jsonify({"status": "success", "message": f"'{title}' ajouté à SortLater !"})

if __name__ == '__main__':
    # Lance le petit serveur pour le développement sur le port 5001 (pour éviter le conflit AirPlay sur Mac)
    app.run(debug=True, host='0.0.0.0', port=5001)
