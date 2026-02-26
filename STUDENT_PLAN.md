# Student Mock Auth Exercise Plan

## Goal
Practice handling expiring auth headers by integrating the mock middleware shipped with this repo and implementing client-side refresh logic.

## Prerequisites
- Node 20.19+ and npm installed.
- Clone repo and run `npm install`.
- Copy `.env.example` to `.env.local` and set `VITE_USE_MOCK_AUTH=true`.

## Step-by-Step Plan
1. **Start Dev Server**: Run `npm run dev` and confirm the console logs show `[mock-auth]` messages indicating token issuance.
2. **Create Auth Route**: Add a dedicated view/route (e.g., `/student-auth-lab`) that hosts the token controls (fetch, refresh, logout) and displays expiry countdowns so the exercise stays isolated from the rest of the UI.
3. **Obtain Token**: Use `curl -X POST http://localhost:5173/mock-auth/token -i` or invoke from the new route. Capture the `x-student-auth-token` header plus `expiresAt` from the JSON body.
4. **Target API Calls**: Invoke any `/api/...` route with `-H "x-student-auth-token: <value>"`. Expect success responses while the token is valid.
5. **Wait for Expiry**: After ~50 seconds, repeat the same request without refreshing the token. Observe a `401` response containing `mock_auth_token_expired` and note that the header still returns the stale token.
6. **Refresh Flow**: Call `curl -X POST http://localhost:5173/mock-auth/refresh` (or trigger from the dedicated route) to receive a new token + expiry. Update your client storage and retry the API call to verify recovery.
7. **Separate Axios Instance**: Create `src/api/mockAuthClient.js` exporting an Axios instance preconfigured with the base URL, header injection, and interceptors for the mock endpoints, so the main API client stays clean.
8. **Automate in Front-End**: Use the dedicated Axios instance to handle token acquisition and refresh. Add a response interceptor that listens for `401` + `mock_auth_token_expired`, calls `/mock-auth/refresh`, updates shared state, and retries the original request with the updated header.
9. **Manual Regression Checklist**:
   - First load fetches `/mock-auth/token` and hydrates the store.
   - API calls carry the header and succeed pre-expiry.
   - Expired token leads to surfaced error state and retry once refresh resolves.
   - Logout (`POST /mock-auth/logout`) clears local storage and forces a new token on the next request.

## Deliverables for Student
- Updated client code handling token storage, expiry UI messaging, and refresh retries.
- Short demo or screen recording showing the 50-second expiry cycle.
- Notes on any edge cases discovered (simultaneous requests, refresh race conditions, etc.).
