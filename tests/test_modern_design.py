import pytest
from playwright.sync_api import Page, expect

def test_modern_design_and_interactions(page: Page):
    # Set a viewport size to ensure consistency
    page.set_viewport_size({"width": 1280, "height": 720})

    # Navigate to the local index.html file
    page.goto("file:///app/index.html")

    # 1. Verify Dark Mode and Typography
    body = page.locator("body")
    expect(body).to_have_css("background-color", "rgb(17, 24, 39)")
    expect(body).to_have_css("font-family", 'Poppins, sans-serif')

    # 2. Verify Project Modal
    project_card = page.locator(".project-card").first
    modal = page.locator("#project-modal")
    close_modal_btn = page.locator("#close-modal")

    # Scroll to the project card to make it visible
    project_card.scroll_into_view_if_needed()

    # Modal should be hidden initially
    expect(modal).to_be_hidden()

    # Click a project card to open the modal
    project_card.click()
    expect(modal).to_be_visible()

    # Use JavaScript to click the close button, bypassing actionability checks
    page.evaluate("document.getElementById('close-modal').click()")
    expect(modal).to_be_hidden()

    # 3. Verify Contact Form
    contact_form = page.locator("#contact-form")
    email_input = page.locator("#email-input")
    submit_btn = page.locator("#submit-btn")

    # Scroll to the contact form
    contact_form.scroll_into_view_if_needed()

    # Fill out the form and submit
    email_input.fill("test@example.com")
    page.locator("textarea").fill("This is a test message.")
    submit_btn.click()

    # Check for the "sending" state
    expect(submit_btn).to_have_text("Sending...")

    # Wait for the "Message Sent!" state
    page.wait_for_timeout(2500)
    expect(submit_btn).to_have_text("Message Sent!")

    # 4. Take a screenshot for visual verification
    page.screenshot(path="tests/verification.png")