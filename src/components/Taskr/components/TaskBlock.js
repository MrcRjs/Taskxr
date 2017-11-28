import React from 'react';

export default class TaskBlock extends React.Component{

  defaultProps = {
    totalTime: process.env.TOTALEXETIME || 10,
    executed: 1,
    bgColor: 'transparent'
  }

  render() {
    return <div
    className='taskBlock'
    style={{
      height: '100%',
      width: 100 / this.props.totalTime * this.props.executed + '%',
      background: this.props.bgColor,
      marginLeft: 100 / this.props.totalTime * this.props.emptyBefore + '%'
    }}>
    <div className="taskBlock_label">{ this.props.task ? <span>{ this.props.task.task.getPid() }</span> : null }</div>
    </div>
  }
}
