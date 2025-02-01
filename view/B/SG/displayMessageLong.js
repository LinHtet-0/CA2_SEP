 // If the selected room type has no furniture available: 

// The system displays a message, such as "No furniture available for this room type. Please select a different room." 


// The system does not display any furniture.


function displayMessageLong() {
    var message = "No furniture available for this room type. Please select a different room.";
    document.getElementById("displayMessageLong").innerHTML = message;
}

displayMessageLong();