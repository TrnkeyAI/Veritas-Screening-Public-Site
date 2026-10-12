# App Flow

Migrated by trnkey-cleanup from the old JOURNEY.MD (a placeholder stub). The page map below was derived from the code - updated from code by trnkey-cleanup - verify. Click-by-click flows are still TODO.

## Roles
One public visitor role. No accounts on this site.

## Page map
| Route | Purpose |
|---|---|
| `/` | Home: hero, services grid, stat cards, closing call to action |
| `/services` | Service sections with anchor navigation |
| `/about` | About; leadership section hidden until content is supplied |
| `/compliance` | FCRA rights, California residents, filing a dispute, requesting a report |
| `/contact` | Contact form (GHL embed or built-in form) |
| `/privacy` | Built but gated off; nginx returns 404 |

## Key flows
- Header "Log In" goes to the Veritas app login (external, same tab).
- Header "Sign Up" and every "Start a Background Check" button go to the app signup (external, same tab).
- Contact form (built-in): validate name, work email, company, service, message; shows idle, submitting, success or error states; sends nothing yet.

TODO: write the per-page click flows and error, empty and loading states.
