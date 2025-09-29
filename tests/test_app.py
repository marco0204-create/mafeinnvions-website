import pytest
from playwright.sync_api import Page, expect

def test_mobile_menu_toggle(page: Page):
    # Navigate to the local index.html file
    page.goto("file:///app/index.html")

    # Find the menu button and the mobile menu
    menu_btn = page.locator("#menu-btn")
    mobile_menu = page.locator("#mobile-menu")

    # Initially, the mobile menu should be hidden
    expect(mobile_menu).to_be_hidden()

    # Click the menu button
    menu_btn.click()

    # After clicking, the mobile menu should be visible
    expect(mobile_menu).to_be_visible()

    # Click the menu button again
    menu_btn.click()

    # After the second click, the mobile menu should be hidden again
    expect(mobile_menu).to_be_hidden()