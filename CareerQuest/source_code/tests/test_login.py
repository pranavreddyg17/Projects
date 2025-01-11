from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def login_test(driver, url, user_type, email, password):
    driver.get(url)

    # Select radio button dynamically based on user_type
    radio_button = driver.find_element(By.XPATH,f"//input[@type='radio' and @value='{user_type}']")
    radio_button.click()

    # Fill in email and password
    email_field = driver.find_element(By.NAME, "email")
    password_field = driver.find_element(By.NAME, "password")
    email_field.send_keys(email)
    password_field.send_keys(password)

    # Click login button
    login_button = driver.find_element(By.NAME, "submit")
    login_button.click()

    # Wait for the result and check if login is successful
    try:
        home_div = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[text()='Home']"))
    )
        assert home_div.is_displayed()  # Ensure that the "HOME" div is displayed
        print("Login successful.")
    except Exception as e:
        print("Login failed: 'HOME' element not found.")
        raise e
