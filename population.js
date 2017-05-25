function Population(series, m, num) {

  this.population; // to hold all population
  this.matingPool;                   // ArrayList which we will use for our "mating pool"
  this.generations = 0; // number of generations
  this.finished = false; // is the fitness funtion reaches the perfect score?
  this.mutationRate = m; // mutation rate
  this.perfectScore = series.length - 1; //higest value that fitness function can have
  this.series = series; // array of numbers entered by user

  this.best = ""; // to hold the best generation every generation

  this.population = [];
  for (var i = 0; i < num; i++) {
    
    this.population[i] = new DNA(); // create new DNA and store it

  }
  
  this.matingPool = [];
  
  //calculate fitness for all population
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.series);
    }
  }
  this.calcFitness(); // call the function

  this.poolRate = function(fitness, start, end, start_, end_) {
    return fitness*((end_ - start_) / (end - start));
  }

  this.naturalSelection = function() {

    this.matingPool = [];

    //calculate the max fitness in the population
    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    //push members with mostly highest fitness value to mating pool 
    for (var i = 0; i < this.population.length; i++) {
      var fitness = this.poolRate(this.population[i].fitness,0,maxFitness,0,1);
      var n = Math.floor(fitness * 100);
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }

  }

  //create a new generation from pool
  this.generate = function() {
    for (var i = 0; i < this.population.length; i++) {
      var partnerA = this.matingPool[Math.floor(Math.random()*this.matingPool.length)]; //this.matingPool[a];
      var partnerB = this.matingPool[Math.floor(Math.random()*this.matingPool.length)]; //this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }


  this.getBest = function() {
    return this.best;
  }

  // Compute the current "most fit" member of the population
  this.evaluate = function() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best_a = this.population[index].genes[0];
    this.best_b = this.population[index].genes[1];
    this.best_c = this.population[index].genes[2];

    this.best = this.population[index].getExpression();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  this.isFinished = function() {
    return this.finished;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  //calculate the average fitness for the current population
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  //to print all expressions in the current population
  this.allExpressions = function() {
    
    var expressions = "";
    for (var i = 0; i < this.population.length; i++) {
      expressions += '<a class="list-group-item">' + this.population[i].getExpression() + '</a>';
    }
    return expressions;
  }
}

