/** 
 * Function newCoefficient - to create new coefficient for the expression
 * @return {Number} coefficient
 */ 
function newCoefficient() {
  return Math.floor((Math.random() * 100));
}

/** 
 * DNA Class - holds one DNA
 */ 
function DNA() {

  this.genes = []; // to hold all genes # ax^2 + bx + c => a,b,c are genes
  this.fitness = 0; // to hold fitness for this DNA

  // create new coefficient for all genes
  for (var i = 0; i < 3; i++) { 
    this.genes[i] = newCoefficient(); 
  }

  /** 
   * Function getExpression - to convert coefficients to string expression # a*(x**2) + b*x + c
   * @return {String} expression 
   */
  this.getExpression = function() {
    return this.genes[0] + "*(x**2) + " + this.genes[1] + "*x + " + this.genes[2];
  }

  /** 
   * Function calcFitness - to calculate the fitness function
   * @param {String} series - given series in the beginning of the program # ex: 1,2,3,4,5
   */
  this.calcFitness = function(series) {
    var score = 0;
    var x, k, y;
    for(var i = 0; i < series.length - 1; i++) {
      x = series[i];
      y = series[i+1];
      k = (this.genes[0] * (x**2) + this.genes[1] * x + this.genes[2]);
      if(y > k) score += 1 - Math.abs(1-(k/y));
      else score += 1 - Math.abs(1-(y/k));
    }
    this.fitness = score;
  }

  /** 
   * Function crossover - to crossover two DNAs
   * @param {DNA} partner - the DNA object which will be used for the crossover
   * @return {DNA} child
   */
  this.crossover = function(partner) {
    
    var child = new DNA(); // create a new DNA
    var midpoint = Math.floor(Math.random(this.genes.length)); // pick a midpoint
    
    // get half from one DNA and half from the other DNA object, merge them to create new one
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else              child.genes[i] = partner.genes[i];
    }
    return child;
  }

  /** 
   * Function mutate - based on a mutation probability given in the beginning, picks a new random character
   * @param {Number} mutationRate - mutation rate given in the beginning of the program # ex: 5
   */
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random(1) < mutationRate) {
        this.genes[i] = newCoefficient(); // generate new coefficient
      }
    }
  }
}
