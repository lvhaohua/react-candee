import React, { Component } from "react";
import { dynamicModel } from "./model";

function asyncComponent(config) {
  const { resolve } = config;

  class DynamicComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
      this.load();
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    load() {
      resolve().then(comp => {
        const Component = comp;
        if (this.mounted) {
          this.setState({ Component });
        } else {
          this.state.Component = Component; // eslint-disable-line
        }
      });
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }

  return DynamicComponent;
}

const cached = {};

function registerModel(modelRes) {
  if (!cached[modelRes.name]) {
    dynamicModel(modelRes);
    cached[modelRes.name] = 1;
  }
}

function dynamic(config) {
  const { model: resolveModel, component: resolveComponent } = config;
  return asyncComponent({
    resolve: () => {
      const model = typeof resolveModel === "function" ? resolveModel() : null;
      const component = resolveComponent();
      const loadPromise = new Promise(resolve => {
        Promise.all([model, component]).then(([modelRes, compRes]) => {
          if (modelRes) registerModel(modelRes.default || modelRes);
          resolve(compRes.default || compRes);
        });
      });
      return loadPromise;
    }
  });
}

export default dynamic;
