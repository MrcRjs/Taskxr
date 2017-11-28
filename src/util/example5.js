export default {
  channels: 2,
  multitask: true,
  tasks: [
    { arriveT: 0, exeT: 3, priority: 0 },
    { arriveT: 0, exeT: 3, priority: 1 },
    { arriveT: 0, exeT: 2, priority: 1 },
    { arriveT: 0, exeT: 2, priority: 2 },
    { arriveT: 4, exeT: 3, priority: 0 },
    { arriveT: 5, exeT: 3, priority: 1 },
    { arriveT: 6, exeT: 2, priority: 0 },
    { arriveT: 7, exeT: 2, priority: 1 }
  ],
  priorOrder: ['exeT+','priority+', 'pid-']
};
