# RateMyProf Planner

A college course-planning prototype that helps students compare professors by course and semester, then eventually build a schedule without needing to open many separate browser tabs or any extra hastle. 

## Project idea

Students often have to search for multiple professors separately while planning their schedules in websites like Rate my Professor. This project is intended to organize course, professor, rating, and schedule information in one place.

The long-term goal is to let a student:

1. Choose a school and semester.
2. Choose a department.
3. Choose a course.
4. See the professors teaching that course during that semester.
5. Compare ratings and other professor information all on one screen.
6. Open a professor details sidebar.
7. Add course sections to a weekly calendar they can export on calender.
8. Detect schedule conflicts.

## Current status

The current prototype includes:

- NYU Tandon Mathematics department
- MA-UY 1124 - Calculus II for Engineers
- Spring 2027 professor list
- Professor cards
- Overall rating display
- Difficulty display
- Would-take-again percentage display
- Rating count display
- Clickable professor details sidebar
- Python backend endpoint at `/api/planner`
- Responsive HTML and CSS layout
- Public GitHub repository

The current planner data is prototype data stored in `server.py`. It will later be moved into a separate data file.

## Technologies

- HTML
- CSS
- JavaScript
- Python
- Git
- GitHub

## Project structure

```text
ratemyprof-planner/
├── index.html
├── styles.css
├── script.js
├── server.py
├── old_prof_experiement.py
├── README.md
└── .gitignore
```

## Run the project locally

1. Open a terminal in the project folder.

2. Start the Python server:

   ```powershell
   python server.py
   ```

3. Open this address in a browser:

   ```text
   http://localhost:8000
   ```

4. To stop the server, press:

   ```text
   Ctrl+C
   ```

When editing `index.html`, `styles.css`, or `script.js`, save the file and refresh the browser. When editing `server.py`, stop and restart the Python server so it reloads the code.

## Current data model

The current prototype is organized around:

```text
Department
  └── Course
      └── Semester
          └── Professors
```

The planned, more detailed structure is:

```text
School
  └── Department
      └── Course
          └── Semester offering
              └── Course section
                  ├── Professor
                  ├── Meeting days
                  ├── Start time
                  └── End time
```

Attaching instructors to a semester offering or section is important because the instructors can change from one semester to another.

## Planned improvements

### Data and semesters

- Move planner data from `server.py` into `data/planner_data.json`.
- Add a semester selector.
- Display professors for select course for the selected semester.
- Add school and campus fields.
- Add course section numbers.
- Add class meeting days and times.
- Add a `ratingSource` and `ratingCheckedAt` field for rating transparency.

### Schedule builder

- Add a weekly calendar.
- Let users add and remove course sections.
- Detect overlapping class times.
- Highlight schedule conflicts.
- Support multiple possible schedules.

### Data sources

- Use official public course-schedule information when available.
- Research whether a permitted official API exists.
- Treat professor ratings as separate from course-assignment data.
- Do not assume a general professor rating is specific to one course or semester.
- Do not automate university login.
- Do not collect passwords, student IDs, grades, or private schedules.
- Review the terms of each external data source before automating requests.

### User experience

- Add search and filtering.
- Add links to rating sources.
- Improve the missing-rating display.
- Add mobile-friendly calendar behavior.
- Add loading and error states.
- Add a project screenshot and live demo link.

### Deployment

- Separate frontend and backend configuration.
- Add environment-variable support for secrets if any are needed.
- Deploy the backend and frontend only after reviewing data-source permissions.
- Add deployment instructions to this README.

## Data and privacy notes

The current professor data is a prototype dataset. Public professor ratings may be general ratings and may not represent a particular course or semester. Future versions should record the source and date each rating was checked.

Course assignment information and professor rating information come from different sources:

```text
Official course schedule
  -> semester, course, section, instructor, and meeting time

Permitted rating source
  -> rating, difficulty, rating count, and review information
```

The application should not request or store university login credentials. It should use public, permitted data or information that a user voluntarily uploads.

## Development workflow

Before making a change:

```powershell
git pull
```

After making and testing a change:

```powershell
git status
git add .
git commit -m "Describe the change"
git push
```

Example:

```powershell
git add .
git commit -m "Add semester selector"
git push
```

## Suggested milestones

- [x] Create initial planner interface.
- [x] Add professor cards and details sidebar.
- [x] Add NYU Mathematics and Calculus II prototype data.
- [x] Create a public GitHub repository.
- [ ] Move planner data into a JSON file.
- [ ] Add a semester selector.
- [ ] Add course sections and meeting times.
- [ ] Add a weekly schedule calendar.
- [ ] Add schedule conflict detection.
- [ ] Add verified data-source links and update dates + information. Maybe have   the site refresh the end of every day -> show "latest update date."
- [ ] Research permitted automated data access.
- [ ] Add tests.
- [ ] Deploy a live demo.

## Project planning tools

- GitHub repository: source code and version history.
- GitHub Issues: individual tasks and bugs.
- GitHub Projects: visual progress board.
- Lucidchart or FigJam: user flows, system diagrams, and data relationships.
- Figma: visual interface mockups.
- Google Docs or Notion: research notes and detailed brainstorming.

## License

This project does not currently have a license. Add one before encouraging others to reuse or distribute the code.
