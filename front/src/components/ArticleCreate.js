import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Breadcrumb, Button, Form} from "react-bootstrap";
import {createArticles} from "../redux/articles/actions";

const BreadcrumbComponent = ({history}) => {
  const actionArticles = (e) => {
    e.preventDefault();
    history.push('/articles');
  };

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/articles" onClick={actionArticles}>Articles</Breadcrumb.Item>
      <Breadcrumb.Item active>Create</Breadcrumb.Item>
    </Breadcrumb>
  )
};

class ArticlesCreateComponent extends Component {
  state = {
    title: "",
    body : "",
    validated: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const {count, message} = nextProps;

    if (count !== this.props.count) {
      if (!message) {
        this.props.history.push('/articles');
      }
    }
  }

  handleSubmit = (event) => {
    const {onCreateArticles} = this.props;
    const {title, body} = this.state;
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onCreateArticles(title, body);
    }
    this.setState({ validated: true });

  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/articles');
  };

  render() {
    const {message} = this.props;
    const {validated} =  this.state;

    return (
      <main className={'articles-create'}>
        <div className={'articles-create__header'}>
          <BreadcrumbComponent history={this.props.history}/>
        </div>
        <Form noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}>
          <Form.Group className="articles-create__title">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={e => this.setState({title: e.target.value})} type="text" required placeholder="Title" />
            <Form.Text className="text-muted">
              {message}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control  required onChange={e => this.setState({body: e.target.value})} as="textarea" rows="3" />
          </Form.Group>
          <Form.Group className={'buttons'}>
            <Button variant="primary" type="submit">
              Create
            </Button>
            <Button variant="primary" onClick={this.handleCancel}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </main>
    )
  }
}


export default withRouter(connect(
  state => ({
    message: state.articles.message,
    count  : state.articles.count,
  }),
  dispatch => ({
    onCreateArticles: (title, body) => dispatch(createArticles(title, body))
  }),
)(ArticlesCreateComponent));