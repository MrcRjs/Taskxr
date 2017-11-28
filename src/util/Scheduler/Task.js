class Task {
  constructor(pid, exeT, arriveT, priority) {
    this.pid = pid;
    this.exeT = exeT;
    this.priority = priority || 0;
    this.arriveT = arriveT;
    this.exeTimeLeft = exeT;
  }

  getPid() {
    return this.pid;
  }

  getExeT() {
    return this.exeT;
  }

  getArriveT() {
    return this.arriveT;
  }

  getPriority() {
    return this.priority;
  }

  setPid(pid) {
    this.pid = pid;
  }

  setExeT(exeT) {
    this.exeT = exeT;
  }

  setArriveT(arriveT) {
    this.arriveT = arriveT;
  }

  setPriorityT(priority) {
    this.priority = priority;
  }

  getExeTimeLeft() {
    return this.exeTimeLeft;
  }

  decExeTaskTime() {
    this.exeTimeLeft--;
  }

  printTask() {
    console.log('PID: %d Exe.T: %d ArriveT: %d Prior: %d exeL: %d',
      this.pid, this.exeT, this.arriveT, this.priority, this.exeTimeLeft );
  }

}

export default Task;
