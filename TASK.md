## Goal
Build a small **banking-style web app** in **Angular** that demonstrates fundamentals:
- Routing and navigation
- Forms and validation
- Lists and filtering
- Basic client-side state management
- Simple persistence (e.g., `localStorage`)
- Simple API/mocking using local JSON or services
  Backend is **not** required.
---
## Scope
- Implement **3–4 main screens**.
- Use **mock data only** (local JSON files or hardcoded data in services).
- Application runs in the browser.
---
## Tech & Setup
- Use **Angular** (v19+ preferred).
- Use **TypeScript**.
- Use Angular **Router** for navigation.
- Use **Reactive Forms** for forms and validation.
- Persist simple state using the **browser’s `localStorage`** (or `sessionStorage`).
- Keep UI simple; design is not graded on pixel perfection. Focus on:
  - Clear layout
  - Reasonable UX
  - Clean, readable code
---
## Functional Requirements
### 1) Authentication (mock) X
Create a simple **login flow** (no real backend):
- **Login page** X
  - Fields: **email**, **password** x
  - Client-side validation:
    - Email: valid email format x
    - Password: minimum length **6** x
- **Hardcoded valid credentials**:
  - Email: `test@bank.com` x
  - Password: `123456` x
- On successful login:
  - Store a **mock token** in `localStorage` (e.g. `“mock-token”`). x
  - Navigate to the **main app** (e.g., `/accounts`). x
- On app start:
  - If a token exists in `localStorage`, **skip the login page** and go directly to the main app.  x
- Add a **Logout** action (e.g., in a header or menu):
  - Clears the token from `localStorage`.  x
  - Navigates back to the login page. x
---
### 2) Accounts Overview 
Create an **Accounts** screen that shows the user’s accounts.
- Load a list of accounts from:
  - A **local JSON file** (e.g. `assets/accounts.json`) or
  - A mocked Angular service (simulating `HttpClient`). 
- For each account, display: x
  - **Account name** 
  - **Masked account number** (e.g. `****6789`)
  - **Current balance with currency** (e.g. `€1,234.56`)
- Clicking/tapping an account:
  - Navigates to a **Transactions** screen for that account (e.g. `/accounts/:id`). x
- Add a **Refresh** action:
  - Can be a button like “Reload accounts”. 
  - Simulate a “network call” by: 
    - Showing a short delay 
    - Re-reading the mock data (or re-calling the service). 
---
### 3) Transactions List
For the **selected account**, display its recent transactions.
- Route example: `/accounts/:id/transactions` (or simply `/accounts/:id`). x
- Show a list of transactions: 
  - Sorted by **date, newest first**, toggleable newest/oldest first.
  - For each transaction, show:
    - **Merchant/description**
    - **Category**
    - **Date**, formatted in a readable way
    - **Amount**, with currency
  - Amount color:
    - **Negative (debit)**: red
    - **Positive (credit)**: green
- Add a simple **search and filter**:
  - A text input to filter by **merchant/description** (case-insensitive).
  - A type filter with options: **All, Debit, Credit**.
- At the top, show a **header** area with:
  - Account name
  - Current balance (formatted)
- This page must use pagination
---
### 4) Transfer Money (within the app only)
Create an in-app **Transfer** screen to move money between the user’s own accounts.
- From the **Transactions screen**, a **“Transfer”** button navigates to `/accounts/:id/transfer` (or similar).
- Transfer form fields:
  - **From account**: pre-filled with the currently selected account (read-only or disabled dropdown).
  - **To account**: a dropdown/select with the user’s **other accounts**.
  - **Amount**: numeric input.
  - **Note**: optional text field.
- **Validation**:
  - Amount must be `> 0`.
  - Amount may **not exceed** the “from” account’s current balance (no overdraft).
- On submit:
  - Update account balances **locally**:
    - From-account balance -= amount
    - To-account balance += amount
  - Append **two transactions**:
    - From-account:
      - Negative amount
      - Description: `“Transfer to {target account name}“`
    - To-account:
      - Positive amount
      - Description: `“Transfer from {source account name}“`
- Show a **success state**:
  - This can be a toast, alert, banner, or simple message.
  - After success, navigate back to the **Transactions** screen for the from-account.
- **Persist**:
  - Store updated accounts + transactions in `localStorage`.
  - Data should survive page reloads
