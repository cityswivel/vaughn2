import React from 'react';
import Modal from 'react-responsive-modal';
import Visibility from 'material-ui-icons/Visibility';
import Clear from 'material-ui-icons/Clear';
export default class MyModal extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
		var images = this.load_image(this.props.mls);
	};

  onCloseModal = () => {
    this.setState({ open: false });
  };
	load_image = (mls) => {
		console.log(mls);
	}
  render() {

    const { open } = this.state;
    return (
      <div>
				<Visibility onClick={this.onOpenModal} />
        <Modal open={open} onClose={this.onCloseModal} little>
					<img style={{width:'50%',float:'left',marginRight:'8px'}} src={this.props.image}/>
					<h2 style={{margin:0}}>{this.props.price}</h2>
					<p>{this.props.description}</p>
					<Clear onClick={this.onCloseModal}/>
        </Modal>
      </div>
    );
  }
}
