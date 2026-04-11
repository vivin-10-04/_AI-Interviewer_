import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.DB_config import get_connection

conn = get_connection()
cursor = conn.cursor()
"""
This creates the tables as per the schema: 
                 List of tables
 Schema |        Name         | Type  |  Owner   
--------+---------------------+-------+----------
 public | achievements        | table | postgres
 public | areas_of_interest   | table | postgres
 public | candidates          | table | postgres
 public | certifications      | table | postgres
 public | education           | table | postgres
 public | job_preferences     | table | postgres
 public | languages           | table | postgres
 public | preferred_job_roles | table | postgres
 public | projects            | table | postgres
 public | skills              | table | postgres
 public | work_experience     | table | postgres
(11 rows)

"""

cursor.execute("""
    CREATE TABLE IF NOT EXISTS candidates (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        phone_number TEXT,
        location TEXT,
        city TEXT,
        pin_code TEXT,
        date_of_birth TEXT,
        gender TEXT,
        personal_desc TEXT,
        english_fluency TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS job_preferences (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        expected_salary FLOAT,
        preferred_shift TEXT,
        job_type TEXT,
        salary_type TEXT,
        employment_type TEXT,
        primary_location TEXT,
        secondary_location TEXT,
        other_locations TEXT[],
        other_preferred_location TEXT[]
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS work_experience (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        company_name TEXT,
        job_title TEXT,
        industry_type TEXT,
        start_date TEXT,
        end_date TEXT,
        currently_working BOOLEAN,
        salary_type TEXT,
        emp_type TEXT,
        notice_period TEXT,
        location TEXT,
        department TEXT,
        current_salary FLOAT,
        experience FLOAT,
        description TEXT
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        college_name TEXT,
        course TEXT,
        qualification TEXT,
        specialization TEXT,
        course_type TEXT,
        start_date TEXT,
        end_date TEXT,
        currently_pursuing BOOLEAN
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        skill_name TEXT,
        skill_type TEXT,
        rating INT
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS certifications (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        certification_name TEXT,
        issued_by TEXT,
        issued_date TEXT,
        expiration_date TEXT,
        certificate TEXT
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        achievement_name TEXT,
        category TEXT,
        description TEXT,
        level TEXT,
        organization TEXT,
        award TEXT,
        date TEXT,
        team_preference TEXT,
        upload_photo TEXT
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        project_name TEXT,
        associated_with TEXT,
        client TEXT,
        role TEXT,
        role_description TEXT,
        project_description TEXT,
        emp_type TEXT,
        start_date TEXT,
        end_date TEXT,
        location TEXT,
        project_site TEXT,
        work_type TEXT,
        project_url TEXT,
        currently_working BOOLEAN
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS areas_of_interest (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        area TEXT
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS preferred_job_roles (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        role TEXT
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS languages (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
        language TEXT
    )
""")

conn.commit()
print("All tables created successfully!")
cursor.close()
conn.close()