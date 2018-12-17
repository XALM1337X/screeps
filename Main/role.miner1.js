Room.prototype.runMiner1 = function(creep) {
  var sources = [];
  var targetsTMP = [];

  for (let i = 0; i < this.memory.roomSourcesIDs.length; i++) {
    sources.push(Game.getObjectById(this.memory.roomSourcesIDs[i]));
  }
  if (this.memory.roomExtensionsIDs != null) {
    for (let i = 0; i < this.memory.roomExtensionsIDs.length; i++) {
			if (Game.getObjectById(this.memory.roomExtensionsIDs[i]).energy < Game.getObjectById(this.memory.roomExtensionsIDs[i]).energyCapacity) {
					targetsTMP.push(Game.getObjectById(this.memory.roomExtensionsIDs[i]));
			}
    }
  }
	if (this.memory.roomSpawnIDs != null) {
		for (let i = 0; i< this.memory.roomSpawnIDs.length; i++) {
			if (Game.getObjectById(this.memory.roomSpawnIDs[i]).energy < Game.getObjectById(this.memory.roomSpawnIDs[i]).energyCapacity) {
					targetsTMP.push(Game.getObjectById(this.memory.roomSpawnIDs[i]));
			}
		}
	}

	//TODO: Start right here with the overhaul.
  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_EXTENSION ||
        structure.structureType == STRUCTURE_SPAWN
      ) && structure.energy < structure.energyCapacity;

    }
  });

  //console.log(sourcestmp);
  var containers = creep.room.find(FIND_STRUCTURES, {
    filter: (i) => {
      return (i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE) && i.store[RESOURCE_ENERGY] < i.storeCapacity || i.energy < i.energyCapacity;
    }
  });
  var main_containers = creep.pos.findClosestByPath(containers);
  //console.log('miner1_container_search= '+containers[0]);

  if (creep.carry.energy < creep.carryCapacity) {
    creep.moveTo(sources[0]);
    creep.harvest(sources[0]);
  }

  if (creep.carry.energy == creep.carryCapacity) {
    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && targets[0].energy < targets[0].energyCapacity && containers == null) {
      creep.moveTo(targets[0]);

    } else { /////////////////
      if (creep.transfer(main_containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(main_containers);
      }
    }
  }
}
