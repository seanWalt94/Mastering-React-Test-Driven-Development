import React, { act } from 'react'
import { initializeReactContainer, render } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('CustomerForm', () => {

  beforeEach(() => {
    initializeReactContainer();
  });

  const form = id => document.querySelector(`form[id="${id}"]`)

  const expectTGoBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }

  const field = name => form('customer').elements[name]

  const labelFor = formElement => document.querySelector(`label[for="${formElement}"]`)

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) =>
    it('as a test box', () => {
      render(<CustomerForm />)
      field(fieldName)
      expectTGoBeInputFieldOfTypeText(field(fieldName))
    })

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value ', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />)
      expect(field(fieldName).value).toEqual('value')
    })


  const itRendersALabel = (fieldName, text) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });

  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      await act(() => ReactTestUtils.Simulate.submit(form('customer')));
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      await act(() => ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName }
      }));
      await act(() => ReactTestUtils.Simulate.submit(form('customer')));
    });

    it('has a submit button', () => {
      render(<CustomerForm/>)
      const submitButton = document.querySelector(
        'input[type="submit"]'
      )
      expect(submitButton).not.toBeNull()
    })

  describe('first name field', () => {
    itRendersAsATextBox('firstName')
    itIncludesTheExistingValue('firstName')
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'value');
    itSubmitsNewValue('firstName', 'newValue');
  })
  describe('last name field', () => {
    itRendersAsATextBox('lastName')
    itIncludesTheExistingValue('lastName')
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName', 'value');
    itSubmitsNewValue('lastName', 'newValue');
  })
  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber')
    itIncludesTheExistingValue('phoneNumber')
    itRendersALabel('phoneNumber', 'Phone Number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', '012345');
    itSubmitsNewValue('phoneNumber', '012346');
  })

})
