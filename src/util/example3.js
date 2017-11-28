export default {
  channels: 1,
  multitask: true,
  tasks: [
    { arriveT: 0, exeT: 3, priority: 0 },
    { arriveT: 0, exeT: 3, priority: 1 },
    { arriveT: 1, exeT: 2, priority: 2 },
    { arriveT: 2, exeT: 1, priority: 3 },
    { arriveT: 1, exeT: 1, priority: 0 },
    { arriveT: 0, exeT: 2, priority: 0 },
    { arriveT: 1, exeT: 2, priority: 1 }
  ],
  priorOrder: ['exeT-','priority+', 'pid+']
};
