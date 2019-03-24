import React, {Component} from 'react';
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import {fetchOneArticle} from "../redux/articles/actions";

class ArticleModalComponent extends Component {
  componentWillMount() {
    const {id}= this.props;
    const {onFetchOneArticle}= this.props;
    //onFetchOneArticle(id);
  }

  render() {
    const {article, handleClose} = this.props;

    return (
      <Modal className={`modal-article`} show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{article.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{article.body}</Modal.Body>
        <Modal.Footer>
          <p><span>create at: </span><span className={`time`}>{article.created_at}</span></p>
          <p><span>update at: </span><span className={`time`}>{article.updated_at}</span></p>
        </Modal.Footer>
      </Modal>
    )
  }
}


export default connect(
  state => ({}),
  dispatch => ({
    onFetchOneArticle: (id) => dispatch(fetchOneArticle(id))
  })
)(ArticleModalComponent);