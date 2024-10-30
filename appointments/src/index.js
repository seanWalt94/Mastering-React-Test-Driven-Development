import React from 'react'
import ReactDOM from "react-dom/client"
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments, sampleAvailableTimeSlots } from './sampleData';
import { CustomerForm } from './CustomerForm';
import { AppointmentForm } from './AppointmentForm';

function Main() {
  return (
    // <AppointmentsDayView appointments={sampleAppointments} />
    // <CustomerForm/>
    <AppointmentForm availableTimeSlots={sampleAvailableTimeSlots}/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

