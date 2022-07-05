const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it('constructor sets position and default values for mode and generatorWatts.', function() {
    const newRover = new Rover('earth');
    expect(newRover.position).toEqual('earth');
    expect(newRover.mode).toEqual('NORMAL');
    expect(newRover.generatorWatts).toEqual(110);
  });
  
  it('response returned by receiveMessage contains name of message', function() {
    const newRover = new Rover();
    const myMessage = new Message('Name of message');
    expect(newRover.receiveMessage(myMessage).message).toEqual('Name of message');
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    const myCommand1 = new Command('AAA');
    const myCommand2 = new Command('BAA', 'Heck');
    const myMessage = new Message('Is this an array?', [myCommand1, myCommand2]);
    const newRover = new Rover();   
    const messageResult = newRover.receiveMessage(myMessage);
    expect(messageResult.results.length).toEqual(2);
  });

  it('responds correctly to status check command', function() {
    const myCommand = new Command('STATUS_CHECK');
    const myMessage = new Message('Status', [myCommand]);
    const newRover = new Rover(87382098);
    const messageResult = newRover.receiveMessage(myMessage);
    expect(messageResult.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(messageResult.results[0].roverStatus.generatorWatts).toEqual(110);   
    expect(messageResult.results[0].roverStatus.position).toEqual(87382098); 
    expect(messageResult.results[0].completed).toBeTruthy();    
  });

  it('responds correctly to mode change command', function() {
    const myCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    const myMessage = new Message('Status', [myCommand]);
    const myRover = new Rover();
    const messageResult = myRover.receiveMessage(myMessage);
    expect(myRover.mode).toEqual('LOW_POWER');
    expect(messageResult.results[0].completed).toBeTruthy(); 
  });

  it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
    const modeChangeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    const moveCommand = new Command('MOVE', 150);
    const myMessage = new Message('Status', [modeChangeCommand, moveCommand]);
    const myRover = new Rover();
    const messageResult = myRover.receiveMessage(myMessage);  
    expect(messageResult.results[0].completed).toBeTruthy();
    expect(messageResult.results[1].completed).toBeFalsy();    
  });

  it('responds with position for move command', function() {
    const moveCommand = new Command('MOVE', 150);
    const myMessage = new Message('Status', [moveCommand]);
    const myRover = new Rover();
    const messageResult = myRover.receiveMessage(myMessage); 
    expect(messageResult.results[0].completed).toBeTruthy();
    expect(myRover.position).toEqual(150);
  });
  
});
