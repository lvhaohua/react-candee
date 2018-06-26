# react-candee
A react framework that encapsulates the redux.

### API Introduction

#### 1.defaults
```js
// initial config
import candee from 'candee';

candee.defaults({
  initialState: '',
  reducers: {},
  addEffects: (effects)=>{},
  middlewares: [],
  historyMode: '', // hash browser memory
})
```

#### 2.render
```js
// render API encapsulates the redux provider and createStore
import { render } from 'candee';
import App from './views/App';
//render 
render(<App />, document.getElementById('root'));
```

#### 3.model
```js
// model template someModel.js 
export default {
  name: 'someModel',

  initialState: {
    a: '',
    b: ''
  },

  reducers: {
    reducerA(state, data) {
      console.log(data);
      return state;
    }
  },

  effects: {
    async effectA(data, getState) {
     const newData =  await fetch('...');
     actions.someModel.reducerA(newData);
    }
  }
};
```

```js
// inject model
import candee from 'candee';
import someModel from './models/someModel';

candee.model(someModel);
```

#### 4.actions

```js
// how to disptach 
import {actions} from 'candee';

actions.[modelName].[reducerName/effectName]
actions.routing.[push/go/...]

```

#### 5.connect
```js
// App.jsx
import React, { Component } from 'react';
import { connect } from 'candee';

class App extends Component {
  componentDidMount(){
    actions.someModel.reducerA(data);
  }
  // render(){...}
}

export default connect((state) => {
  return {
    states: state.someModel
  };
})(App);
```

#### 6.Router
```js
import { Router, Route, Switch, Redirect } from 'candee';
export default () => (
    <Router>
      <Switch>
        <Route path="/user" component={...} />
        <Route path="/" component={...} />
        <Redirect to="/" />
      </Switch>
    </Router>
);
```

#### 7.dynamic
```js
  const routeConfig = {
    model: () => [import("./model/login"),import("./model/regist")],
    component: () => import("./routes/Login")
  };
  <Route path="/login" component={dynamic(routeConfig)} />
```
