import sqlite3
import json
from pathlib import Path
import datetime

DB_PATH = Path("database.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS scans (
                id TEXT PRIMARY KEY,
                product_name TEXT,
                status TEXT,
                submitted_on TEXT,
                manufacturer TEXT,
                ocr_data TEXT,
                compliance_report TEXT,
                images TEXT
            )
        """)
        conn.commit()

def save_scan(scan_id, product_name, status, manufacturer, ocr_data, compliance_report, images):
    submitted_on = datetime.datetime.now().strftime("%d/%m/%Y")
    with get_db() as conn:
        conn.execute("""
            INSERT OR REPLACE INTO scans (id, product_name, status, submitted_on, manufacturer, ocr_data, compliance_report, images)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            scan_id,
            product_name,
            status,
            submitted_on,
            manufacturer,
            json.dumps(ocr_data),
            json.dumps(compliance_report),
            json.dumps(images)
        ))
        conn.commit()
    return scan_id

def get_scan(scan_id):
    with get_db() as conn:
        cur = conn.execute("SELECT * FROM scans WHERE id = ?", (scan_id,))
        row = cur.fetchone()
        if not row:
            return None
        return dict(row)

def get_all_scans():
    with get_db() as conn:
        cur = conn.execute("SELECT * FROM scans ORDER BY rowid DESC")
        return [dict(row) for row in cur.fetchall()]

def update_scan_status(scan_id, status):
    with get_db() as conn:
        conn.execute("UPDATE scans SET status = ? WHERE id = ?", (status, scan_id))
        conn.commit()

# Initialize on import
init_db()
