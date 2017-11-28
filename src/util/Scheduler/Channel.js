class Channel {
  constructor(id) {
    this.id = id;
    this.executedTasks = [];
    this.time = 0;
    this.executionTimeLeft = 0;
    this.executingTask = null;
    this.channelExeQueue = [];
  }

  getId() {
    return this.id;
  }

  getTime() {
    return this.time;
  }

  setId(pid) {
    this.id = pid;
  }

  getExecutedTasks() {
    return this.executedTasks;
  }
  getChannelExeQueue() {
    return this.channelExeQueue;
  }

  isBusy() {
    // Double not to convert to bool
    return !!this.executionTimeLeft;
  }

  decreaseExecutionTime() {
    if (this.executionTimeLeft > 0) {
      this.executionTimeLeft--;
      this.executingTask.task.decExeTaskTime();
    }
  }

  increaseTime() {
    this.time++;
    if (this.executingTask) {
      this.decreaseExecutionTime();
      if (this.executionTimeLeft === 0 && this.executingTask.task.getExeTimeLeft() === 0) {
        this.executedTasks = [
          ...this.executedTasks,
          Object.assign(this.executingTask ,{
            exeEnd: this.time
          })
        ];

        this.executingTask = null;
      } else if (this.executionTimeLeft === 0 && this.executingTask.task.getExeTimeLeft() > 0) {
        this.executingTask = null;
        return this.executingTask;
      }
    }
  }

  executeTask(queuedTask, exeT) {
    const exeChanTime = this.getTime();
    const exeEndChanTime = this.getTime() + (exeT || queuedTask.task.getExeT());
    this.channelExeQueue = [ ...this.getChannelExeQueue(), { ...queuedTask, exeChanTime: exeChanTime, exeEndChanTime: exeEndChanTime  }];
    this.executingTask = Object.assign( queuedTask, { exeStart: queuedTask.exeStart || this.time });
    this.executionTimeLeft = exeT || queuedTask.task.getExeT();
  }

  printExecutedTasks() {
    console.log('\n👉🏼 Executed %d task(s) in channel ID %d',
      this.channelExeQueue.length, this.id
    );
    this.channelExeQueue.map(t=>{
      const waitTime = (t.exeEnd - t.exeStart) - t.task.getExeT();
      console.log('\nStart Time: %d End Time: %d Wait Time: %d',
        t.exeStart, t.exeEnd, waitTime
      );
      t.task.printTask();
    });
    console.log('🤘🏼😎👾🤘🏼😎👾🤘🏼😎👾🤘🏼😎👾🤘🏼😎👾🤘🏼😎👾🤘🏼😎👾🤘🏼😎👾');
  }

  printChannel() {
    console.log('ID: %d', this.id);
  }

}

export default Channel;
