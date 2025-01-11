from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from test_login import login_test  # Import the login_test function
import time  

def company_verification_test(driver,url, email, password, company_name):
    driver.get(url)
    # Perform login
    email_field = driver.find_element(By.NAME, "email")
    password_field = driver.find_element(By.NAME, "password")
    email_field.send_keys(email)
    password_field.send_keys(password)

    # Click login button
    login_button = driver.find_element(By.NAME, "submit")
    login_button.click()

    # Locate the "View" button for the company specified
    company_view_button_xpath = f"//div/h5[contains(text(),'{company_name}')]/following-sibling::button"
    
    # Wait for the "View" button to be clickable
    view_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, company_view_button_xpath))
    )
    
    # Click the "View" button for the company
    view_button.click()
    # Locate and click the "Verify" button inside the modal
    verify_button_xpath = f"//p[contains(text(),'{company_name}')]/ancestor::div[@class='modal-body']/following-sibling::div/a[@class='btn btn-success']"
    
    # Wait for the "Verify" button to be clickable
    verify_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, verify_button_xpath))
    )
    
    # Click the "Verify" button
    verify_button.click()
    time.sleep(2)

    print("Company successfully verified.")

# Example usage:
# company_verification_test(driver, "admin@example.com", "adminpassword", "XYZ 5432")
