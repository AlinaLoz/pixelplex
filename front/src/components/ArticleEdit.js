import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Breadcrumb, Button, Form} from "react-bootstrap";
import {fetchOneArticle, updateArticle} from "../redux/articles/actions";

const BreadcrumbComponent = ({history}) => {
  const actionArticles = (e) => {
    e.preventDefault();
    history.push('/articles');
  };

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/articles" onClick={actionArticles}>Articles</Breadcrumb.Item>
      <Breadcrumb.Item active>edit</Breadcrumb.Item>
    </Breadcrumb>
  )
};

class ArticlesEditComponent extends Component {
  state = {
    title: this.props.selectedEdit.title || '',
    body : this.props.selectedEdit.body || '',
    validated: false
  };

  componentWillMount() {
    const {match, selectedEdit} = this.props;
    const {onFetchOneArticle} = this.props;
    if (!Object.keys(selectedEdit).length) {
      onFetchOneArticle(match.params.id);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {selectedEdit, message} = nextProps;

    if (selectedEdit !== this.props.selectedEdit) {
      if (!message) {
        return this.props.history.push('/articles');
      }

      if (selectedEdit) {
        const {title, body} = selectedEdit;
        this.setState({title,  body});
      }
    }
  }

  handleSubmit = (event) => {
    const {match} = this.props;
    const {onUpdateArticle} = this.props;
    const {title, body} = this.state;
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onUpdateArticle(match.params.id, title, body);
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
            <Form.Control value={this.state.title} onChange={e => this.setState({title: e.target.value})} type="text" required placeholder="Title" />
            <Form.Text className="text-muted">
              {message}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control value={this.state.body} required onChange={e => this.setState({body: e.target.value})} as="textarea" rows="3" />
          </Form.Group>
          <Form.Group className={'buttons'}>
            <Button variant="primary" type="submit">
              Update
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
    selectedEdit: state.articles.selectedEdit,
    message     : state.articles.message,
  }),
  dispatch => ({
    onFetchOneArticle: (id) => dispatch(fetchOneArticle(id)),
    onUpdateArticle  : (id, title, body) => dispatch(updateArticle(id, title, body))
  }),
)(ArticlesEditComponent));