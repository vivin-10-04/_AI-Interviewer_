import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.DB_config import get_connection

def insert_resume_topic(candidate_id, topic, subtopic, difficulty):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO resume_topics (candidate_id, topic, subtopic, difficulty)
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (candidate_id, topic, subtopic, difficulty))

    topic_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()

    return topic_id


def insert_question(candidate_id, session_id, question, topic, question_type):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO previous_questions (candidate_id, session_id, question, topic, question_type)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    """, (candidate_id, session_id, question, topic, question_type))

    question_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()

    return question_id


def insert_answer(candidate_id, question_id, session_id, answer_text, score, feedback):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO answers (candidate_id, question_id, session_id, answer_text, score, feedback)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (candidate_id, question_id, session_id, answer_text, score, feedback))

    answer_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()

    return answer_id

def insert_score(candidate_id, session_id, question_id, score, max_score=10.0):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO candidate_scores (candidate_id, session_id, question_id, score, max_score)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    """, (candidate_id, session_id, question_id, score, max_score))

    score_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()

    return score_id