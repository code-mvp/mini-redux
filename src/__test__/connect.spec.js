import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'
import createReducer from './createReducer'
import createStore from './createStore'
import Provider from './Provider'
import connect from './connect'

describe('(connect.js)', () => {

  const dummyReducer = createReducer({ query: '' }, {
    query(state, action) {
      return {
        query: action.payload.query
      }
    }
  })

  it('should inject props', (done) => {
    const store = createStore(dummyReducer)

    const TextInput = connect(({ query }) => {
      expect(query).toEqual('prepopulated query')
      done()

      return <div />
    }, () => ({
      query: 'prepopulated query'
    }))

    mount(
      <Provider store={store}>
        <TextInput />
      </Provider>
    )
  })

  it('should select state from store', (done) => {
    const inputText = 'query in state'

    const store = createStore(dummyReducer, {
      query: inputText
    })

    const TextInput = connect(({ query }) => {
      expect(query).toEqual(inputText)
      done()

      return <div />
    }, (state) => ({
      query: state.query
    }))

    mount(
      <Provider store={store}>
        <TextInput />
      </Provider>
    )
  })

  it('should inject a dispatch fn', (done) => {
    const store = createStore(dummyReducer)

    const TextInput = connect(({ dispatch }) => {
      expect(dispatch).toBeA(Function)
      done()

      return <div />
    }, (state) => ({
      query: state.query
    }))

    mount(
      <Provider store={store}>
        <TextInput />
      </Provider>
    )
  })

})
