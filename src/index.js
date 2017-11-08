import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import ListingView from './containers/Listing'
import TopNav from './containers/TopNav';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const routemiddleware = routerMiddleware(history)

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware,routemiddleware)
)

ReactDOM.render(
  <Provider store={store}>
	<ConnectedRouter history={history}>
	  	<MuiThemeProvider>
				<div>
				<TopNav />
				<Route exact path="/" component={App}/>
				<Route path="/listings_residential/:number" component={ListingView}/>
				<Route path="/listings_commercial/:number" component={ListingView}/>
				</div>
			</MuiThemeProvider>
	</ConnectedRouter>
	</Provider>,
  document.getElementById('root')
)
