/** 
 * Population Class - holds one population
 * @param {String} series - 
 * @param {Number} m - 
 * @param {Number} num - 
 */ 

function Population(series, m, num) {

  this.population = []; // to hold all DNAs.
  this.matingPool = []; // arrayList which we will use for our "mating pool"
  this.generations = 0; // number of generations
  this.finished = false; // is the fitness funtion reaches the perfect score?
  this.mutationRate = m; // mutation rate
  this.perfectScore = series.length - 1; //higest value that fitness function can have
  this.series = series; // array of numbers entered by user
  this.best = ""; // to hold the best generation every generation

  //create DNAs with number of given input
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(); //create new DNA and store it
  }
  
  /** 
   * Function getBest - getter method for best expression
   */
  this.getBest = function() {
    return this.best;
  }

  /** 
   * Function isFinished - getter method for finished
   */
  this.isFinished = function() {
    return this.finished;
  }

  /** 
   * Function getGenerations - getter method for generations
   */
  this.getGenerations = function() {
    return this.generations;
  }
  
  /** 
   * Function calcFitness - to calculate fitness for all population
   */
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.series);
    }
  }

  this.calcFitness(); // call the function

  /** 
   * Function poolRate - to calculate the average fitness for the current population
   * @return {Number} average fitness
   */
  this.poolRate = function(fitness, start, end, start_, end_) {
    return fitness*((end_ - start_) / (end - start));
  }

  /** 
   * Function naturalSelection - to calculate the average fitness for the current population
   * @return {Number} average fitness
   */
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

  /** 
   * Function generate - to create a new generation from pool
   */
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

  /** 
   * Function evaluate - to compute the current "most fit" member of the population
   */
  this.evaluate = function() {
    var bestExpression = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > bestExpression) {
        index = i;
        bestExpression = this.population[i].fitness;
      }
    }

    // get the best expression of the current population and store it
    this.best = this.population[index].getExpression();

    // check if the current population has the best expression 
    if (bestExpression === this.perfectScore) {
      this.finished = true;
    }

  }

  /** 
   * Function getAverageFitness - to calculate the average fitness for the current population
   * @return {Number} average fitness
   */
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  /** 
   * Function allExpressions - to print all expressions in the current population
   * @return {String} expressions - all expressions
   */
  this.allExpressions = function() {
    
    var expressions = "";
    for (var i = 0; i < this.population.length; i++) {
      expressions += '<a class="list-group-item">' + this.population[i].getExpression() + '</a>';
    }
    return expressions;
  }

}

