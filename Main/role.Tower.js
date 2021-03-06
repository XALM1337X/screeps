Room.prototype.runTower = function(tower) {
  //console.log("Tower: "+tower);
  var repTarget = [];
  var hostileCreeps = [];
  if (this.memory.roomRoadsIDs != null) {
    for (let i = 0; i < this.memory.roomRoadsIDs.length; i++) {
      if (Game.getObjectById(this.memory.roomRoadsIDs[i]).hits < Game.getObjectById(this.memory.roomRoadsIDs[i]).hitsMax) {
        repTarget.push(Game.getObjectById(this.memory.roomRoadsIDs[i]));
      }
    }
  }
  if (this.memory.roomContainersIDs != null) {
    for (let i = 0; i < this.memory.roomContainersIDs.length; i++) {
      if (Game.getObjectById(this.memory.roomContainersIDs[i]).hits < Game.getObjectById(this.memory.roomContainersIDs[i]).hitsMax) {
        repTarget.push(Game.getObjectById(this.memory.roomContainersIDs[i]));
      }
    }
  }

  if (this.roomStorageID != null) {
    if (Game.getObjectById(this.roomStorageID).hits < Game.getObjectById(this.roomStorageID).hitsMax) {
      repTarget.push(Game.getObjectById(this.roomStorageID));
    }
  }
  if (this.memory.roomEnemyCreepsIDs != null) {
    for (let i = 0; i < this.memory.roomEnemyCreepsIDs.length; i++) {
      if (Game.getObjectById(this.memory.roomEnemyCreepsIDs[i]) != null) {
        hostileCreeps.push(Game.getObjectById(this.memory.roomEnemyCreepsIDs[i]));
      }
    }
  }

  var closestHostile = tower.room.find(FIND_HOSTILE_CREEPS);
	//console.log(closestHostile);
  if (closestHostile[0] != undefined) {
    tower.attack(tower.pos.findClosestByRange(closestHostile));
  } else {
    var closestDamagedStructure = tower.pos.findClosestByRange(repTarget);
    if (closestDamagedStructure != null) {
      tower.repair(closestDamagedStructure);
    }
  }
} ////
