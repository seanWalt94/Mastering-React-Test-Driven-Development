import React, {useState} from 'react'

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${h}:${m}`
}


export const Appointment = ({ customer, stylist, service, notes, startsAt }) => (
  <div id="appointmentView">
  <h3>Today's appointment at {appointmentTimeOfDay(startsAt)}</h3>
  <table>
    <tbody>
      <tr>
        <th scope="row">Customer</th>
        <td>{customer.firstName} {customer.lastName}</td>
      </tr>
      <tr>
        <th scope="row">Phone Number</th>
        <td>{customer.phoneNumber}</td>
      </tr>
      <tr>
        <th scope="row">Stylist</th>
        <td>{stylist}</td>
      </tr>
      <tr>
        <th scope="row">Service</th>
        <td>{service}</td>
      </tr>
      <tr>
        <th scope="row">Notes</th>
        <td>{notes}</td>
      </tr>
    </tbody>
  </table>
  </div>
);

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0)

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ?
        (
          <p>There are no appointments scheduled for today.</p>
        ) : (
          <Appointment {...appointments[selectedAppointment]} />
        )
      }

    </div>
  )
};