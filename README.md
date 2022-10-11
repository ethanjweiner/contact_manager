# Contact Manager

## INSTRUCTIONS FOR USE

1. Download this repository
2. Run `npm install` in project directory
3. Run `nmp start` to start a server on `localhost`
4. Visit `http://localhost:3000/`


## USEFUL TIPS AND DESIGN PATTERNS

- `View`/`Page`s
  - Keep the view "dumb". Handle majority of logic in controller & model.
  - Use a **show/hide model** for page switching. This:
    - Makes toggling pages easier
    - Makes animations easier
    - Renders more elements on page load, increasing the # of specific event listeners you can attach.
  - **Class hierachy**:
    - Singular `View` class that collaborates with various `Page`s
    - `Page` superclass from which pages inherit from
      - High-level page helpers like `show`, `hide`, `select`, `insertTemplate`,etc.
      - Store handlers to elements in each page
  - Keep templates & partials as minimized as possible
- `Model`
  - Write the model first. Like a database or API, it serves as a good foundation.
  - **Cache the data for filtering, but reload data upon any CRUD actions**
    - Data is more reliable & in sync
    - Avoids additional overhead of making manual updates to cached data
  - If the `Model` is complex, consider breaking up the `Model` into multiple classes
- `Controller`
  - **Data loading & updates**:
    - Singular function in controller that:
      - Reloads data
      - Rerenders model
      - *Purpose*:
        - Initial loading & rendering
        - Upon model updates, reload model + render view

- Template loading: Fetch & compile all templates on page load and register in `Handlebars.templates` and `Handlebars.partials`
  - Use an IIFE to compile templates on load
  - Provide a handler to the templates in the `Pages` class
  - Note: During production, would be better to precompile
- Naming
  - Keep naming conventions consistent
  - Name callbacks passed into functions as `handler`s (no need to name more specifically, since the higher-order function name gives context to the `handler` purpose)
- **Helpful abstractions**:
  - `ajax` helper
  - Page switching helper
  - Template insertion helper
  - `formTo*` helper in view (readies data)
- Misc:
  - Wrap any asynchronous calls w/ `try...catch` for basic error handling

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