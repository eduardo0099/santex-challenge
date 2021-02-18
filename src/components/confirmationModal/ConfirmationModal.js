import { Button } from '@components/button';
import { connect } from 'react-redux';
import { setModalText } from '@redux/confirmationModal/confirmationModal.actions';
import './confirmationModal.scss';

const ConfirmationModal = ({textContent, confirmedCallback, setConfirmationModalText}) => {
  const handleConfirm = () => {
    confirmedCallback();
    setConfirmationModalText('');
  }

  if (!textContent) return null;
  return (<div className="modal__confirmation">
    <div className="modal__content">
      <span className="modal__content__text">{textContent}</span>
      <Button className="modal__content__button" onClick={handleConfirm}>Confirm!</Button>
    </div>
  </div>);
};

const mapStateToProps = state => {
  return {
    textContent: state.confirmationModal.textContent,
    confirmedCallback: state.confirmationModal.confirmedCallback,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setConfirmationModalText: (text) => dispatch(setModalText(text)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);