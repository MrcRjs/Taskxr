import randomColor from 'randomColor'
import React from 'react';
import TaskBlock from './components/TaskBlock';

export default class TaskGraph extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      taskColors: randomColor({luminosity: 'light', hue:'blue', count: this.props.tasks.length})
    };
    this.getTaskColor = this.getTaskColor.bind(this);
  }

  getTaskColor(task) {
    const taskIdx = this.props.tasks.map(t=>t.getPid()).indexOf(task.getPid());

    return this.state.taskColors[taskIdx];
  }

  render () {
    const Channels = this.props.results.map( (c, idx) => {
      return <div key={ idx }><div className="chLabel">Channel { idx + 1 }</div>
        <div className="taskRow">
        {
          c.map( (t, idx, tArr) => {
            if (idx > 0) {
              const lastEndTime = tArr[idx - 1].exeEndChanTime;
              return <TaskBlock
                key={ idx }
                task={ t }
                totalTime={ this.props.totalTime }
                executed={ t.exeEndChanTime - t.exeChanTime }
                emptyBefore={t.exeChanTime - lastEndTime}
                bgColor={ this.getTaskColor(t.task) }
              />
            } else {
              return <TaskBlock
                key={ idx }
                task={ t }
                totalTime={ this.props.totalTime }
                executed={ t.exeEndChanTime - t.exeChanTime }
                bgColor={ this.getTaskColor(t.task) }
                emptyBefore={ t.exeChanTime }
              />
            }
          })
        }
        </div>
      </div>
    });

    return <div>
      { Channels }
  </div>
  }
}
