from dotenv import load_dotenv
import psycopg2
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.DB_config import get_connection , get_engine 

def resume_content(candidate_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, email, phone, location, personal_desc FROM candidates WHERE id = %s", (candidate_id,))
    candidate = cursor.fetchone()

    cursor.execute("SELECT * FROM work_experience WHERE candidate_id = %s", (candidate_id,))
    work_exp = cursor.fetchall()

    cursor.execute("SELECT * FROM skills WHERE candidate_id = %s", (candidate_id,))
    skills = cursor.fetchall()

    cursor.execute("SELECT * FROM education WHERE candidate_id = %s", (candidate_id,))
    education = cursor.fetchall()

    cursor.execute("SELECT * FROM projects WHERE candidate_id = %s", (candidate_id,))
    projects = cursor.fetchall()

    cursor.close()
    conn.close()

    return {
    "candidate":       candidate,
    "work_experience": work_exp,
    "skills":          skills,
    "education":       education,
    "projects":        projects
}


def get_question_id(candidate_id, question):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id FROM previous_questions
        WHERE candidate_id = %s AND question = %s
        ORDER BY asked_at DESC
        LIMIT 1
    """, (candidate_id, question))

    row = cursor.fetchone()
    cursor.close()
    conn.close()

    return row[0] if row else None