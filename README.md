# vue_rik

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Mock Auth Middleware

Enable the student mock auth flow by exporting `VITE_USE_MOCK_AUTH=true` before `npm run dev`. The Vite dev server will:
- expose helper endpoints (`POST /mock-auth/token`, `/mock-auth/refresh`, `/mock-auth/logout`, `/mock-auth/protected`)
- inject `x-student-auth-token` into every API response and reject `/api` requests without it
- expire tokens after 50 seconds, returning `401` with `mock_auth_token_expired`

Clients should fetch `/mock-auth/token` on load, reuse the header, and call `/mock-auth/refresh` when they receive a 401.

Manual test checklist:
1. Start dev server with mock auth enabled and call `/mock-auth/token`; confirm header + expiry timestamp arrive.
2. Hit any `/api` route with the header and observe success.
3. Wait 50 seconds without refreshing; repeat the call and confirm a `401` with the same header value.
4. Call `/mock-auth/refresh` and retry the API call to ensure the new token works.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
