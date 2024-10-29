import React, { act } from 'react'
import { initializeReactContainer, render } from './domManipulators'
import { AppointmentForm } from '../src/AppointmentForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('AppointmentForm', () => {

  beforeEach(() => {
    initializeReactContainer();
  });

  const form = id => document.querySelector(`form[id="${id}"]`)
  const field = name => form('appointment').elements[name]

  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes)
    return options.find(
      option => option.textContent === textContent
    )
  }

  const labelFor = formElement => document.querySelector(`label[for="${formElement}"]`)


  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  });

  it('renders as a select box', () => {
    render(<AppointmentForm/>)
    expect(field('service')).not.toBeNull()
    expect(field('service').tagName).toEqual('SELECT')
  })

  
  it('initially has a blank value chosen', () => {
    render(<AppointmentForm/>)
    const firstNode = field('service').childNodes[0]
    expect(firstNode.value).toEqual('')
    expect(firstNode.selected).toBeTruthy()
  })
  
  it('lists all salon services', () => {
    render(<AppointmentForm/>)
    const selectableServices = [
      'Cut',
      'Blow-dry',
    ]
    render(
      <AppointmentForm selectableServices={selectableServices}/>
    )
    const optionNodes = Array.from(field('service').childNodes)
    const renderedServices = optionNodes.map(node => node.textContent)
    expect(renderedServices).toEqual(expect.arrayContaining(selectableServices))
  })

  it('pre-selects the existing value', () => {
    const selectableServices = [
      'Cut',
      'Blow-dry',
    ]
    render(
      <AppointmentForm selectableServices={selectableServices} service="Blow-dry"/>
    )
    const option = findOption(field('service'), 'Blow-dry')
    expect(option.selected).toBeTruthy()
  })

  it('renders a label', () => {
    render(<AppointmentForm />);
    expect(labelFor('appointment')).not.toBeNull();
    expect(labelFor('appointment').textContent).toEqual('Appointment');
  });

  it('assigns an id that matches the label id', () => {
    render(<AppointmentForm />);
    expect(field('service').id).toEqual('service');
  });

  it('saves existing value when submitted', async () => {
    expect.hasAssertions();
    render(
      <AppointmentForm
       service="Blow-dry"
        onSubmit={({service}) =>
          expect(service).toEqual('Blow-dry')
        }
      />
    );
    await act(() => ReactTestUtils.Simulate.submit(form('appointment')));
  });

  it('saves new value when submitted', async () => {
    expect.hasAssertions();
    render(
      <AppointmentForm
        service='Blow-dry'
        onSubmit={({service}) =>
          expect(service).toEqual('Cut')
        }
      />
    );
    await act(() => ReactTestUtils.Simulate.change(field('service'), {
      target: { value: 'Cut', name: 'service'}
    }));
    await act(() => ReactTestUtils.Simulate.submit(form('appointment')));
  });

  describe('time slot table', () => {

    const timeSlotTable = () => document.querySelector('table#time-slots')

    it('renders a table for time slots', () => {
      render(<AppointmentForm/>)
      expect(timeSlotTable).not.toBeNull()
    })

    it('renders a time slot for every half an hour between open and close time', () => {
      render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />)
      const timesOfDay = timeSlotTable().querySelectorAll('tbody >* th')
      expect(timesOfDay).toHaveLength(4)
      expect(timesOfDay[0].textContent).toEqual('09:00')
      expect(timesOfDay[1].textContent).toEqual('09:30')
      expect(timesOfDay[3].textContent).toEqual('10:30')
    })
  })

})
