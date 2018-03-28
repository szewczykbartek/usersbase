import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import AppLayout from './layouts/AppLayout'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <AppLayout/>
  </Provider>
  ,
  document.getElementById('root')
)