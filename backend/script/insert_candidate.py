import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.DB_config import get_connection

def insert_candidate(data):
    conn = get_connection()
    cursor = conn.cursor()

    contact = data["contactInformation"]
    cursor.execute("""
        INSERT INTO candidates (name, email, phone, location, city, gender, personal_desc, english_fluency)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (email) DO NOTHING
        RETURNING id
    """, (
        contact["name"], contact["email"], contact["phoneNumber"],
        contact["location"], contact["city"], contact["gender"],
        data["personalDesc"], data["englishFluency"]
    ))

    row = cursor.fetchone()
    if row is None:
        print("Candidate already exists, skipping.")
        conn.close()
        return
    candidate_id = row[0]

    jp = data["jobPreference"]
    pjl = data["preferedJobLocation"]
    cursor.execute("""
        INSERT INTO job_preferences (candidate_id, expected_salary, preferred_shift, job_type, salary_type, employment_type, primary_location, secondary_location, other_locations)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        candidate_id, jp["expectedSalary"], jp["preferedShift"],
        jp["jobType"], jp["salaryType"], jp["employmentType"],
        pjl["primaryLocation"], pjl["secondaryLocation"],
        data["otherLocations"]
    ))

    for exp in data["workExperience"]:
        cursor.execute("""
            INSERT INTO work_experience (candidate_id, company_name, job_title, industry_type, start_date, end_date, currently_working, emp_type, location, department, experience, description)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            candidate_id, exp["companyName"], exp["jobTitle"], exp["industryType"],
            exp["startDate"], exp["endDate"], exp["currentlyWorking"],
            exp["empType"], exp["location"], exp["department"],
            exp["experience"], exp["description"]
        ))

    for edu in data["educationalDetail"]:
        cursor.execute("""
            INSERT INTO education (candidate_id, college_name, course, qualification, specialization, course_type, start_date, end_date, currently_pursuing)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            candidate_id, edu["collegeName"], edu["course"], edu["qualification"],
            edu["specialization"], edu["courseType"], edu["startDate"],
            edu["endDate"], edu["currentlyPursuing"]
        ))

    for skill in data["skills"]:
        cursor.execute("""
            INSERT INTO skills (candidate_id, skill_name, skill_type, rating)
            VALUES (%s, %s, %s, %s)
        """, (candidate_id, skill["skillName"], skill["skillType"], skill["rating"]))

    for cert in data["certificateInfo"]:
        cursor.execute("""
            INSERT INTO certifications (candidate_id, certification_name, issued_by, issued_date, expiration_date, certificate)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (candidate_id, cert["certificationName"], cert["issuedBy"], cert["issuedDate"], cert["expirationDate"], cert["certificate"]))

    for ach in data["achievement"]:
        cursor.execute("""
            INSERT INTO achievements (candidate_id, achievement_name, category, description, level, organization, award)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            candidate_id, ach["achievementName"], ach["achievementCategory"],
            ach["achievementDescription"], ach["achievementLevel"],
            ach["achievementOrganization"], ach["award"]
        ))

    for proj in data["project"]:
        cursor.execute("""
            INSERT INTO projects (candidate_id, project_name, associated_with, role, role_description, project_description, emp_type, start_date, end_date, project_site, work_type, project_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            candidate_id, proj["projectName"], proj["associated_with"],
            proj["role"], proj["roleDescription"], proj["projectDescription"],
            proj["empType"], proj["startDate"], proj["endDate"],
            proj["projectSite"], proj["workType"], proj["projectUrl"]
        ))

    for area in data["areaOfInterest"]:
        cursor.execute("INSERT INTO areas_of_interest (candidate_id, area) VALUES (%s, %s)", (candidate_id, area))

    for role in data["preferedJobRole"]:
        cursor.execute("INSERT INTO preferred_job_roles (candidate_id, role) VALUES (%s, %s)", (candidate_id, role))

    if data["languages"]:
        for lang in data["languages"]:
            cursor.execute("INSERT INTO languages (candidate_id, language) VALUES (%s, %s)", (candidate_id, lang))

    conn.commit()
    print(f"Candidate '{contact['name']}' inserted successfully with id {candidate_id}!")
    cursor.close()
    conn.close()