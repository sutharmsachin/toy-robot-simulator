 

const directions = {
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
};


export default class RobotService {

     placed: any;
     x : number;
     y : number;
     facing : string;
     
    constructor() { 
       
    }

    
  /*
     * Public methods
     * --------------------*/

    /**
     * Place the robot at specified location and orientation
     * @param {number} x - The x coordinate of the robot
     * @param {number} y - The y coordinate of the robot
     * @param {string} facing - The direction the robot is facing
     * @return {object} The robot
     */
     place(x, y, facing,renderCallback)   {
       
        if (this._isValidPosition(x) && this._isValidPosition(y)) {
            this.x = x;
            this.y = y;
        } else {
             
            throw new Error();
        }
  
        if (this._isValidDirection(facing)) {
            this.facing = facing.toUpperCase();
        } else {
            
            throw new Error('Supplied invalid direction');
        }
  
        // Robot is now placed!
        this.placed = true;
        if (renderCallback) renderCallback(this);
        return this;
    }
  
    /**
     * Remove the robot from the table
     * @return {object} The robot
     */
    remove(renderCallback) {
        this.placed = false;
        if (renderCallback) renderCallback(this);
        return this;
    }
  
    /**
     * Log the current robot information
     * @return {Robot} The robot
     */
    report() {
        if (!this.placed) {
            console.log('I\'m not on the table! use .place(x, y, direction) to place me.');
        } else {
            console.log(`${this.x}, ${this.y}, ${this.facing.toUpperCase()}`);
        }
        return this;
    }
  
    /**
     * Move the robot in the direction it's facing
     * @return {Robot} The robot
     */
    move(renderCallback) {
        if (this.placed) {
            if (this.facing === directions.NORTH) {
                if (this._isValidPosition(this.y + 1)) this.y = this.y + 1;
            }
  
            else if (this.facing === directions.SOUTH) {
                if (this._isValidPosition(this.y - 1)) this.y = this.y - 1;
            }
  
            else if (this.facing === directions.EAST) {
                if (this._isValidPosition(this.x + 1)) this.x = this.x + 1;
            }
  
            else if (this.facing === directions.WEST) {
                if (this._isValidPosition(this.x - 1)) this.x = this.x - 1;
            }
        } else {
            this.report();
        }
  
        if (renderCallback) renderCallback(this);
        return this;
    }
  
    /**
     * Rotate the robot left
     * @return {Robot} The robot
     */
    left(renderCallback) {
        if (this.placed) {
            if (this.facing === directions.NORTH) {
                this.facing = directions.WEST;
            }
  
            else if (this.facing === directions.WEST) {
                this.facing = directions.SOUTH;
            }
  
            else if (this.facing === directions.SOUTH) {
                this.facing = directions.EAST;
            }
  
            else if (this.facing === directions.EAST) {
                this.facing = directions.NORTH;
            }
        } else {
            this.report();
        }
  
        if (renderCallback) renderCallback(this);
        return this;
    }
  
    /**
     * Rotate the robot right
     * @return {Robot} The robot
     */
    right(renderCallback) {
        if (this.placed) {
            if (this.facing === directions.NORTH) {
                this.facing = directions.EAST;
            }
  
            else if (this.facing === directions.EAST) {
                this.facing = directions.SOUTH;
            }
  
            else if (this.facing === directions.SOUTH) {
                this.facing = directions.WEST;
            }
  
            else if (this.facing === directions.WEST) {
                this.facing = directions.NORTH;
            }
  
        } else {
            this.report();
        }
  
        if (renderCallback) renderCallback(this);
        return this;
    }
  
    /*
     * Private methods
     * --------------------*/
  
    /**
     * Check if the supplied position is valid
     * @private
     * @param {number} value - The x or y coordinate for checking.
     * @return {boolean} Is valid position
     */
    _isValidPosition(value) {
        if (value <= 4 && value >= 0) {
            return true;
        } else {
            console.log(`Invalid move when facing ${this.facing}, try turning around!`);
        }
    }
  
    /**
     * Check if the supplied facing direction is valid
     * @private
     * @param {string} str - The direction string for checking
     * @return {boolean} Is valid direction
     */
    _isValidDirection(str) {
        return /(north|south|east|west)/gi.test(str);
    }


}