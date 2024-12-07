import os
from dotenv import load_dotenv
from selenium.common import NoSuchElementException
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver import ActionChains


class BasePage:
    __base_url = None
    __wait_seconds = None
    __driver = None
    __action_chains = None

    @property
    def base_url(self) -> str:
        return self.__base_url

    @property
    def current_url(self) -> str:
        return self._driver.current_url

    @property
    def driver(self) -> WebDriver:
        return self.__driver

    @property
    def wait_seconds(self) -> int:
        return self.__wait_seconds

    @property
    def email(self) -> str:
        return self.__email

    @property
    def password(self) -> str:
        return self.__password

    def __init__(self, driver: WebDriver):
        # Load account and password from .env file
        BASEDIR = os.path.abspath(os.path.dirname(__file__))
        load_dotenv(os.path.join(BASEDIR, '.env'))
        self.__base_url = os.getenv("URL")
        self.__wait_seconds = os.getenv("WAIT_SECONDS")
        self.__email = os.getenv("EMAIL")
        self.__password = os.getenv("PASSWORD")

        # Load driver
        self.__driver = driver

        # Load action chains
        self.__action_chains = ActionChains(self.__driver)

    def _open_url(self, url: str):
        self.__driver.get(url)

    def _find(self, locator: tuple) -> WebElement:
        return self.__driver.find_element(*locator)

    def _await(self, seconds: int = None):
        if seconds is None:
            self.__driver.implicitly_wait(self.__wait_seconds)
            return

        self.__driver.implicitly_wait(seconds)

    def _scroll_down(self, y: int):
        self.__action_chains.scroll_by_amount(0, y).perform()

    def _type(self, locator: tuple, text: str):
        element = self._wait_until_element_is_visible(locator)
        element.send_keys(text)

    def _click(self, locator: tuple):
        element = self._wait_until_element_is_visible(locator)

        if self.__driver.name == "chrome":
            self.__action_chains.move_to_element(element).click().perform()
        else:
            self.__driver.execute_script("arguments[0].click();", element)

    def _get_text(self, locator: tuple) -> str:
        element = self._wait_until_element_is_visible(locator)

        if self.__driver.name == "chrome":
            self.__action_chains.move_to_element(element).perform()
        else:
            self.__driver.execute_script("arguments[0].scrollIntoView();", element)

        return element.text

    def _wait_until_element_is_visible(self, locator: tuple) -> WebElement:
        wait = WebDriverWait(self.__driver, self.__wait_seconds)
        element = wait.until(ec.visibility_of_element_located(locator))

        return element

    def _wait_until_element_is_invisible(self, locator: tuple):
        wait = WebDriverWait(self.__driver, self.__wait_seconds)
        wait.until(ec.invisibility_of_element_located(locator))

    def _wait_until_element_to_be_clickable(self, locator: tuple):
        wait = WebDriverWait(self.__driver, self.__wait_seconds)
        wait.until(ec.element_to_be_clickable(locator))

    def _wait_until_url_to_be(self, url: str):
        wait = WebDriverWait(self.__driver, self.__wait_seconds)
        wait.until(ec.url_to_be(url))

    def _is_displayed(self, locator: tuple) -> bool:
        try:
            return self._find(locator).is_displayed()
        except NoSuchElementException:
            return False
