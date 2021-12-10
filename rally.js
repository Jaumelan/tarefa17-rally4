const values = {
    popular: {
        vmax: { min: 180, max: 200},
        vmin: { min: 110, max: 130},
        drift: { min: 0.03, max: 0.04}
    },
    sport: {
        vmax: { min: 195, max: 200 },
        vmin: { min: 125, max: 145 },
        drift: { min: 0.02, max: 0.03 }
    },
    superSport: {
        vmax: { min: 210, max: 230 },
        vmin: { min: 125, max: 145 },
        drift: { min: 0.01, max: 0.0175 }
    }
};

//carros
const fleet = [
    {racer: "Pedro",
    rarity: "",
    vmax: "",
    vmin: "",
    drift: "",
    experience: 0,
    level: 0
    },
    {racer: "Juca",
    rarity: "",
    vmax: "",
    vmin: "",
    drift: "",
    experience: 0,
    level: 0
    },
    {racer: "Edna", 
    rarity: "",
    vmax: "",
    vmin: "",
    drift: "",
    experience: 0,
    level: 0
    }
];

//dados para cada corrida
const corredores = {
    pedro: {
        vitorias: "",
        velocidade: ""
    },
    juca: {
        vitorias: "",
        velocidade: ""
    },
    edna: {
        vitorias: "",
        velocidade: ""
    }
};

//posições em cada corrida
const racePodium = {
    firstPlace: {player: "", points: "" },
    secondPlace: {player: "", points: "" },
    thirdPlace: {player: "", points: "" }
};

//tags
const write = {
    firstPlace: document.getElementById("first"),
    secondPlace: document.getElementById("second"),
    thirdPlace: document.getElementById("third"),
    pedroLevel: document.getElementById("pedroLevel"),
    jucaLevel: document.getElementById("jucaLevel"),
    ednaLevel: document.getElementById("ednaLevel")
};

//função para determinar a raridade
function determinarRaridade (arr) {
    let probabilidade = Math.random();
    if (probabilidade <= 0.6) {
        arr.rarity = "popular";
    } else if (probabilidade > 0.6 && probabilidade <= 0.95) {
        arr.rarity = "sport";
    } else {
        arr.rarity = "superSport";
    }
}

//função para gerar os valores máximos dos carros
function maxVelocity(array) {
    if (array.rarity === "popular") {
        array.vmax = Math.random()*( (values.popular.vmax.max*(1 + (array.level)/100)) - (values.popular.vmax.min*(1 + (array.level)/100)) ) + ( values.popular.vmax.min*(1 + (array.level)/100) );
    } else if (array.rarity === "sport") {
        array.vmax = Math.random()*(values.sport.vmax.max*(1 + (array.level)/100) - values.sport.vmax.min*(1 + (array.level)/100)) + values.sport.vmax.min*(1 + (array.level)/100);
    } else {
        array.vmax = Math.random()*(values.superSport.vmax.max*(1 + (array.level)/100) - values.superSport.vmax.min*(1 + (array.level)/100)) + values.superSport.vmax.min*(1 + (array.level)/100);
    }
}

//função para gerar os valores mínimos dos carros
function minVelocity(array) {
    if (array.rarity === "popular") {
        array.vmin = Math.random()*( (values.popular.vmin.max*(1 + (array.level)/100)) - (values.popular.vmin.min*(1 + (array.level)/100)) ) + ( values.popular.vmin.min*(1 + (array.level)/100) );
    } else if (array.rarity === "sport") {
        array.vmin = Math.random()*(values.sport.vmin.max*(1 + (array.level)/100) - values.sport.vmin.min*(1 + (array.level)/100)) + ( values.sport.vmin.min*(1 + (array.level)/100) );
    } else {
        array.vmin = Math.random()*(values.superSport.vmin.max*(1 + (array.level)/100) - values.superSport.vmin.min*(1 + (array.level)/100)) + values.superSport.vmin.min*(1 + (array.level)/100);
    }
}

//função para gerar os valores de derrapagem
function driftingValue(array) {
    if (array.rarity === "popular") {
        array.drift = Math.random()*( (values.popular.drift.max*(1 + (array.level)/100)) - (values.popular.drift.min*(1 + (array.level)/100)) ) + ( values.popular.drift.min*(1 + (array.level)/100) );
    } else if (array.rarity === "sport") {
        array.drift = Math.random()*(values.sport.drift.max*(1 + (array.level)/100) - values.sport.drift.min*(1 + (array.level)/100)) + ( values.sport.drift.min*(1 + (array.level)/100) );
    } else {
        array.drift = Math.random()*(values.superSport.drift.max*(1 + (array.level)/100) - values.superSport.drift.min*(1 + (array.level)/100)) + values.superSport.drift.min*(1 + (array.level)/100);
    }
}

//função para aumentar de nível 
function levelUp (arr) {
    if (arr.experience >= 450 && arr.level < 10) {
        arr.experience -= 450;
        arr.level ++
    }
    if (arr.level === 10) {
        arr.level = 10;
        arr.experience = 450;
    }
}

//função para assignar os pontos por posição no podium
function experience(position) {
    if (position.racer === racePodium.firstPlace.player ) {
        position.experience += Number(racePodium.firstPlace.points);
    } else if (position.racer === racePodium.secondPlace.player ) {
        position.experience += Number(racePodium.secondPlace.points);
    } else {
        position.experience += Number(racePodium.thirdPlace.points);
    }
}

// velocidade em cada volta
function velocity(min,max,derrapagem) {
    let vel = Math.random()*(max-min) + min;
    let velocidadeFinal = vel*(100 - derrapagem);
    return velocidadeFinal;
}

//funçao para determinar o vencedor de cada tipo de Corridas
function corridas(iteracao) {
    corredores.pedro.vitorias = 0;
    corredores.juca.vitorias = 0;
    corredores.edna.vitorias = 0;
    fleet.forEach(determinarRaridade)
    fleet.forEach(maxVelocity)
    fleet.forEach(minVelocity)
    fleet.forEach(driftingValue)

    for (let i = 0; i <= iteracao; i++) {
        corredores.pedro.velocidade = velocity ( fleet[0].vmin , fleet[0].vmax , fleet[0].drift );
        corredores.juca.velocidade = velocity ( fleet[1].vmin , fleet[1].vmax , fleet[1].drift );
        corredores.edna.velocidade = velocity ( fleet[2].vmin , fleet[2].vmax , fleet[2].drift );
        let volta = [corredores.pedro.velocidade , corredores.juca.velocidade, corredores.edna.velocidade];
        let resultadoVolta = volta.sort((a,b) => b - a);
        if (resultadoVolta[0] === corredores.pedro.velocidade) {
            corredores.pedro.vitorias += 1;
        } else if (resultadoVolta[0] === corredores.juca.velocidade) {
            corredores.juca.vitorias += 1;
        } else {
            corredores.edna.vitorias += 1;
        }
    }

    let valoresFinais = [corredores.pedro.vitorias, corredores.juca.vitorias, corredores.edna.vitorias];
    let resultado = valoresFinais.sort(( a, b) => b - a);
    
    if (resultado[0] === corredores.pedro.vitorias) {
        racePodium.firstPlace.player = "Pedro";
        racePodium.firstPlace.points = 200;
    } else if (resultado[0] === corredores.juca.vitorias) {
        racePodium.firstPlace.player = "Juca";
        racePodium.firstPlace.points = 200;
    } else {
        racePodium.firstPlace.player = "Edna";
        racePodium.firstPlace.points = 200;
    }

    if (resultado[1] === corredores.pedro.vitorias) {
        racePodium.secondPlace.player = "Pedro";
        racePodium.secondPlace.points = 120;
    } else if (resultado[1] === corredores.juca.vitorias) {
        racePodium.secondPlace.player = "Juca";
        racePodium.secondPlace.points = 120;
    } else {
        racePodium.secondPlace.player = "Edna";
        racePodium.secondPlace.points = 120;
    }

    if (resultado[2] === corredores.pedro.vitorias) {
        racePodium.thirdPlace.player = "Pedro";
        racePodium.thirdPlace.points = 50;
    } else if (resultado[2] === corredores.juca.vitorias) {
        racePodium.thirdPlace.player = "Juca";
        racePodium.thirdPlace.points = 50;
    } else {
        racePodium.thirdPlace.player = "Edna";
        racePodium.thirdPlace.points = 50;
    }

    fleet.forEach(experience)
    
    write.firstPlace.innerHTML = racePodium.firstPlace.player;
    write.secondPlace.innerHTML = racePodium.secondPlace.player;
    write.thirdPlace.innerHTML = racePodium.thirdPlace.player;
}

function upar() {
    fleet.forEach(levelUp)
    write.pedroLevel.innerHTML = fleet[0].level;
    write.jucaLevel.innerHTML = fleet[1].level;
    write.ednaLevel.innerHTML = fleet[2].level;
}
