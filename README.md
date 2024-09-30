# Water-Tracking-App

## Value proposition

As a user
I want to track my daily water consumption and set goals
So that I can maintain a healthy hydration level and improve my well-being

## Description

- The app should allow users to create an account, log in,
  and track their daily water consumption.

- Users should be able to set personal daily water intake goals and view their progress over time.

- The app should remind users to drink water if they haven’t met their daily goal.

- The app should display past water entries, and users should be able to review their consumption history.

## Acceptance criteria

⬜️ How does the app handle empty fields during registration and login?

⬜️ What happens when a user tries to submit a water entry without inputting the amount?

⬜️ How does the app display progress towards the daily water goal (e.g., percentage, remaining amount)?

⬜️ What notification or reminder is triggered when the user is behind on their goal?

⬜️ How does the app behave if there is a network or database error while fetching water history?

## Tasks

- Implement user authentication (registration and login) using NextAuth.js and MongoDB

- Create UI components for adding daily water entries and setting goals

- Store and retrieve water consumption data in MongoDB

- Design the dashboard for tracking daily and historical water consumption

- Set up a notification system for reminders when the user hasn’t met their daily goal

- Handle errors and edge cases (e.g., invalid input, database connection failures)

## Bonus Task

- implement a sleep tracker

## Development

### Local Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Use `npm run test` to run the tests.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run start` to start a production server
- `npm run test` to run the tests
- `npm run lint` to run the linter

### Resources

- UI/UX Checklist:
  https://sa-nf-product.notion.site/Design-4-Development-Checklist-ad24ba263c024adfb5e9fdcbf6a8a270
