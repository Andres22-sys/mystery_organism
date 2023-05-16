// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//factory function pAequorFactory() with two parameters: number and array of DNA bases
const pAequorFactory = (specimenNum , dna) => {
  //return object with properties specimenNum and dna
  return {
    specimenNum: specimenNum,
    dna: dna,

    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },

    compareDNA(pAequor) {
      let commonBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          commonBases++;
        }
      }
      const percentage = (commonBases / this.dna.length) * 100;
      console.log(`Specimen ${this.specimenNum} and Specimen ${pAequor.specimenNum} have ${percentage}% DNA in common.`);
    },

    willLikelySurvive() {
      const countCG = this.dna.filter(base => base === 'C' || base === 'G').length;
      const percentageCG = (countCG / this.dna.length) * 100;
      return percentageCG >= 60;
    },

    complementStrand() {
      const complementaryStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'A') {
          complementaryStrand.push('T');
        } else if (this.dna[i] === 'T') {
          complementaryStrand.push('A');
        } else if (this.dna[i] === 'C') {
          complementaryStrand.push('G');
        } else if (this.dna[i] === 'G') {
          complementaryStrand.push('C');
        }
      }
      return complementaryStrand;
    }
  }
};

// Function to create 30 instances of pAequor that can survive
const create30SurvivingInstances = () => {
  const pAequorInstances = [];
  let specimenNum = 1;
  while (pAequorInstances.length < 30) {
    const dna = mockUpStrand();
    const pAequor = pAequorFactory(specimenNum, dna);
    if (pAequor.willLikelySurvive()) {
      pAequorInstances.push(pAequor);
      specimenNum++;
    }
  }
  return pAequorInstances;
};

// Create 30 instances of pAequor that can survive
const survivingInstances = create30SurvivingInstances();
console.log(survivingInstances);

//Test mutate method
console.log('Test mutate method: ');
const pAequor = pAequorFactory(1, mockUpStrand());
console.log(pAequor.dna);
console.log(pAequor.mutate());

//Test compareDNA method
console.log('\nTest compareDNA method: ');
const pAequor1 = pAequorFactory(1, mockUpStrand());
const pAequor2 = pAequorFactory(2, mockUpStrand());
pAequor1.compareDNA(pAequor2);

//Test willLikelySurvive method
console.log('\nTest willLikelySurvive method: ');
const pAequor3 = pAequorFactory(3, mockUpStrand());
console.log(pAequor3.willLikelySurvive());

//Test complementStrand method
console.log('\nTest complementStrand method: ');
const pAequor4 = pAequorFactory(4, mockUpStrand());
console.log(pAequor4.dna);
console.log(pAequor4.complementStrand());
