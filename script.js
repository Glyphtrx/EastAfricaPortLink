const shipments = {
    "EAPL1234567": {
        status: "In Transit",
        location: "Nairobi, Kenya",
    },
    "EAPL7654321": {
        status: "Awaiting Inspection",
        location: "Port of Mombasa, Kenya",
    },
    "EAPL1122334": {
        status: "Delivered",
        location: "Dar es Salaam, Tanzania",
    }
};
const trackingform = document.getElementById("trackingform");

trackingform.addEventListener("submit", function(event) {
    event.preventDefault();

    const containerId = document.getElementById("containerId").value;
    const trackingResult = document.getElementById("trackingResult");

const shipment = shipments[containerId.toUpperCase()];
    
    if (shipment) {
        trackingResult.innerHTML = `
            <p><strong>Container ID:</strong> <span id="containerIdResult"></span></p>
            <p><strong>Status:</strong> <span id="statusResult"></span></p>
            <p><strong>Location:</strong> <span id="locationResult"></span></p>
        `;
       async (params) => {
         document.getElementById("containerIdResult").textContent = containerId;
         document.getElementById("statusResult").textContent = shipment.status;
         document.getElementById("locationResult").textContent = shipment.location;
       }
    } else {
        trackingResult.textContent = 
        "No sampleshipment found for Container ID: " + containerId;
    }
});