const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
  it('throws error if a name is NOT passed into the constructor as the first parameter', function() {
    expect( function() { new Message();}).toThrow(new Error('Name required.'));    
  });
  it('constructor sets name', function() {
    const myMessage = new Message('bongocat');
    expect(myMessage.name).toEqual('bongocat');
  });  
  it('contains a commands array passed into the constructor as 2nd argument', function() {
    const myCommand1 = new Command('AAA');
    const myCommand2 = new Command('BAA', 'Heck');
    const myMessage = new Message('Is this an array?', [myCommand1, myCommand2]);
    expect(myMessage.commands).toEqual([myCommand1, myCommand2]);
  });
});
