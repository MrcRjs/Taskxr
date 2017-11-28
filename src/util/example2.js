export default {
  channels: 3,
  multitask: true,
  tasks: [
    { arriveT: 0, exeT: 3, priority: 0 },
    { arriveT: 5, exeT: 3, priority: 2 },
    { arriveT: 0, exeT: 2, priority: 2 },
    { arriveT: 5, exeT: 3, priority: 0 },
    { arriveT: 0, exeT: 2, priority: 2 },
    { arriveT: 6, exeT: 2, priority: 0 },
    { arriveT: 7, exeT: 2, priority: 2 },
    { arriveT: 0, exeT: 3, priority: 0 },
    { arriveT: 8, exeT: 1, priority: 1 },
    { arriveT: 4, exeT: 1, priority: 0 },
    { arriveT: 4, exeT: 1, priority: 1 }
  ],
  priorOrder: ['priority+' ,'exeT-', 'pid-']
};
