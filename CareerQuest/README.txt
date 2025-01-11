Career Quest
HTML, CSS, JavaScript, PHP, MariaDB


I) Overview
Career Quest is a web application designed to provide a comprehensive platform for job seekers and employers. With features such as user authentication, job posting, application management, and administrative controls, it facilitates efficient job searching and recruitment processes.


II) Key Features
1. User Authentication:
   a) Login and Logout for job seekers, employers, and administrators.
2. Role-based Access:
   a) Job Seeker: Can search and apply for jobs.
   b) Employer: Can post jobs and review applications.
   c) Admin: Can manage user accounts and oversee job postings.
3. Job Posting and Management:
   a) Employers can create, update, and delete job posts.
4. Application Management:
   a) Job seekers can apply for jobs.
   b) Employers can review, accept, or reject applications.


III) Installation Guide
1. Prerequisites
   a)XAMPP: Download and install XAMPP from Apache Friends.
2. Steps to Set Up the Project
   a)Install XAMPP: Follow the installation instructions provided on the XAMPP website to set up Apache and MariaDB (MySQL).
3. Set Up the Project in htdocs:
   a) Download or clone this project repository to your local machine.
   b) Copy the entire project folder to the htdocs directory inside your XAMPP installation folder (e.g., C:\xampp\htdocs\CareerQuest).
4. Start Apache and MySQL:
   a) Open the XAMPP Control Panel.
   b) Start the Apache and MySQL services.
5. Database Setup:
   a) Open your web browser and go to http://localhost/phpmyadmin.
   b) Create a new database named career_quest.
   c) Import the provided SQL file (if available) into this database to set up the required tables.
   d) To do this, click on your career_quest database, go to the "Import" tab, and select the SQL file to upload.
6. Database Configuration in the Project:
   a) Open the project folder in a code editor.
   b) Go to the file where database credentials are configured (e.g., _dbconnect.php).
   c) Update the database connection details as needed:
      $servername = "localhost";
      $username = "root"; (Default username in XAMPP)
      $password = ""; (Default password in XAMPP is empty)
      $dbname = "career_quest";

IV) Running the Project
1. Open a web browser and go to http://localhost/CareerQuest to access the application.
2. Follow the on-screen prompts to interact with the application:
   a) Sign up or log in as a job seeker, employer, or administrator.
   b) Explore the available functionalities such as job posting, job applications, and profile management.
3. Screenshots : Refer to the screenshots in the screenshots directory for a visual guide.

V) Testing with Pytest and Selenium
This project includes a suite of automated test cases using pytest and selenium. Test reports are generated in HTML format for easy viewing.
Prerequisites
To run these tests, ensure you have Python installed, along with the necessary packages.
1. Install Pytest: Used for running test cases.
2. Install Selenium: Required for browser automation tests.
3. Install Pytest-HTML: Used to generate HTML test reports.
Install the required packages using the following command: pip install pytest selenium pytest-html
To run the test, use the following command: python main.py