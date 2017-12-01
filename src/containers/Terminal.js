import  React,  {  Component } from 'react';
import '../css/Terminal.css'
import { connect } from 'react-redux';
import * as API from '../actions/'

import axios from 'axios'
import {bearer_token} from '../actions/'


const terminalHelp = 'available commands <br />' +
	'<span class="important">points</span>: show available points<br />'+
	'<span class="important">show products</span>: list available products<br />' +
	'<span class="important">redeem ID</span>: redeem products with ID - ex. "redeem 30" <br />' +
	'<span class="important">clear</span>: clear console<br />' +
	'<span class="important">help</span>: show available commands<br />' +
	'<span class="important">game mode</span>: open game mode - get some points!<br />' +
	'<span class="important">exit</span>: exit console'


function mapStateToProps(state) {
  return { 
  		user: state.userData,
  		messages: state.messages,
  		showTerminal: state.showTerminal,
  		points: state.points,
  		products: state.products,
  		questions: state.questions,
  		triviaMode: state.triviaMode
}		
}






class Terminal extends Component {

	constructor(props) {
		super(props)
		this.state = {questionIndex: -1}
	}

	componentDidUpdate() {
	     let el = document.getElementById('empty-element')
	     el.scrollIntoView()
	}

	componentWillReceiveProps(nextProps) {

		// dirty method for waiting for the redeem promise from terminal screen - can't make it work otherwise
	if(nextProps.messages.length - this.props.messages.length === 1) {
		setTimeout(() => {      
		     this.forceUpdate()
		 }, 3000)

		//update user points after redeeming
		this.props.dispatch(API.fetchUser())

		

	}
	}



	processCommand(event) {
		let {dispatch, points, products, questions, triviaMode} = this.props
		let command = event.target.value.trim()
		const difficulty = {easy: 1000, medium: 5000, hard: 7500}


		if(event.key === 'Enter') {
			event.target.value = ''

				
				dispatch(API.processCommand("user", command))


				if(this.state.questionIndex === 49) {
					dispatch(API.fetchQuestions())
					dispatch(API.processCommand("ugur", 'out of questions! type <span class="important">continue</span> to get new questions. type <span class="important">exit</span> to exit.'))
					this.setState({questionIndex: -1 })
					return false
				}

				if(triviaMode && command === 'continue') {
					this.setState({questionIndex: 0 })
					dispatch(API.processCommand("ugur",questions[0].question))

					return false
				}

				if(triviaMode && this.state.questionIndex !== -1) {

					if(command === "exit") {
						dispatch(API.toggleGameMode())
						dispatch(API.processCommand("ugur", 'game mode is <span class="terminal-red">off</span>. you can go back to game mode anytime by typing "game mode"'))
						this.setState({questionIndex: -1 })
						return false
					}




					if(command.toLowerCase() === questions[this.state.questionIndex].correct_answer.toLowerCase() ) {
						dispatch(API.processCommand("ugur", '<span class="important">correct!</span>'))
						
						dispatch(API.awardPoints(difficulty[ questions[this.state.questionIndex].difficulty ] ) )
						
						dispatch(API.processCommand("ugur", "you've won <b><span class=terminal-green>" + difficulty[ questions[this.state.questionIndex].difficulty] + "</span> points!"))


					}
					else {
						dispatch(API.processCommand("ugur", "<span class=\"terminal-red\">" + questions[this.state.questionIndex].correct_answer + "</span>"))
					}


					this.setState({questionIndex: this.state.questionIndex + 1 })
					dispatch(API.processCommand("ugur", questions[this.state.questionIndex].question))

					if(this.state.questionIndex % 10 === 0) {
						dispatch(API.processCommand("ugur", "you can type <span class=\"terminal-red\">exit</span> if you want to exit the game mode."))
					}

					return false
					
				}





				if (command.startsWith("redeem")) {
					try {
						let productIndex = command.match(/\d+/)[0]
						let product = products[productIndex]


						

						axios.post("https://aerolab-challenge.now.sh/redeem",{'productId': product._id}, {
						    							headers: { Authorization: bearer_token } })
						.then(function(response) {
							
							dispatch(API.processCommand("ugur","<span class=terminal-green>you have redeemed " + product.name +"</span>")) 
							
						})
						.catch(function(error) {
							dispatch(API.processCommand("ugur","<span class=terminal-red>error while redeeming</span>"))
						})
					



					}
					catch(err) {
						dispatch(API.processCommand("ugur","<span class=terminal-red>can't redeem</span>"))
					}


					}

				else {

				switch(command) {
				

					case 'help': {
						dispatch(API.processCommand("ugur",terminalHelp))
						break;
						
					}
					case 'game mode' : {
						dispatch(API.fetchQuestions())
						dispatch(API.processCommand("ugur",'game mode is <span class="terminal-green">on</span> <br/> type <span class="important">begin</span> to start the game. correct answers will get you points. type <span class="important">exit</span> to exit game mode'))
						break
					}

					case 'begin': {
						this.setState({questionIndex: 0 })
						dispatch(API.processCommand("ugur",questions[0].question))

						

						break
					}


					case 'points': {
						dispatch(API.processCommand("ugur","you have <span class=important>" + points + "</span> points."))
						break
					}

					case 'show products': {
						dispatch(API.processCommand("ugur", "green ones you can redeem with your points. red ones you can't - need more points"))

						dispatch(API.processCommand("ugur", products.map( (p, index) => 
							points >= p.cost ? "<span class=terminal-green>(" + index + ") - " +  p.name  + ' @' + p.cost + "</span>" :  "<span class=terminal-red>" +   p.name  + ' @' +p.cost +  " --- you need " + (p.cost - points)  + " more</span>" ).join('<br /> ') ))
						break
					}

					case 'exit': {
						dispatch(API.toggleTerminal())
						break
					}

					case 'clear': {
						dispatch(API.clearTerminal())
						break
					}

					default: 
						dispatch(API.processCommand("ugur", 'unrecognized command'))

					
				}
			}



			
			event.target.value = ''
		}


	}

	render() {

		console.log(this.state.questionIndex)

		return (
			<div id="terminal" className={this.props.showTerminal ? '' : 'is-hidden'}>
			<div>
			{this.props.messages.map( (message, index) => 
				<div key={index} className={message.user} ref="message" dangerouslySetInnerHTML={{ __html : message.message}} ></div>
				)}

			<input type="text" className="commandPrompt" onKeyPress= { (e) => {this.processCommand(e) } }  id="terminalInput"/>
			<div id="empty-element"></div>
			</div>
			</div>
			)
	
}
}

export default connect(mapStateToProps)(Terminal)