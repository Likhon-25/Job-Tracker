
const cards = document.querySelectorAll(".Card");
const totalElement = document.getElementById("total");
const interviewElement = document.getElementById("interviewCount");
const rejectElement = document.getElementById("rejectCount");
const totalCountText = document.getElementById("totalCountInterviewReject");

let interviewCount = 0;
let rejectCount = 0;

updateDashboard();

function updateDashboard() {
    const totalCards = document.querySelectorAll(".Card").length;

    totalElement.innerText = totalCards;
    interviewElement.innerText = interviewCount;
    rejectElement.innerText = rejectCount;
}

function updateRightCount(text, count) {
    totalCountText.innerText = `${text} ${count}`;
}



function showEmptyState(message) {
    container.innerHTML = `
        <div class="text-center py-10">
            <i class="fa-solid fa-briefcase text-5xl text-gray-400 mb-4"></i>
            <h2 class="text-2xl font-bold">${message}</h2>
            <p class="text-gray-500">There are no jobs in this category.</p>
        </div>
    `;
}



document.querySelectorAll(".interview-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        const card = this.closest(".Card");

        if (card.dataset.status === "interview") {
            // toggle off
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
    });
});



document.querySelectorAll(".rejected-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        const card = this.closest(".Card");

        if (card.dataset.status === "rejected") {
            // toggle off
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
    });
});



document.querySelectorAll(".fa-trash-can").forEach(icon => {
    icon.addEventListener("click", function () {

        const card = this.closest(".Card");

        if (card.dataset.status === "interview") {
            interviewCount--;
        }

        if (card.dataset.status === "rejected") {
            rejectCount--;
        }

        card.remove();

        updateDashboard();
    });
});



allTab.addEventListener("click", () => {

    const allCards = document.querySelectorAll(".Card");

    if (allCards.length === 0) {
        showEmptyState("No Jobs Available");
        updateRightCount("Total", 0);
        return;
    }

    container.innerHTML = "";
    allCards.forEach(card => container.appendChild(card));

    updateRightCount("Total", allCards.length);
});

interviewTab.addEventListener("click", () => {

    const interviewCards = document.querySelectorAll('[data-status="interview"]');

    if (interviewCards.length === 0) {
        showEmptyState("No Interview Jobs Available");
        updateRightCount("Interview", 0);
        return;
    }

    container.innerHTML = "";
    interviewCards.forEach(card => container.appendChild(card));

    updateRightCount("Interview", interviewCards.length);
});

rejectedTab.addEventListener("click", () => {

    const rejectedCards = document.querySelectorAll('[data-status="rejected"]');

    if (rejectedCards.length === 0) {
        showEmptyState("No Rejected Jobs Available");
        updateRightCount("Rejected", 0);
        return;
    }

    container.innerHTML = "";
    rejectedCards.forEach(card => container.appendChild(card));

    updateRightCount("Rejected", rejectedCards.length);
});