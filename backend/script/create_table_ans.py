import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.DB_config import get_connection

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS resume_topics (
            id               SERIAL PRIMARY KEY,
            candidate_id     INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
            topic            TEXT,
            subtopic         TEXT,
            difficulty       TEXT,
            created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS previous_questions (
            id               SERIAL PRIMARY KEY,
            candidate_id     INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
            session_id       TEXT,
            question         TEXT,
            topic            TEXT,
            question_type    TEXT,
            asked_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS answers (
            id               SERIAL PRIMARY KEY,
            candidate_id     INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
            question_id      INTEGER REFERENCES previous_questions(id) ON DELETE CASCADE,
            session_id       TEXT,
            answer_text      TEXT,
            score            FLOAT,
            feedback         TEXT,
            answered_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    print("Tables created: resume_topics, previous_questions, answers")

    cursor.close()
    conn.close()

def create_scores_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS candidate_scores (
            id               SERIAL PRIMARY KEY,
            candidate_id     INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
            session_id       TEXT,
            question_id      INTEGER REFERENCES previous_questions(id) ON DELETE CASCADE,
            score            FLOAT,
            max_score        FLOAT DEFAULT 10.0,
            percentage       FLOAT GENERATED ALWAYS AS (score / max_score * 100) STORED,
            scored_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    print("Table created: candidate_scores")

    cursor.close()
    conn.close()