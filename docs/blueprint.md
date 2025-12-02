# **App Name**: TableMaster

## Core Features:

- Google OAuth Authentication: Secure user authentication using Google OAuth, allowing users to log in and manage reservations.
- Table Booking: Users can book a table by specifying the date, time, number of guests, and special requests. Bookings are stored in Firestore.
- Reservation History: Users can view a history of their past and upcoming reservations, easily accessible through a dashboard.
- Reservation Modification: Users can modify their reservation details (date, time, number of guests) directly from their booking history.
- Reservation Cancellation: Users can cancel their reservations with a simple click, updating the Firestore database in real-time.
- Menu Display: Display 5-10 dummy menu items with image placeholders, titles, descriptions, and prices.
- AI-Powered Recommendation Tool: LLM analyzes the user's booking history, including preferences such as past special requests, dates and pax size to make targeted menu suggestions using a tool.

## Style Guidelines:

- Primary color: Deep orange (#C45500) for warmth and sophistication.
- Background color: Light orange (#F8EFE7) - a very light tint of the primary.
- Accent color: Yellow-orange (#D58B00) for highlights and calls to action.
- Headline font: 'Playfair', a serif with an elegant and fashionable feel, best for headlines and short amounts of text.
- Body font: 'PT Sans', a sans-serif with a modern and readable style to support Playfair, making for a functional pairing.
- Use clean and modern icons to represent different actions and categories, such as booking, menu, and profile.
- Implement a minimalist card layout for menu items and a modal for the booking form, ensuring a responsive design across all devices.
- Subtle animations for user interactions, such as form submissions and transitions between pages, to enhance the user experience.