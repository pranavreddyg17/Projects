import pytest
from selenium import webdriver
from test_login import login_test
from test_signup import signup_test
from test_post_a_job import post_job_test
from test_apply_a_job import apply_job_test
from test_delete_job import delete_job_test
from test_company_verification import company_verification_test
import random

# URL for the application
url = "http://localhost:8080/ASE-JobBoard/index.php"
randomNum = str(random.randint(1000, 9999))

def test_main_signup():
    driver = webdriver.Chrome()  # Start a new browser session
    try:     
        signup_test(
            driver,
            url,
            user_type="Employee",
            email=f"user{randomNum}@example.com",
            full_name=f"User {randomNum}",
            phone="1234567890",
            password=f"user@{randomNum}"
        )
    finally:
        driver.quit()  # Close the browser after signup test is done

def test_main_login():
    driver = webdriver.Chrome()  # Start a new browser session
    try:
        login_test(
            driver, 
            url, 
            user_type="Employee", 
            email=f"user{randomNum}@example.com", 
            password=f"user@{randomNum}"
        )
    finally:
        driver.quit()  # Close the browser after login test is done

def test_post_job():
    driver = webdriver.Chrome()  # Start a new browser session
    try:
        post_job_test(
            driver,
            url,
            user_type="Company",  # Specify user type as "Company"
            email="jobx@gmail.com",  # Replace with actual company email
            password="jobx123",   # Replace with actual company password
            job_position="Cloud Computing",
            job_location="Arlington TX",
            job_description="Looking for a skilled Cloud Computing Engineer.",
            job_type="Part Time"
        )
    finally:
        driver.quit()

def test_apply_job():
    driver = webdriver.Chrome()  # Start a new browser session
    try:
        apply_job_test(
            driver,
            url,
            user_type="Employee",  # Specify user type as "Employee"
            email=f"user{randomNum}@example.com",  # Replace with actual employee email
            password=f"user@{randomNum}",  # Replace with actual employee password
            job_position="Cloud Computing",  # Replace with desired job position
            job_type="Part Time",  # Replace with desired job location
            name="John Doe",  # Replace with the desired applicant name
            dob="01/01/1990",  # Replace with the desired DOB in mm/dd/yyyy format
            resume_path=r"C:\Users\Owner\OneDrive\Documents\Pakshal_Mahavir_Ranawat_CV.pdf"  # Raw string for resume path
        )
    finally:
        driver.quit()  # Close the browser after the job application test is done

# def test_delete_job():
#     driver = webdriver.Chrome()  # Start a new browser session
#     try:
#         delete_job_test(
#             driver,
#             url,
#             user_type="Company",  # Specify user type as "Company"
#             email="jobx@gmail.com",  # Replace with actual company email
#             password="jobx123",  # Replace with actual company password
#             job_position="SDET",  # Replace with the desired job role to delete
#             job_type="Internship"  # Replace with the desired job type to delete
#         )
#     finally:
#         driver.quit()  # Close the browser after the test is done

# def test_admin_verification():
#     driver = webdriver.Chrome()
#     try:
#         company_verification_test(
#             driver,
#             url,
#             email='admin@gmail.com',
#             password='admin123',
#             company_name='XYZ 2268'
#         )
#     finally:
#         driver.quit() 

if __name__ == "__main__":
    pytest.main(["-v", "--html=report.html", __file__])
