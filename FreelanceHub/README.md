# FreelanceHub — Frontend Prototype

A clickable frontend-only prototype of a freelance marketplace, built with
plain HTML, CSS and JavaScript (no frameworks, no backend, no database).

## How to run

1. Unzip this folder.
2. Open the folder in VS Code.
3. Install the **Live Server** extension (by Ritwick Dey), if you don't
   have it already.
4. Right-click `index.html` → **Open with Live Server**.

(You can also just double-click `index.html` to open it directly in a
browser — everything on this prototype works without a server.)

## Pages

| File               | Page                 |
|--------------------|----------------------|
| index.html         | Home                 |
| freelancers.html   | Find Freelancers     |
| jobs.html          | Find Jobs            |
| profile.html       | Freelancer Profile   |
| post-job.html      | Post a Job           |
| login.html         | Login                |
| register.html      | Register             |
| dashboard.html     | Dashboard            |

## Folders

- `css/style.css` — all styling for every page
- `js/script.js` — all interactivity: navigation, search, filters,
  form validation, confirmation messages
- `images/` — reserved for image assets (this prototype uses CSS-based
  avatars/placeholders, so no image files are required to run it)

## Note for evaluators

This is a **prototype**, not the final application. All interactions
(login, hire, apply, post job) are simulated on the front end with
JavaScript — there is intentionally no real backend, database, or
authentication yet, as per the assignment brief. The full version will
connect these same screens to a real backend and database.
