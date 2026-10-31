const departmentList = document.querySelector("#department-list");
const courseList = document.querySelector("#course-list");
const selectedDepartment = document.querySelector("#selected-department");
const courseCount = document.querySelector("#course-count");
const drawer = document.querySelector("#professor-drawer");
const drawerBackdrop = document.querySelector("#drawer-backdrop");

let departments = [];

function getRatingClass(rating) {
    if (rating === null) {
        return "average";
    }

    if (rating >= 4) {
        return "good";
    }

    if (rating >= 3) {
        return "average";
    }

    return "low";
}

async function loadPlannerData() {
    try {
        const response = await fetch("/api/planner");

        if (!response.ok) {
            throw new Error(`The server returned status ${response.status}.`);
        }

        const data = await response.json();
        departments = data.departments;
        renderDepartments();
    } catch (error) {
        courseList.replaceChildren();
        const message = document.createElement("p");
        message.className = "empty-state";
        message.textContent = "Could not load planner data. Is the Python server running?";
        courseList.appendChild(message);
        console.error("Could not load planner data:", error);
    }
}

function renderDepartments() {
    departmentList.replaceChildren();

    departments.forEach((department, index) => {
        const button = document.createElement("button");
        button.className = "department-button";
        button.type = "button";
        button.textContent = department.name;
        button.addEventListener("click", () => {
            document.querySelectorAll(".department-button").forEach((item) => {
                item.classList.remove("selected");
            });
            button.classList.add("selected");
            renderCourses(department);
        });
        departmentList.appendChild(button);

        if (index === 0) {
            button.click();
        }
    });
}

function renderCourses(department) {
    selectedDepartment.textContent = department.name;
    courseCount.textContent = `${department.courses.length} class${department.courses.length === 1 ? "" : "es"}`;
    courseList.replaceChildren();

    department.courses.forEach((course) => {
        const courseCard = document.createElement("article");
        courseCard.className = "course-card";

        const heading = document.createElement("h3");
        heading.textContent = course.code;

        const title = document.createElement("p");
        title.className = "course-title";
        title.textContent = course.title;

        const professorList = document.createElement("div");
        professorList.className = "professor-list";

        course.professors.forEach((professor) => {
            professorList.appendChild(createProfessorCard(professor, course, department));
        });

        courseCard.append(heading, title, professorList);
        courseList.appendChild(courseCard);
    });
}

function createProfessorCard(professor, course, department) {
    const button = document.createElement("button");
    button.className = "professor-card";
    button.type = "button";
    button.setAttribute("aria-label", `View details for ${professor.name}`);
    button.addEventListener("click", () => openDrawer(professor, course, department));

    const name = document.createElement("span");
    name.className = "professor-name";
    name.textContent = professor.name;

    const ratingRow = document.createElement("span");
    ratingRow.className = "rating-row";

    const rating = document.createElement("span");
    rating.textContent = "Overall rating";

    const ratingChip = document.createElement("strong");
    ratingChip.className = `rating-chip ${getRatingClass(professor.rating)}`;
    ratingChip.textContent = professor.rating === null ? "Not available" : `${professor.rating} / 5.0`;

    ratingRow.append(rating, ratingChip);
    button.append(name, ratingRow);
    return button;
}

function openDrawer(professor, course, department) {
    document.querySelector("#drawer-course").textContent = `${course.code} - ${course.title}`;
    document.querySelector("#drawer-professor-name").textContent = professor.name;
    document.querySelector("#drawer-department").textContent = department.name;
    document.querySelector("#drawer-rating").textContent = professor.rating === null ? "Not available" : `${professor.rating} / 5.0`;
    document.querySelector("#drawer-difficulty").textContent = professor.difficulty === null ? "Not available" : `${professor.difficulty} / 5.0`;
    document.querySelector("#drawer-would-take-again").textContent = professor.wouldTakeAgain === null ? "Not available" : `${professor.wouldTakeAgain}%`;
    document.querySelector("#drawer-rating-count").textContent = professor.ratingCount === null ? "Not available" : professor.ratingCount;
    document.querySelector("#drawer-description").textContent = professor.description;

    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    drawerBackdrop.hidden = false;
    document.querySelector("#close-drawer").focus();
}

function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    drawerBackdrop.hidden = true;
}

document.querySelector("#close-drawer").addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDrawer();
    }
});

loadPlannerData();
