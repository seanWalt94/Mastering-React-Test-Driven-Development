import React from 'react'
import ReactDOM from "react-dom/client"
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';
import { CustomerForm } from './CustomerForm';

function Main() {
  return (
    // <AppointmentsDayView appointments={sampleAppointments} />
    <CustomerForm/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

