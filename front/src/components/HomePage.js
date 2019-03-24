import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Header from "./Header";
import Articles from "./Articles";
import ArticleCreate from "./ArticleCreate";
import ArticleEdit from "./ArticleEdit";

const HomePage = () => {
  return(
    <React.Fragment>
      <Header/>
      <Switch>
        <Route path={'/articles/create'} component={ArticleCreate}/>
        <Route path={'/articles/:id/edit'} component={ArticleEdit}/>
        <Route path={/^\/articles\??(page=[0-9]*\&?(limit=[0-9]*)?)?$/} component={Articles} />
        <Redirect to={'/'} />
      </Switch>
    </React.Fragment>
  )
};

export default withRouter(HomePage);


