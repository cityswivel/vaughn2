import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import Home from './containers/Home'
import ResidentialListing from './containers/ResidentialListing'
import CommercialListing from './containers/CommercialListing'
import LandListing from './containers/LandListing'
import MultiListing from './containers/MultiListing'
import TopNav from './containers/TopNav';
import Footer from './containers/Footer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
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
				<Route exact path="/" component={Home}/>
        <Route exact path="/listings" component={App}/>
				<Route path="/listings_residential/:number" component={ResidentialListing}/>
				<Route path="/listings_commercial/:number" component={CommercialListing}/>
				<Route path="/listings_land/:number" component={LandListing}/>
				<Route path="/listings_multi_family/:number" component={MultiListing}/>
        <Footer/>
				</div>
			</MuiThemeProvider>
	</ConnectedRouter>
	</Provider>,
  document.getElementById('root')
)
