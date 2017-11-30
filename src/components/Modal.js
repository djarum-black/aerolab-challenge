import  React, {  Component } from 'react';



class Modal extends Component {


	render() {
		let {that, showModal, apiMessage, modalTitle} = this.props
		return (

			<div className={showModal ? "modal is-active" : "modal"}>

				<div className="modal-background"></div>

				<div className="modal-card">
				  <header className="modal-card-head">
				    <p className="modal-card-title">{modalTitle}</p>
				  </header>
				  <section className="modal-card-body">
				   <p>{apiMessage ?  apiMessage : 'Redeeming, please wait.'} </p>
				  </section>
				  <footer className="modal-card-foot">

				   {apiMessage ? <button className="button is-info" onClick= {() => that.closeModal()}>Close</button> : '' } 
				  </footer>
				</div>

			</div>

			)
	}
}

export default Modal