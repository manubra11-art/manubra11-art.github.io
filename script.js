document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const deviceId =
        params.get("device") || "AC-2026-017";

    const alarmId =
        params.get("alarm") || "A-1042";

    document.getElementById("deviceId").textContent = deviceId;

    const demoUrl =
        window.location.origin +
        window.location.pathname +
        "?device=" +
        encodeURIComponent(deviceId) +
        "&alarm=" +
        encodeURIComponent(alarmId);

    document.getElementById("demoUrl").textContent = demoUrl;


    /*
     * QR CODE
     *
     * The QR contains the device ID and alarm ID.
     * This allows the troubleshooting page to be opened
     * directly from an HMI or printed service label.
     */

   




    const steps = document.querySelectorAll(".step");
    const completedCount = document.getElementById("completedCount");
    const resolutionBox = document.getElementById("resolutionBox");

    let completed = 0;


    steps.forEach(function (step) {

        const buttons = step.querySelectorAll(".result-btn");
        const message = step.querySelector(".result-message");

        buttons.forEach(function (button) {

            button.addEventListener("click", function () {

                if (!step.classList.contains("completed")) {
                    step.classList.add("completed");
                    completed++;
                }

                buttons.forEach(function (btn) {
                    btn.style.opacity = "0.55";
                });

                button.style.opacity = "1";

                if (button.dataset.result === "OK") {

                    message.textContent =
                        "Result recorded: check completed successfully.";

                    message.className =
                        "result-message ok";

                } else {

                    message.textContent =
                        "Result recorded: deviation detected. Service review may be required.";

                    message.className =
                        "result-message not-ok";
                }

                completedCount.textContent = completed;

                if (completed === steps.length) {
                    resolutionBox.classList.remove("hidden");
                }

            });

        });

    });


    const resolvedBtn =
        document.getElementById("resolvedBtn");

    const serviceBtn =
        document.getElementById("serviceBtn");

    const serviceCase =
        document.getElementById("serviceCase");


    resolvedBtn.addEventListener("click", function () {

        serviceCase.classList.remove("hidden");

        document.getElementById("caseStatus").textContent =
            "Resolved";

        document.getElementById("recommendedAction").textContent =
            "No immediate service intervention";

        document.getElementById("priorityBadge").textContent =
            "RESOLVED";

        window.scrollTo({
            top: serviceCase.offsetTop - 30,
            behavior: "smooth"
        });

    });


    serviceBtn.addEventListener("click", function () {

        serviceCase.classList.remove("hidden");

        document.getElementById("caseStatus").textContent =
            "Service requested";

        document.getElementById("recommendedAction").textContent =
            "FRINGS service team review";

        document.getElementById("priorityBadge").textContent =
            "HIGH PRIORITY";

        localStorage.setItem(
            "frings_demo_service_case",
            JSON.stringify({
                device: deviceId,
                alarm: alarmId,
                timestamp: new Date().toISOString(),
                status: "Service requested"
            })
        );

        window.scrollTo({
            top: serviceCase.offsetTop - 30,
            behavior: "smooth"
        });

    });


    document.getElementById("emailBtn")
        .addEventListener("click", function () {

            const subject =
                "FRINGS Service Request – " +
                alarmId +
                " – " +
                deviceId;

            const body =
                "FRINGS Troubleshooting Demo\n\n" +
                "Device: " + deviceId + "\n" +
                "Alarm: " + alarmId + "\n" +
                "Process: Vinegar Fermentation\n" +
                "Actual temperature: 34.8 °C\n" +
                "Setpoint: 30.0 °C\n\n" +
                "The guided troubleshooting workflow was completed.\n" +
                "Further service review is requested.\n\n" +
                "This is an independent application prototype.";

            window.location.href =
                "mailto:?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);

        });

});
