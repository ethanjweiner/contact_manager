# Contact Manager

## REQUIREMENTS

### API Server

- Use a self-hosted API server to store & retrieve contacts

### View

- Two "Add Contact" buttons
- Search bar
- List of tags
- CSS (or bootstrap?) animations for adding contact
  - Accordion?
- Add/edit contact form:
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

### Searching Contacts

- Search by text in full name (Regex pattern amatching?)
- Search updates should be realtime

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

1. View-switching
  - Add transitions for view classes (should automatically transition upon show/hiding in JS?)
  - Use animations?
2. Contact adding
3. Search
4. Contact editing

## IMPLEMENTATION IDEAS

- Utilize OO creation patterns (e.g. saving contacts?)

## ENDPOINTS

- Visit `/doc` to view endpoints