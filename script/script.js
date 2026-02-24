// Select element
let container = document.getElementById("allCard");

let totalElement = document.getElementById("total");
let interviewElement = document.getElementById("interviewCount");
let rejectElement = document.getElementById("rejectCount");
let rightCount = document.getElementById("totalCountInterviewReject");

let allTab = document.getElementById("allTab");
let interviewTab = document.getElementById("interviewTab");
let rejectedTab = document.getElementById("rejectedTab");

let heroSection = document.getElementById("heroSection");

// initial state
let interviewCount = 0;
let rejectCount = 0;

// update dashbord count
function updateDashboard() {
    let totalCards = document.querySelectorAll(".Card").length;
    totalElement.innerText = totalCards;
    interviewElement.innerText = interviewCount;
    rejectElement.innerText = rejectCount;
}

// update right site label
function updateRightSide(label, count) {
    rightCount.innerText = label + " " + count;
}

// not applied button text
function updateNotAppliedButtons() {
    let buttons = document.querySelectorAll(".notAppliedBtn");

    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        let card = btn.closest(".Card");

        if (card.dataset.status === "interview") {
            btn.innerText = "Interview";
            btn.classList.remove("bg-gray-200", "text-blue-950");
            btn.classList.add("bg-green-100", "text-green-600");
        }
        else if (card.dataset.status === "rejected") {
            btn.innerText = "Rejected";
            btn.classList.remove("bg-gray-200", "text-blue-950");
            btn.classList.add("bg-red-100", "text-red-600");
        }
        else {
            btn.innerText = "Not Applied";
            btn.classList.remove("bg-green-100", "text-green-600", "bg-red-100", "text-red-600");
            btn.classList.add("bg-gray-200", "text-blue-950");
        }
    }
}

// Tab highlight
function setActiveTab(activeBtn) {
    let tabs = [allTab, interviewTab, rejectedTab];

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("bg-primary", "text-white");
        tabs[i].classList.add("bg-white", "text-gray-600", "border");
    }

    activeBtn.classList.remove("bg-white", "text-gray-600", "border");
    activeBtn.classList.add("bg-primary", "text-white");
}

// Filter function
function filterCards(statusType) {
    let cards = document.querySelectorAll(".Card");
    let found = 0;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        if (statusType === "all" || card.dataset.status === statusType) {
            card.style.display = "flex";
            found++;
        } else {
            card.style.display = "none";
        }
    }

    if (statusType !== "all" && found === 0) {
        heroSection.style.display = "flex";
    } else {
        heroSection.style.display = "none";
    }

    let label;
    if (statusType === "all") {
        label = "Total";
    } else if (statusType === "interview") {
        label = "Interview";
    } else {
        label = "Rejected";
    }

    updateRightSide(label, found);
}

// Interview button
let interviewBtns = document.querySelectorAll(".interview-btn");

for (let i = 0; i < interviewBtns.length; i++) {
    interviewBtns[i].addEventListener("click", function () {

        let card = this.closest(".Card");

        if (card.dataset.status === "interview") {
            card.dataset.status = "";
            interviewCount--;
        } else {
            if (card.dataset.status === "rejected") {
                rejectCount--;
            }
            card.dataset.status = "interview";
            interviewCount++;
        }

        updateDashboard();
        updateNotAppliedButtons();
    });
}

// Reject button
let rejectBtns = document.querySelectorAll(".rejected-btn");

for (let i = 0; i < rejectBtns.length; i++) {
    rejectBtns[i].addEventListener("click", function () {

        let card = this.closest(".Card");

        if (card.dataset.status === "rejected") {
            card.dataset.status = "";
            rejectCount--;
        } else {
            if (card.dataset.status === "interview") {
                interviewCount--;
            }
            card.dataset.status = "rejected";
            rejectCount++;
        }

        updateDashboard();
        updateNotAppliedButtons();
    });
}

// not applied btn
let notAppliedBtns = document.querySelectorAll(".notAppliedBtn");

for (let i = 0; i < notAppliedBtns.length; i++) {
    notAppliedBtns[i].addEventListener("click", function () {

        let card = this.closest(".Card");

        if (card.dataset.status === "interview") interviewCount--;
        if (card.dataset.status === "rejected") rejectCount--;

        card.dataset.status = "";

        updateDashboard();
        updateNotAppliedButtons();
        filterCards("all");
        setActiveTab(allTab);
    });
}

// Delete button
let deleteIcons = document.querySelectorAll(".fa-trash-can");

for (let i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener("click", function () {

        let card = this.closest(".Card");

        if (card.dataset.status === "interview") interviewCount--;
        if (card.dataset.status === "rejected") rejectCount--;

        card.remove();

        updateDashboard();
        updateNotAppliedButtons();

        if (allTab.classList.contains("bg-primary")) filterCards("all");
        if (interviewTab.classList.contains("bg-primary")) filterCards("interview");
        if (rejectedTab.classList.contains("bg-primary")) filterCards("rejected");
    });
}

// Tab click
allTab.addEventListener("click", function () {
    setActiveTab(allTab);
    filterCards("all");
});

interviewTab.addEventListener("click", function () {
    setActiveTab(interviewTab);
    filterCards("interview");
});

rejectedTab.addEventListener("click", function () {
    setActiveTab(rejectedTab);
    filterCards("rejected");
});

// Initial Load
updateDashboard();
allTab.click();
updateNotAppliedButtons();