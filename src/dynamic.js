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
      const models = typeof resolveModel === "function" ? resolveModel() : [];
      const component = resolveComponent();
      const loadPromise = new Promise(resolve => {
        Promise.all([...models, component]).then(result => {
          if (!models || !models.length) {
            resolve(result[0].default || result[0]);
          } else {
            const len = models.length;
            result.slice(0, len).forEach(m => {
              registerModel(m.default || m);
            });
            resolve(result[len].default || result[len]);
          }
        });
      });
      return loadPromise;
    }
  });
}

export default dynamic;
