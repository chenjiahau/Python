import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager


@pytest.fixture
def driver(request):
    headless = request.config.getoption("--headless")
    browser = request.config.getoption("--browser")

    print(f"Browser type: {browser}")

    # Set options
    if browser == "chrome":
        options = webdriver.ChromeOptions()
    elif browser == "firefox":
        options = webdriver.FirefoxOptions()
    else:
        options = webdriver.ChromeOptions()

    if headless:
        options.add_argument("--headless")

    # Open respective browser
    driver = None
    if browser == "chrome":
      driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    elif browser == "firefox":
        driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()), options=options)
    else:
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

    # Return account, password, driver
    yield driver

    # Close browser
    driver.quit()

    print(f"Close browser type: {browser}")

def pytest_addoption(parser):
    parser.addoption(
        "--headless", action="store_true", default=False, help="Run browser in headless mode"
    )
    parser.addoption(
        "--browser", action="store", default="chrome", help="Type in browser type"
    )