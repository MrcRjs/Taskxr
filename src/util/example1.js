export default {
  channels: 2,
  tasks: [
    { arriveT: 0, exeT: 2, priority: 0 },
    { arriveT: 0, exeT: 2, priority: 0 },
    { arriveT: 0, exeT: 2, priority: 1 },
    { arriveT: 4, exeT: 1, priority: 1 },
    { arriveT: 4, exeT: 2, priority: 0 },
    { arriveT: 4, exeT: 2, priority: 0 },
    { arriveT: 8, exeT: 3, priority: 1 },
    { arriveT: 8, exeT: 3, priority: 1 },
    { arriveT: 8, exeT: 1, priority: 0 },
    { arriveT: 9, exeT: 1, priority: 1 },
    { arriveT: 9, exeT: 1, priority: 2 }
  ],
  priorOrder: ['priority-','exeT+', 'pid-']
};
