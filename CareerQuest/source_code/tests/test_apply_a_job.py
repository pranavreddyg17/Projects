from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from test_login import login_test  # Import the login_test function
import os  # Import os for file path management

def apply_job_test(driver, url, user_type, email, password, job_position, job_type, name, dob, resume_path):
    # Log in as an employee
    login_test(driver, url, user_type, email, password)

    # Wait for the home page to load
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[text()='Home']"))
    )

    # Locate the job based on position and location, and click apply
    apply_button_xpath = f"//div/h3[contains(text(),'{job_position}')]/following-sibling::h4[contains(text(),'{job_type}')]/ancestor::div[@class='job']/following-sibling::div[@class='application']/button"
    
    try:
        apply_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, apply_button_xpath))
        )
        apply_button.click()  # Click the apply button
        print("Apply button clicked.")
    except Exception as e:
        print("Apply button not found or not clickable.")
        raise e

    # Wait for the modal to appear
    try:
        modal = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "jobDetailsModal"))  # Adjust modal ID as needed
        )
        print("Application modal is displayed.")
    except Exception as e:
        print("Application modal did not appear.")
        raise e

    # Fill out the application form
    name_field = driver.find_element(By.ID, "name")
    dob_field = driver.find_element(By.ID, "dob")
    
    name_field.send_keys(name)
    dob_field.send_keys(dob)  # Enter date in mm/dd/yyyy format

    # Upload resume
    resume_upload_field = driver.find_element(By.ID, "resume")  # Adjust ID if necessary
    resume_upload_field.send_keys(os.path.abspath(resume_path))  # Use absolute path for the resume file

    # Click submit button in the modal
    submit_button = driver.find_element(By.XPATH, "//button[contains(text(),'Apply') and @type='submit']")  # Adjust if needed
    submit_button.click()
    print("Submt button is clicked")
    WebDriverWait(driver, 10).until(EC.alert_is_present())

    # Switch to alert and get its text
    alert = driver.switch_to.alert
    alert_text = alert.text

    # Verify the alert message
    assert "Application submitted successfully!" in alert_text, "Alert message did not match expected text."
    print(alert_text)  # Print the alert message for confirmation

    # # Accept the alert to close it
    alert.accept()
