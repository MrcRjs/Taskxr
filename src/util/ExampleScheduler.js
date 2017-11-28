import Scheduler from './Scheduler';
//import schConfig from './libs/multi';
//import schConfig from './single';
import schConfig from './example1';

let SCH = new Scheduler(schConfig);

console.log(JSON.stringify(SCH.schedule(),null,2));
