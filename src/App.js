import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// Components
import Home from "./components/Home";
import ViewBreed from "./components/ViewBreed";
import ViewSubBreed from "./components/ViewSubBreed";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/view/:breed" component={ViewBreed} exact />
          <Route path="/view/:breed/:subBreed" component={ViewSubBreed} exact />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
