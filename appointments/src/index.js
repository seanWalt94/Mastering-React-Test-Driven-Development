import React from 'react'
import ReactDOM from "react-dom/client"
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';

function Main() {
  return (
    <AppointmentsDayView appointments={sampleAppointments} />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

