import React, { Component } from 'react';
import queryString from 'query-string';
import {connect} from "react-redux";
import {fetchArticles, selectedArticle} from "../redux/articles/actions";
import {Link, withRouter} from "react-router-dom";
import {Breadcrumb, Button, Pagination, Table} from "react-bootstrap";
import ArticleModal from "./ArticleModal";
import {APP_CONST} from "../constans";

const TableComponent = ({articles, showArticle, changeArticle}) => {
  return (
    <Table striped bordered hover variant="dark" className={"articles__table"}>
      <thead>
      <tr>
        <th>id</th>
        <th>Title</th>
        <th>Body</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        {articles.map(info => (
          <tr key={info._id}>
            <th>{info._id}</th>
            <th>{info.title}</th>
            <th>{info.body}</th>
            <th className={'buttons'}>
              <Button onClick={() => changeArticle(info)} className={'edit'} variant="secondary" size="lg">Edit</Button>
              <Button onClick={() => showArticle(info)} variant="secondary" size="lg" >View</Button>
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

const PaginationComponent = ({count, active, history}) => {
  const slideTable = (e, numberPage) => {
    e.preventDefault();
    history.push(`/articles?page=${numberPage}`);
  };
  const lastIndex = Math.ceil(count / APP_CONST.MAX_LIMIT);
  const items = [];

  for (let i = 1; i <= lastIndex; i++) {
    items.push(
      <Pagination.Item onClick={(e) => slideTable(e, i)} key={i} active={i == active}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className={'articles__pagination'} size="lg">{items}</Pagination>
  )
};

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>Articles</Breadcrumb.Item>
    </Breadcrumb>
  )
};

class ArticlesComponent extends Component {
  state = {
    page : queryString.parse(this.props.location.search).page || 1,
    limit: queryString.parse(this.props.location.search).limit || '',
    showingArticle: false
  };

  componentWillMount() {
    const {onFetchArticles, articles} = this.props;
    const {page = '', limit = ''} = this.state;

    if (!Object.keys(articles).length) {
      onFetchArticles(page, limit);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {onFetchArticles, articles, count} = nextProps;
    const {page = '', limit = ''} = queryString.parse(nextProps.location.search);

    const currValues = queryString.parse(this.props.location.search);
    let currPage = currValues.page || "",
        currLimit = currValues.page || "";

    if (count === -1 || currPage != page || currLimit != limit) {
      this.setState({page, limit});
      if (articles[page] == undefined || articles[page].length < limit) {
        return onFetchArticles(page, limit);
      }
    }
  }

  showArticle = (info) => {
    this.setState({showingArticle: info});
  };

  hideArticle = () => {
    this.setState({showingArticle: false});
  };


  changeArticle = (info) => {
    const {onSelectedArticle} = this.props;
    onSelectedArticle(info);
    this.props.history.push(`/articles/${info._id}/edit`);
  };

  render() {
    const {articles, count} = this.props;
    const {page = 1, showingArticle} = this.state;

    return (
      <main className={"articles"}>
          <div className={"articles__header"}>
            <BreadcrumbComponent/>
            <Button variant="secondary" size="lg" onClick={() => this.props.history.push('articles/create')}>Create</Button>
          </div>
          <TableComponent
            changeArticle={this.changeArticle}
            showArticle={this.showArticle}
            articles={articles[page] || []}/>
          <PaginationComponent history={this.props.history} count={count} active={page}/>
          {showingArticle && <ArticleModal handleClose={this.hideArticle} id={showingArticle._id} article={showingArticle}/>}
      </main>
    )
  }
}

export default withRouter(connect(
  state => ({
    articles: state.articles.pages || [],
    count   : state.articles.count
  }),
  dispatch => ({
    onFetchArticles  : (page, limit) => dispatch(fetchArticles(page, limit)),
    onSelectedArticle: (info) => dispatch(selectedArticle(info))
  }),
)(ArticlesComponent));