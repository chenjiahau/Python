import time
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from page_objects.base_page import BasePage


class MainPage(BasePage):
    __url = None
    __description = (By.XPATH, "/html//div[@id='root']//p[@class='description']")
    __button = (By.XPATH, "/html//div[@id='root']//button[.='Change description']")

    def __init__(self, driver: WebDriver):
        super().__init__(driver)
        self.__url = f"{super().base_url}"

    def open(self):
        super()._open_url(self.__url)

    def execute_page(self) -> tuple:
        super()._click(self.__button)
        return super()._find(self.__description).text