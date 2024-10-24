import React from 'react'
import { initializeReactContainer, render } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

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

  const firstNameField = () => form('customer').elements.firstName

  const labelFor = formElement => document.querySelector(`label[for="${formElement}"]`)

  it('renders a form', () => {
    render(<CustomerForm />)
    expect(form('customer')).not.toBeNull()
  })
  
  it('renders the first name field as a test box', () => {
    render(<CustomerForm />)
    firstNameField()
    expectTGoBeInputFieldOfTypeText(firstNameField())
  })

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley"/>)
    expect(firstNameField().value).toEqual('Ashley')
  })

  it('renders a label for the first name field', () => {
    render(<CustomerForm />)
    expect(labelFor('firstName')).not.toBeNull()
    expect(labelFor('firstName').textContent).toEqual('First name')
  })

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm />)
    expect(firstNameField().id).toEqual('firstName')
  })
})
