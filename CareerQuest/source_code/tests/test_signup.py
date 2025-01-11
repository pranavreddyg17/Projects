from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def signup_test(driver, url, user_type, email, full_name, phone, password):
    driver.get(url)

    signup_btn = driver.find_element(By.XPATH,"//a[contains(text(),'Sign Up')]")
    signup_btn.click()

    # Select radio button dynamically based on user_type
    radio_button = driver.find_element(By.XPATH,f"//input[@type='radio' and @value='{user_type}']")
    radio_button.click()

    # Fill in the signup form
    email_field = driver.find_element(By.NAME, "email")
    full_name_field = driver.find_element(By.NAME, "username")
    phone_field = driver.find_element(By.NAME, "phnumber")
    password_field = driver.find_element(By.NAME, "password")
    confirm_password_field = driver.find_element(By.NAME, "cpassword")

    email_field.send_keys(email)
    full_name_field.send_keys(full_name)
    phone_field.send_keys(phone)
    password_field.send_keys(password)
    confirm_password_field.send_keys(password)

    # Click register button
    register_button = driver.find_element(By.NAME, "submit")
    register_button.click()

    # Wait for the success alert and verify it
    try:
        success_alert = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "div[role='alert']"))
        )
        assert "Success ! Account is created !! You can try to login" in success_alert.text
        print("Signup successful.")
    except:
        print("Signup failed.")
