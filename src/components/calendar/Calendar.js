import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function CalendarComponent(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const navigate = useNavigate()


    // Helper function to check if a date is in the past
    const isDateInPast = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    }

    // Helper function to check if a time slot is in the past for today
    const isTimeInPast = (time) => {
        const currentTime = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);
        return slotTime <= currentTime;
    }

    // Generate time slots from 10:00 to 20:00 with 30-minute gaps
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 10; hour <= 20; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }
        return slots;
    };


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const fetchAndProcessEvents = async (date) => {
        console.log(date)
        const date1 = new Date(date);
        const formattedDate = formatDate(date1)
        try {
            console.log(formattedDate)
            const response = await axios.get(`http://localhost:3001/api/events?date=${formattedDate}`);
            return response.data; // Returns events
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    };

    const generateAvailableTimeSlots = (busyTimes, date) => {
        const slots = generateTimeSlots(); // Assuming this function generates all possible slots

        if (!date) {
            console.error('generateAvailableTimeSlots called without a valid date');
            return [];
        }

        const baseDate = new Date(date); // Use the passed date directly
        baseDate.setHours(0, 0, 0, 0);

        return slots.filter(slot => {
            const [hours, minutes] = slot.split(':').map(Number);
            const slotTime = new Date(baseDate.getTime()); // Clone baseDate to keep it unchanged
            slotTime.setHours(hours, minutes, 0, 0);

            // Check if slotTime is within any of the busy times
            return !busyTimes.some(busy => {
                const start = new Date(busy.start);
                const end = new Date(busy.end);
                return slotTime >= start && slotTime < end;
            });
        });
    };


    const onDateChange = async (date) => {
        if (!date) {
            console.error('No date selected.');
            return;
        }

        setSelectedDate(date); // Make sure this is set before using it
        setSelectedTime(null); // Reset time selection

        const events = await fetchAndProcessEvents(date);
        const busyTimes = events.map(event => ({
            start: new Date(event.start),
            end: new Date(event.end),
        }));

        const availableSlots = generateAvailableTimeSlots(busyTimes, date); // Pass date directly
        setAvailableTimeSlots(availableSlots); // Update the state with available time slots
    };


    // Inside CalendarComponent

    const handleBooking = async () => {
        if (selectedDate && selectedTime) {
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const dateTime = new Date(selectedDate);
            dateTime.setHours(hours, minutes);

            const adjustedDate = new Date(dateTime.getTime());

            const appointment = {
                date: adjustedDate.toISOString(),
                serviceName: props.serviceName,
                duration: props.duration,
                masterName: props.masterName,
                userName: props.userName,
                userSurname: props.userSurname,
                email: props.email,
                phone: props.phoneNumber,
                info: props.additionalInfo,
                price: props.price,
            };

            try {
                const response = await axios.post('http://localhost:3001/api/book', appointment);
                const response2 = await axios.post('http://localhost:3001/api/send-email', appointment);
                console.log(response.data);
                navigate('/success', { state: { name: props.userName, surname: props.userSurname, date: selectedDate.toLocaleDateString(), time: selectedTime, email: props.email } });
            } catch (error) {
                console.error(error);
                alert('Failed to book the appointment.');
            }
        } else {
            alert('Please select a date and time first.');
        }
    };




    return (
        <>
            <Calendar
                className='REACT-CALENDAR p-2'
                view='month'
                onClickDay={onDateChange}
                tileDisabled={({ date, view }) => view === 'month' && isDateInPast(date)}
            />
            {selectedDate && !isDateInPast(selectedDate) && (
                <div>
                    <div className='timeSlotsHeader'>Vabad ajad {selectedDate.toLocaleDateString()}</div>
                    <div className="time-slots">
                        {availableTimeSlots.map((time) => {
                            const disabled = selectedDate.toDateString() === new Date().toDateString() && isTimeInPast(time);
                            return (
                                <div
                                    key={time}
                                    className={`time-slot ${selectedTime === time ? 'time-slotSelected' : 'time-slotDefault'} ${disabled ? 'disabled' : ''}`}
                                    onClick={() => !disabled && setSelectedTime(time)}
                                >
                                    {time}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="buttonContainer">
                <div className={`bookButton ${selectedDate && selectedTime ? '' : 'disabled'}`} onClick={selectedDate && selectedTime ? handleBooking : undefined}>
                    Broneeri kohe
                </div>
            </div>
        </>
    );
}

export default CalendarComponent;
