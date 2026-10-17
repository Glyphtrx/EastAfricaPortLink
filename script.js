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
        trackingResult.innerHTML = 
        "Status; " + shipment.status + "<br>" +
        "Location: " + shipment.location;
    } else {
        trackingResult.innerHTML = 
        "No shipment found for Container ID: " + containerId;
    }
});