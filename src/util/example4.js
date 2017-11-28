export default {
  channels: 4,
  multitask: false,
  tasks: [
    { arriveT: 3, exeT: 2, priority: 0 },
    { arriveT: 3, exeT: 3, priority: 1 },
    { arriveT: 4, exeT: 1, priority: 2 },
    { arriveT: 3, exeT: 2, priority: 2 },
    { arriveT: 5, exeT: 3, priority: 1 },
    { arriveT: 3, exeT: 1, priority: 0 },
    { arriveT: 2, exeT: 3, priority: 1 },
    { arriveT: 5, exeT: 3, priority: 2 },
    { arriveT: 6, exeT: 2, priority: 1 },
    { arriveT: 7, exeT: 2, priority: 2 },
    { arriveT: 6, exeT: 3, priority: 0 },
    { arriveT: 6, exeT: 1, priority: 0 },
    { arriveT: 7, exeT: 1, priority: 1 }
  ],
  priorOrder: ['priority+','exeT+', 'pid+']
};
