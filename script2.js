document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("reservationForm");
    let message = document.getElementById("message");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let phone = document.getElementById("phone").value.trim();
            let email = document.getElementById("email").value.trim();
            let date = document.getElementById("date").value;
            let time = document.getElementById("time").value;
            let guests = document.getElementById("guests").value;      

            message.innerText = "";
            message.style.color = "red";

         
            if(name === "" || phone === "" || email === "" || date === "" || time === "" || guests === ""){
                message.innerText = " Please fill in all the fields.";
                return;
            }

          
            let phoneRegex = /^[0-9]{10,15}$/;
            if(!phoneRegex.test(phone)){
                message.innerText = " Please enter a valid phone number (10-15 digits only).";
                return;
            }

            
            let emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if(!emailRegex.test(email)){
                message.innerText = " Please enter a valid email address (e.g., name@example.com).";
                return;
            }

           
            let guestsNum = parseInt(guests);
            if(isNaN(guestsNum) || guestsNum <= 0){
                message.innerText = " Number of guests must be a positive number.";
                return;
            }
            if(guestsNum > 20){
                message.innerText = " Maximum 20 guests per reservation. Please contact us for larger groups.";
                return;
            }

        
            let today = new Date();
            today.setHours(0, 0, 0, 0); 
            
            let selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0);
            
            if(selectedDate < today){
                message.innerText = " Please select a future or today's date. You cannot book for a past date.";
                return;
            }

           
            let now = new Date();
            let selectedDateTime = new Date(`${date}T${time}`);
            
            if(selectedDate.getTime() === today.getTime() && selectedDateTime < now){
                message.innerText = " Please select a future time for today's reservation.";
                return;
            }

       
            let timeHour = parseInt(time.split(":")[0]);
            if(timeHour < 12 || timeHour >= 24){
                message.innerText = " Our working hours are from 12:00 PM to 12:00 AM. Please select a valid time.";
                return;
            }

           
            message.style.color = "green";
            message.innerText = " Reservation confirmed! We can’t wait to welcome you ";
            
         
            console.log({
                name: name,
                phone: phone,
                email: email,
                date: date,
                time: time,
                guests: guestsNum
            });
            
            form.reset();
        });
    }
});