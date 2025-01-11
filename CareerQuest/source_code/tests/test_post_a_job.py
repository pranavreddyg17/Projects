from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from test_login import login_test

def post_job_test(driver, url, user_type, email, password, job_position, job_location, job_description,job_type):
    # Log in as a company
    login_test(driver, url, user_type, email, password)

    # Wait for the page to load and ensure login was successful
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[text()='Home']"))
    )

    # Click on "Post a Job"
    post_job_button = driver.find_element(By.XPATH, "//a[contains(text(),'Post a Job')]")
    post_job_button.click()

    # Fill out the job posting form
    job_position_field = driver.find_element(By.NAME, "jobposition")
    job_location_field = driver.find_element(By.NAME, "joblocation")
    job_description_field = driver.find_element(By.NAME, "jobdescription")
    
    job_position_field.send_keys(job_position)
    job_location_field.send_keys(job_location)
    job_description_field.send_keys(job_description)

    # Select "Full Time" radio button
    full_time_radio = driver.find_element(By.XPATH, f"//input[@type='radio' and @value='{job_type}']")
    full_time_radio.click()

    # Click on the "Post Job" button
    post_job_submit_button = driver.find_element(By.NAME, "postjob")
    post_job_submit_button.click()

    # Wait for confirmation that the job was posted
    try:
        posted_message = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "post"))
        )
        assert "Posted!!!" in posted_message.text  # Verify that the posted message appears
        print("Job posting successful.")
    except Exception as e:
        print("Job posting failed.")
        raise e
