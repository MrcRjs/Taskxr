import Task from './Task';
import Channel from './Channel';

const __DEBUG = false;
class Scheduler {
  constructor(config) {

    this.channels = [];
    for (let i = 0; i < config.channels; i++) {
      this.channels[i] = new Channel(i + 1);
    }

    /* Array [
      'exeT+' || 'exeT-',
      'priority+' || 'priority-'',
      'pid+' || 'pid-'
      ]
    */
    this.priorOrder = config.priorOrder;

    this.tasks = config.tasks.map(
      (t,i) => new Task(1001 + i, t.exeT, t.arriveT, t.priority)
    );

    this.multitask = config.multitask || false;

    this.multitaskQueue = [];

    // Unit of time
    this.time = 0;

    this.tasksQueue = [];

    this.executedTasks = [];

  }

  getTasks() {
    return this.tasks
  }

  getNextTask(Tasks, priorOrder) {
    let tiedTasks = [...Tasks];
    if (tiedTasks == [])
      return null;

    if (tiedTasks.length === 1) {
      return 0;
    } else {

      let counterOp = 0;
      // Execute until we can get just one task
      while(tiedTasks.length > 1) {
        let currentOperator = priorOrder[counterOp];

        // Sort by the first criteria
        tiedTasks = [
          ...tiedTasks.sort(
            this.compareTasks(currentOperator)
          )
        ];

        // Filter tied tasks
        let opName = this.getOperationName(currentOperator);

        let topTaskVal = tiedTasks[0][opName];

        tiedTasks = tiedTasks.filter(t=>t[opName] === topTaskVal);
        if (__DEBUG) {
          console.log('\n************* Tied Tasks %s **************', currentOperator);
          tiedTasks.map(t=>t.printTask());
          console.log('***************************************');
        }
        // Continue to next criteria order in this.priorOrder
        counterOp++;
      }

      // Return the index of the task in execution queue
      return Tasks.map(t => t.getPid()).indexOf(tiedTasks[0].getPid());
    }
  }

  getOperationName(op) {
    return op.slice(0, op.length - 1);
  }

  compareTasks(operator) {
    const Operations = {
      // Priority  0 High > 5 Low
      'priority+': (t1, t2) => t1.getPriority() - t2.getPriority(),
      'priority-': (t1, t2) => t2.getPriority() - t1.getPriority(),
      'exeT-': (t1, t2) => t1.getExeT() - t2.getExeT(),
      'exeT+': (t1, t2) => t2.getExeT() - t1.getExeT(),
      // Asc and Desc
      'pid+': (t1, t2) => t1.getPid() - t2.getPid(),
      'pid-': (t1, t2) => t2.getPid() - t1.getPid(),

      'equal': (t1, t2, prop) => t1[prop] === t2[prop]
    };

    return Operations[operator];
  }

  removeQueuedTask(removeTask) {
    const idx = this.tasksQueue.map(t=>t.task.getPid()).indexOf(removeTask.task.getPid());
    this.tasksQueue = [
      ...this.tasksQueue.slice(0, idx),
      ...this.tasksQueue.slice(idx + 1)
    ];
  }

  printTasks() {
    console.log('\n*************** Tasks ******************');
    this.tasks.map(p=>p.printTask());
    console.log('***************************************');
  }

  printQueuedTasks() {
    console.log('\n************ Queued Tasks *************');
    this.tasksQueue.map(p=>p.printTask());
    console.log('***************************************');
  }

  queueArrivedTaks() {
    this.tasksQueue = [
      ...this.tasksQueue,
      ...this.tasks.filter( t => t.arriveT === this.time).map(t=>({ task: t }))
    ];
  }

  printStarterConfig() {
    console.log('\n🐝🐝🐝🐝🐝🐝 Scheduler Ignited 🐝🐝🐝🐝🐝🐝');
    console.log('Multitask: %s', this.multitask);
    console.log('Priority order: ');
    this.priorOrder.map(p => console.log(p));
    console.log('Channels: ');
    this.channels.map(c=>c.printChannel());
    console.log('🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝');

  }

  printExeQueue() {
    console.log('🚥🚥🚥🚥🚥🚥 Execution Queue 🚥🚥🚥🚥🚥🚥🚥');
    this.tasksQueue.map(t=>t.task).map(t=>t.printTask());
    console.log('🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥🚥');
  }

  increaseTime() {
    this.time++;
    this.channels.map(c=>c.increaseTime());
  }

  getFreeChannel() {
    return this.channels.map(c=>c.isBusy()).indexOf(false);
  }

  executeTask(task, channelId) {
    console.log('\n🔥 Next task executing in Channel %d for %d quantum(s)', channelId + 1, task.task.getExeT());
    task.task.printTask();

    this.channels[channelId].executeTask(Object.assign(task, { excecutionChannels: [ { ch: channelId, t: this.time }]}));
    this.removeQueuedTask(task);
    this.executedTasks = [
      ...this.executedTasks,
      Object.assign(task,{
        exeStart: this.time
      })
    ];
  }

  executeMultiTask(task, channelId) {
    console.log('\n🔥 Next task executing in Channel %d for %d quantum(s)', channelId + 1, 1);
    task.task.printTask();

    this.channels[channelId].executeTask(Object.assign(task, { excecutionChannels: task.excecutionChannels ? [...task.excecutionChannels, { ch: channelId, t: this.time}] : [{ ch: channelId, t: this.time}] }), 1);

    const executedTask = Object.assign(task, {
      exeStart: task.exeStart || this.time
    });

    const taskHasTimeLeft = executedTask.task.getExeTimeLeft() -1;

    this.removeQueuedTask(task);

    if(taskHasTimeLeft > 0) {
      this.multitaskQueue = [
        ...this.multitaskQueue,
        executedTask
      ];
    } else {
      this.executedTasks = [
        ...this.executedTasks,
        executedTask
      ];
    }
  }

  executionFinished() {
    // if executed all tasks and every channel is not busy
    return this.time > 50 ? true
    : (this.executedTasks.length === this.tasks.length) &&
      this.channels
      .map(c=>!c.isBusy())
      .reduce((cx,cy) => cx && cy, true);
  }

  printReportMonotask() {
    console.log('\n\n\n🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻 Execution Complete! 🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻');
    console.log('🍻 Executed ' + this.executedTasks.length + ' task(s) in ' +
      this.time + ' quantum(s) in ' +
      this.channels.length + ' channel(s). 🍻'
      );
    console.log('🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻');
    this.channels.map(c=>c.printExecutedTasks());
  }

  printReportMultitask() {
    console.log('\n\n\n🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻 Execution Complete! 🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻');
    console.log('🍻 Executed ' + this.executedTasks.length + ' task(s) in ' +
      this.time + ' quantum(s) in ' +
      this.channels.length + ' channel(s). 🍻'
      );
    console.log('🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻');
    this.channels.map(c=>c.printExecutedTasks());
  }

  getTime() {
    return this.time;
  }

  getChannelsTaskExes() {
    if (this.channels.length > 1) {
      return this.channels.map(c=>c.getChannelExeQueue());
    } else {
      return [this.channels[0].getChannelExeQueue()];
    }
  }

  scheduleMonotask() {
    while(!this.executionFinished()) {
      console.log('\n\n🕐🕐🕐🕐🕐🕐 Time: ' + this.time + '🕐🕐🕐🕐🕐🕐🕐\n\n');
      this.queueArrivedTaks();

      while (this.tasksQueue.length > 0 && this.getFreeChannel() !== -1) {
        const freeChannelIdx = this.getFreeChannel();
        const nextTask = this.getNextTask(this.tasksQueue.map(t=>t.task), this.priorOrder);
        this.executeTask(this.tasksQueue[nextTask], freeChannelIdx);
      }
      this.increaseTime();
    }

    this.printReportMonotask();

    return this.getChannelsTaskExes();
  }

  scheduleMultitask() {
    while(!this.executionFinished()) {
      console.log('\n\n🕐🕐🕐🕐🕐🕐 Time: ' + this.time + '🕐🕐🕐🕐🕐🕐🕐\n\n');

      if (this.tasksQueue.length === 0) {
        this.tasksQueue = [ ...this.multitaskQueue ];
        this.multitaskQueue = [];
      }

      this.queueArrivedTaks();

      this.printExeQueue();

      while (this.tasksQueue.length > 0 && this.getFreeChannel() !== -1) {
        const freeChannelIdx = this.getFreeChannel();
        const nextTask = this.getNextTask(this.tasksQueue.map(t=>t.task), this.priorOrder);
        this.executeMultiTask(this.tasksQueue[nextTask], freeChannelIdx);
      }
      this.increaseTime();
    }

    this.printReportMultitask();

    return this.getChannelsTaskExes();
  }

  schedule() {
    this.printStarterConfig();
    if (this.multitask) {
      return this.scheduleMultitask();
    } else {
      return this.scheduleMonotask();
    }
  }
}

export default Scheduler;
