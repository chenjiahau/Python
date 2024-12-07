import pytest
from page_objects.base_page import BasePage
from page_objects.main_page import MainPage


class TestLoginPage:
    @pytest.mark.main_page
    def test_main_page(self, driver):
        main_page = MainPage(driver)
        main_page.open()
        description = main_page.execute_page()

        assert description == "New description"