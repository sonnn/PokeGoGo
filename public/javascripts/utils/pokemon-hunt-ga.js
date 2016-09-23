const _ = require('lodash');

export class Chromosome {
  constructor(pokeMonSequence, directions) {
    // pokemon catch sequence
    this.sequence = pokeMonSequence;
    // directions refs for distanace ref between pokemons
    this.directions = directions;

    this.cost = Infinity;
  }

  calculateCost() {
    let result = 0;

    for (let i = 0; i < this.sequence.length - 1; i++) {
      const orgi = this.sequence[i];
      const dest = this.sequence[i + 1];
      const dist = this.getDistance(orgi, dest).distance.value;

      result += dist;
    }

    this.cost = result;
  }

  getAllSteps() {
    let result = [];

    for (let i = 0; i < this.sequence.length - 1; i++) {
      const orgi = this.sequence[i];
      const dest = this.sequence[i + 1];
      const minLeg = this.getDistance(orgi, dest);
      result = result.concat(minLeg.steps);
    }

    return result;
  }

  getDistance(origin, destination) {
    const path = this.getRoute(origin, destination);
    const { routes } = path.direction;
    const minLeg = _.minBy(routes[0].legs, 'distance.value');
    return minLeg;
  }

  getRoute(origin, destination) {
    const found = _.find(this.directions, f => (
      (f.origin.a === origin.a && f.origin.o === origin.o
        && f.destination.a === destination.a && f.destination.o === destination.o)
      || (f.destination.a === origin.a && f.destination.a === origin.a
        && f.origin.a === destination.a && f.origin.o === destination.o)
    ));
    return found;
  }

  random() {
    const clone = _.cloneDeep(this.sequence);
    const newSequence = [];

    while (clone.length > 0) {
      const rand = _.random(0, clone.length - 1);
      const remove = clone.splice(rand, 1);
      newSequence.push(remove[0]);
    }
    this.sequence = newSequence;
  }

  crossOver(otherChromosome) {
    const clone = _.cloneDeep(this.sequence);
    let newSequence = clone.splice(0, ~~(this.sequence.length / 2));
    const result = [];

    otherChromosome.sequence.forEach(pk => {
      const found = _.find(newSequence, f => f.o === pk.o && f.a === pk.a && f.i === pk.i);
      if (!found) newSequence.push(pk);
    });

    result.push(new Chromosome(newSequence, this.directions));

    newSequence = otherChromosome.sequence.splice(0, ~~(this.sequence.length / 2));

    this.sequence.forEach(pk => {
      const found = _.find(newSequence, f => f.o === pk.o && f.a === pk.a && f.i === pk.i);
      if (!found) newSequence.push(pk);
    });

    result.push(new Chromosome(newSequence, this.directions));

    return result;
  }

  mutation() {
    const clone = _.cloneDeep(this.sequence);
    const randomIndex = ~~(Math.random() * clone.length);
    let anotherRandomIndex = ~~(Math.random() * clone.length);

    if (anotherRandomIndex === randomIndex) {
      anotherRandomIndex = ~~(Math.random() * clone.length);
    }

    const tmp = _.cloneDeep(clone[randomIndex]);
    clone[randomIndex] = clone[anotherRandomIndex];
    clone[anotherRandomIndex] = tmp;
    this.sequence = clone;
  }

  printSequence() {
    console.log(this.sequence.map(x => `${x.a},${x.o}`).join(' => ')); // eslint-disable-line
  }
}


export class PokemonHuntGA {
  constructor(
    pokemons, directions, maxGenerationCount = 100,
    mutationRate = 0.5, crossOverRate = 0.5, populationSize = 10
  ) {
    this.directions = directions;
    this.pokemons = pokemons;

    this.generationCount = 0;
    this.maxGenerationCount = maxGenerationCount;

    this.mutationRate = mutationRate;
    this.crossOverRate = crossOverRate;
    this.populationSize = populationSize;
    this.population = [];
    this.min = { cost: Infinity };

    this.results = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.populationSize; i++) {
      const chromosome = new Chromosome(this.pokemons, this.directions);
      chromosome.random();
      chromosome.calculateCost();
      this.population.push(chromosome);
    }
    this.doSort();
  }

  doSort() {
    this.population = this.population.sort((a, b) => b.cost - a.cost);
  }

  doCrossOver() {
    const newOffStrings = this.population[0].crossOver(this.population[1]);
    this.population[0] = newOffStrings[0];
    this.population[1] = newOffStrings[1];
  }

  doMutate() {
    this.population.forEach(chromosome => {
      chromosome.mutation();
      chromosome.calculateCost();
    });
  }

  doEvaluate() {
    if (this.population[0].cost < this.min.cost) {
      this.min = _.cloneDeep(this.population[0]);
      this.results.push(_.cloneDeep(this.population[0]));
    }
  }

  generatePopulation() {
    while (this.generationCount < this.maxGenerationCount) {
      console.log(`Generation ${this.generationCount + 1}`); // eslint-disable-line
      this.doCrossOver();
      this.doMutate();
      this.doSort();
      this.doEvaluate();
      this.generationCount++;
    }
    return this.results;
  }
}
