import React ,{ Component } from 'react'
import ClassDashboard from './ClassDashboard'
import {getTasks} from '../libs/Firebase'

class TasksDashboard extends Component {
    constructor(props) {     
        super(props);     
        this.state = {
            tasksArray: []
        }
    }   
    componentDidMount() {
        getTasks().then((data) => { 
            let tasksArray = data.map((item) => {
                return {
                    name: item.data.name,
                    checked: false
                }
            })
            this.setState({tasksArray});
        });
    }

    render(){
        return(
            <ClassDashboard title='tasks' items={this.state.tasksArray}/>
        )
    }
}

export default TasksDashboard

