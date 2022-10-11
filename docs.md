# Contact Manager

## REQUIREMENTS

### API Server

- Use a self-hosted API server to store & retrieve contacts

### View

- Two "Add Contact" buttons X
- Search bar X
- List of tags X
- CSS (or bootstrap?) animations for adding contact X
  - Accordion?
- Add/edit contact form: X
  - Full name
  - Email address
  - Telephone number
  - Tags
- Are front-end routes required for different actions?

### Adding Contacts

- Basic client-side input validation (use HTML)

### Editing Contacts

- Same form as adding

### Deleting Contacts

- Display modal

### Viewing/Searching Contacts

- Search by text in full name (Regex pattern amatching?)
- Search updates should be realtime
- Can also filter contacts based on tag (clicking on tag => render home + model update)

### Tagging Contacts

- Pre-created set of tags to select from

## ARCHITECTURE

### Model

- Properties:
  - Contacts (all)
  - Filtered contacts
  - Search field (?)
- Methods:
  - Filter contacts list
  - Create contact
  - Edit contact

### View

Two main views:
1. Home page
2. Contact form (add/edit)

Properties:
- Templates (import & compile)

Functionality:
- View-switching
  - On "Add Contact" / "Edit Contact" click -> show contact form
  - On "Cancel" click -> show home page

### Contoller

## PLAN

1. View-switching X
  - Add transitions for view classes (should automatically transition upon show/hiding in JS?)
  - Use animations?
2. Contact adding X
3. Contact display X
  - Options:
    - Fetch only on app load -> update remotely & locally
    - Fetch + filter on every rendering -> update remotely only
  - Places to fetch:
    - Model
    - Controller
4. Contact search/filtering X
5. Contact deletion X
6. Contact editing X
7. Tags functionality X
8. Refactoring
  - Naming
  - Navigation heading as link
  - Consistent `id` type (string or integer)
  - Create better helpers (esp. view helpers)
9. Add additional functionality
  - Custom client-side validation
  - Better tag selection
10. Review project & list most relevant design patterns

## IMPLEMENTATION IDEAS

- Utilize OO creation patterns (e.g. saving contacts?)

## ENDPOINTS

- Visit `/doc` to view endpoints

## IMPROVEMENTS/QUESTIONS

- Separation of event listeners: Using one event listener feels too tight X
- Create separate view classes for different views; hide/show as needed? X
- General code cleanup X
- Make navigation heading a link to home page X
- Fix flexbox white space at end X
- Abstract commonality from add/edit contact forms & listeners? X
- Add debouncing?

Next Up:
- For view event handlers, always pass events -> extract from controller X
  - Decided to pass data itself. View should handle event extraction.
- More robust input validation?
- Consider removing cached data
- Error handling: Raise an error? Display error message? Necessary at all?
- Consistent id types: string VS integer X
- Review other projects: Joey, Jason, Wayne, etc.

## DISCUSSION POINTS

- Handling page switching
  - Showing/hiding VS insertion/deletion?
  - Separate classes/objects for each page?
  - My approach: Treat like a single page, show/hide elements
- Maintain a local copy/cache of contacts VS retrieving contacts from server whenever needed
- Templating in separate files
- MVC Pattern: Distinct pieces of functionality
  - e.g. Event listeners = ONLY for listening to events
- Difficulty: Knowing what parameters represent?
  - Just pass event to handler functions?
- Better Handlebars patterns?

## DESIGN PATTERNS

- Try to have some elements rendered in the starter HTML; makes event listening easier
- Have a few helper methods ready to go (abstract into module?)
- Decided to keep contact filtering on the view (closely tied to view)
- Cache contacts locally
- Each `Page` is a class
- Each part of the `Model` is a class
- Extract data from view at `page` directly (view events should pass data ready to go)
- Use custom `ajax` helper
- Wrap asynchronous calls w/ try...catch