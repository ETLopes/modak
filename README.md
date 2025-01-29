
# Setup Instructions

## Prerequisites

- **Node.js** (version 18.19.0)
- **npm** or **Yarn**
- **Expo CLI**

Install the Expo CLI globally using npm:

```bash
npm install -g expo-cli
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ETLopes/modak.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd modak
   ```

3. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

## Running the Project

Start the development server:

  Using npm:

  ```bash
  npm run start
  ```

  Or using yarn:

  ```bash
  yarn start
  ```

This will launch the Metro bundler and provide options to run the app on an emulator or physical device.

## Notes

- The app was developed using Expo CLI and TypeScript.
- The app fetches the list of products from the [DummyJSON - Products API](https://dummyjson.com/docs/products).
- The app does not require user authentication and opens directly to the home screen, displaying the list of products.
- The app implements data fetching and mapping from the selected API.
- The UI is decoupled from API calls using mappers and clean architecture patterns.
- The app uses error handling and loading states during API calls.

- Because of time constraints, the app does not implement the bonus points or additional bonus features.
- The sorting algorithm for the products is implemented either by price or rating. Additional sorting options such as relating price to rating were not implemented.
- The Native module for adding a product purchase reminder into the user's calendar was not implemented although it was considered. The integration with expo was not straightforward and would require more time to implement.


