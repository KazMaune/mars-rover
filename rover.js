class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    const results = [];
    if(message.commands) {
      for(let i = 0; i < message.commands.length; i++) {
        const command = message.commands[i];

        let result = {
          completed: false
        };
        
        if(command.commandType === 'MOVE') {
          if(this.mode !== 'LOW_POWER') {
            this.position = command.value;
            result = {
              completed: true
            }            
          }
        }
          
        else if(command.commandType === 'STATUS_CHECK') {
          result = {
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          }
        }
          
        else if(command.commandType === 'MODE_CHANGE') {
          if(command.value === 'LOW_POWER' || command.value === 'NORMAL') {
            this.mode = command.value;
            result = {
              completed: true
            }              
          }
        }
        
        results.push(result);
      }      
    }
    return {
      message: message.name,
      results
    };
  }
}

module.exports = Rover;