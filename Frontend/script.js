document.getElementById('submit-slot').addEventListener('click', () => {
    const selectedSlot = document.getElementById('time-slot').value;
    const selectedDate = document.getElementById('date').value;
    const messageElement = document.getElementById('message');

    if (!selectedSlot || !selectedDate) {
        alert('Please select both a time slot and a date!');
        return;
    }

    const data = {
        recipient: "John Doe", // Replace with dynamic data if needed
        newSlot: selectedSlot,
        date: selectedDate,
        url: "http://example.com/details" // Replace with the actual URL if needed
    };

    fetch('/api/update-slot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            messageElement.style.display = 'block';
            messageElement.textContent = `Successfully notified the new slot: ${selectedSlot.replace('-', ' to ')} on ${selectedDate}`;
        } else {
            alert(`Failed to notify: ${result.error}`);
        }
    })
    .catch(error => {
        alert('An error occurred while notifying. Check the console for details.');
        console.error('Fetch Error:', error);
    });
});