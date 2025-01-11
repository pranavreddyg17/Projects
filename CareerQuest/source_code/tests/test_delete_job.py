from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from test_login import login_test
import time

def delete_job_test(driver, url, user_type, email, password, job_position, job_type):
    
    login_test(driver, url, user_type, email, password)

    # Wait for the home page to load (verify by checking for "HOME" div)
    home_div = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[text()='Home']"))
    )

    # Locate the delete button for the specified job position and type
    delete_button_xpath = f"//div/h3[contains(text(),'{job_position}')]/following-sibling::h4[contains(text(),'{job_type}')]/ancestor::div[@class='job']/following-sibling::div[@class='application']/a[@class='apply-button delete-button']"
    delete_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, delete_button_xpath)))
    delete_button.click()
    # Handle the alert confirmation dialog
    WebDriverWait(driver, 10).until(EC.alert_is_present())
    alert = driver.switch_to.alert

    # Accept the alert to confirm deletion
    alert.accept()
    time.sleep(3)
    print("Job deletion confirmed and alert accepted.")

    # Add a brief wait or check if necessary to verify deletion (depends on app behavior after deletion)

