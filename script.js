function toPlaces(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}
function toTitleCase(str) {
    var words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

var normalisations = {
    // to KGs
    mass: {
        kilograms: 1,
        grams: 1/1000,
        tonnes: 1000,
        pounds: 0.45,
        ounce: 0.02835,
    },
    // to Meters
    length: {
        meters: 1,
        centimeters: 0.01,
        inches: 0.0254,
        feet: 0.3048,
        miles: 1609.34,
        nautical_miles: 1852,
        yards: 0.9144,
    },
    // to M^3
    volume: {
        cubic_meters: 1,
        litres: 0.001,
        us_gallons: 0.004,
        us_pints: 0.0005,
        cubic_centimeters: 0.000001
    },
    // to Watts
    power: {
        watt: 1,
        kilowatt: 1000,
        horsepower: 735.5
    },
    // to M/s
    speed: {
        "m/s": 1,
        "km/h": 0.277778,
        "ft/s": 0.3048,
        "mph": 0.44704,
        "knots": 0.514444,
        "c": 299792458,
        "percent_c": 2997924.58,
        "mach": 340.3
    },
    // to N
    force: {
        newtons: 1,
        kilonewtons: 1000,
        dynes: 10e-5,
    },
    // to m^2
    area: {
        square_meters: 1,
        square_kilometers: 1e+6,
        square_miles: 2.59e+6,
        square_yards: 0.836127,
        square_foot: 0.092903,
        square_inches: 0.00064516,
        hectares: 10000,
        acres: 4046.86,
    },
    /* to M/s^2
    acceleration: {
        "m/s^2": 1,
        "ft/s^2": 0.3048,
        "cm/s^2": 0.01,
        "gal": 0.01,
        "g": 9.80665,
    }, */
}

/* var units = {
    mass: ['Kilograms', 'Grams', 'Tonnes', 'Pounds', 'Ounce'],
    length: ['Meters', 'Centimeters', 'Inches', 'Feet', 'Miles', 'Nautical Miles', 'Yards'],
    volume: ['Cubic Meters', 'Litres', 'US Gallons', 'US Pints', 'Cubic Centimeters'],
    power: ['Watt', 'Kilowatt', 'Horsepower'],
    speed: ['m/s', 'km/h', 'ft/s', 'mph', 'Knots', 'C', 'Percent C', 'Mach'],
    force: ['Newtons', 'Kilonewtons', 'Dynes'],
    acceleration: ['Newtons', 'Kilonewtons', 'Dynes'],
    //pressure
} */

var units = {}
Object.keys(normalisations).forEach(e => {
    units[e] = (Object.keys(normalisations[e]).map(e => toTitleCase(e.replaceAll('_', ' '))))
})

var measurements = []
Object.keys(units).forEach(e => {
    measurements.push(toTitleCase(e))
});

var comparisons = { // Unless stated otherwise, assume all values to come from the Order of Magnitude pages on Wikipedia
    mass: {
        "maize pollen grains": 2.5e-10, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass)
        "grains of sand": 2.5e-6,
        "houseflies": 2e-5,
        "cubic centimeters of water": 1e-3,
        "oranges": 0.15,
        "hamburgers": 0.24, // https://www.mcdonalds.com/gb/en-gb/help/faq/what-s-the-average-weight-in-grams-of-a-big-mac.html
        "ostrich eggs": 1.36, // https://nationalzoo.si.edu/animals/news/how-fast-ostrich-and-more-fun-facts
        "newborn babies": 3.2, // https://www.urmc.rochester.edu/encyclopedia/content.aspx?contenttypeid=90&contentid=P02673
        "cats": 4.5, // https://en.wikipedia.org/wiki/Cat
        "adult human males": 70, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass)
        "dairy cows": 750, // https://eol.org/pages/328699/data?predicate_id=1456
        "small cars": 1200, // https://www.consumeraffairs.com/automotive/average-car-weight.html
        "large cars": 2000,
        "adult african elephants": 5400, // https://tsavotrust.org/how-much-does-an-elephant-weigh/
        "ENIAC computers": 2.7e+4, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass)
        "blue whales": 1.8e+5,
        "International Space Stations": 4.2e+5,
        "Virginia-class nuclear submarine": 7.8e+6,
        "fully-loaded Titanic ships": 5.2e+7,
        "pyramids": 6e+9,
        "Ayers Rock's": 1.425e+12,
        "Mount Everest's": 8.1e+14,
        "Hyperions(Saturn's moon)": 5.6e+18,
        "Plutos": 1.3e+22,
        "Moons": 7.3e+22,
        "Earths": 6.0e+24,
        "jupiters": 1.9e+27, // https://en.wikipedia.org/wiki/List_of_unusual_units_of_measurement#Jupiter
        "suns": 2e+30, // https://en.wikipedia.org/wiki/Solar_mass
        "Milky Way galaxies": 1.2e+42, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass)
        "cubic parsecs of water": 2.94e+55,
        "times the mass of the observable universe": 4.4506e+52,
    },
    length: {
        "Hydrogen atoms": 5.3e-11, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
        "water molecules": 2.8e-8,
        "bacteria": 2e-6,
        "red blood cells": 7e-6,
        "times the width of a human hair strand": 0.0001, // https://www.columbiatribune.com/story/lifestyle/family/2016/08/10/q-how-thin-is-human/21830395007/
        "pinhead diameters": 0.001, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
        "pixels": 0.00034,
        "bananas": 0.19, // https://worldmetrics.org/average-length-of-a-banana-statistics/
        "times the width of an adult finger": 0.2, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
        "washing machines": 0.8,
        "adult male humans": 1.7526, // https://www.medicinenet.com/height_men/article.htm
        "adult male crocodiles": 3.4, // https://nationalzoo.si.edu/animals/american-alligator
        "times the height of the Statue of Liberty": 93.47, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
        "American football fields": 105,
        "rugby league pitches": 122,
        "Mount Everest's": 8848,
        "times the distance that one is 'within earshot'": 9986,
        "Marathons": 42195,
        "times the diameter of the Moon": 3.48e+6,
        "times the length of the Great Wall of China": 6.4e+6,
        "times Earth's equator": 4e+7,
        "light seconds": 3e+8,
        "times the diameter of the Sun": 1.39e+9,
        "light minutes": 1.8e+10,
        "Astronomical Units": 1.5e+11,
        "times the diameter of the Moon": 3480000,
        "parsecs": 3.086e+16, // https://en.wikipedia.org/wiki/Parsec
        "times the distance to Andromeda Galaxy": 2.4e+22, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
        "megaparsecs": 3.1e+22, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
    },
    volume: {
        "red blood cells": 9e-17,
        "peas": 2e-7,
        "human ejaculations": 4e-6,
        "teaspoons": 5e-6,
        "tablespoons": 1.5e-5,
        "cubic inches": 1.6e-5,
        "times the volume of the human urinary bladder": 4e-4,
        "wine bottles": 7.5e-4,
        "times the blood in an adult human body": 5e-3,
        "times the total volume of male adult human lungs": 6e-3,
        "times the volume of a human body": 7.1e-2,
        "oil barrels": 1.59e-1,
        "butt(an old unit for beer and wine)": 4.8e-1,
        "Olympic-sized swimming pools": 2.5e+3,
        "times the gas in the Hindenburg zeppelin": 2.12e+5,
        "sydharbs — Volume of Sydney Harbour, Australia": 5e+8,
        "times the volume of crude oil consumed by the world in a year": 5e+9,
        "times the volume of the Mediterranean Sea": 3.7e+15,
        "times the volume of the Moon": 2.2e+19,
        "times the volume of planet Earth": 1.08e+21,
        "times the volume of the Sun": 1.41e+27,
        "times the volume of the Observable Universe": 3.4e+80,
    },
    power: {
        "times the power consumption of a human cell": 1e-12,
        "times the power consumption of a cellphone camera light": 1,
        "times the power consumption of the human brain": 30,
        "times the basal metabolic rate of an adult human body": 100,
        "times the electric power output of 1 m2 solar panel in full sunlight": 120,
        "times the fusion power output of 1 cubic meter of volume of the Sun's core": 276,
        "times the power of a microwave oven": 1.1e+3,
        "times the power per square meter received from the Sun at the Earth's orbit": 1.366e+3,
        "times the average power consumption per person worldwide": 2.4e+3,
        "times the average power consumption per person in the United States": 1e+4,
        "times the maximum power output of a large 18-wheeler truck engine": 4.5e+5,
        "times the peak power output of a blue whale": 2.5e+6,
        "times the mechanical power output of a diesel locomotive": 3e+6,
        "times the electrical power output of the country of Togo": 1.03e+7,
        "times the average power consumption of a Boeing 747 passenger aircraft": 1.4e+8,
        "times the peak power generation of Hoover Dam": 2.074e+9,
        "times the peak daily electrical power consumption of Great Britain": 5.5e+10,
        "times the worldwide wind turbine capacity": 8.99e+11,
        "times the average rate of power consumption of humanity": 2.04e+13,
        "times the global net power production via photosynthesis": 1.4e+14,
        "times the total power received by Earth from the Sun": 1.73e+17,
        "times the luminosity of the Sun": 3.828e+26,
        "times the luminosity of the Milky Way galaxy": 5.7e+36,
        "times the luminosity of the entire Observable universe": 9.5e+48,
    },
    speed: {
        "times the growth rate of a stalagmite": 4.12e-12,
        "times the human hair growth rate": 4.8e-9,
        "times the growth rate of bamboo": 1.4e-5,
        "times the speed of the world record fastest snail": 0.00275,
        "times the top speed of a sloth": 0.080,
        "times the average walking speed": 1.25,
        "times the average cycling speed": 6.5,
        "times the speed of Usain Bolt setting the 100m world record": 10.5,
        "times the speed of thoroughbred racehorse": 17,
        "times the speed of a cheetah — fastest land animal": 30,
        "times the typical peak speed of a local service train": 40,
        "times the speed of a peregrine falcon — fastest bird": 90,
        "times the speed of the fastest crossbow arrow.": 154,
        "times the speed of a typical .22 LR bullet": 320,
        "times the speed of sound(Mach)": 340.3,
        "times the speed of Sonic the Hedgehog": 342.88, // https://www.thegamer.com/sonic-how-fast-running-speeds/
        "times the speed of Earth's rotation at the equator": 464,
        "times the speed of a bullet of a heavy machine gun": 800,
        "times the orbital velocity of the Moon around Earth.": 1022,
        "times the velocity of International Space Station": 7700,
        "times Earth's escape velocity": 11200,
        "times Earth's orbital velocity around the Sun": 29800,
        "times the orbital speed of the Solar System in the Milky Way galaxy": 2e+5,
        "times the approaching velocity of Andromeda Galaxy to our galaxy": 3.09e+5,
        "times the speed of an initial strike of lightning": 4.4e+5,
        "times the speed of an return stroke of lightning": 1e+8,
        "c(speed of light)": 299792458,
        "%c": 2997924.58,
    },
    force: {
        "times the weight of a hydrogen atom": 1.6e-25,
        "times the weight of an E. coli bacterium": 1e-13,
        "times the force to break a hydrogen bond": 4e-12,
        "times the weight of a smartphone": 1.4,
        "times the force to break a chicken egg": 50,
        "times the force of human bite": 720,
        "times the bite force of an American alligator": 9e+3,
        "times the bite force of a great white shark": 1.8e+4,
        "times the weight of the largest Blue Whale": 1.9e+6,
        "times the gravitational attraction between Earth and Moon": 2e+20,
        "times the gravitational attraction between Earth and Sun": 3.5e+22,
        "times the bite force of an American alligator": 9e+3,
        "times the bite force of an American alligator": 9e+3,
    },
    area: {
        "E. coli bacteria": 6e-12,
        "Red blood cells": 1e-10,
        "pixels": 5.5e-8,
        "pinheads": 2e-6,
        "times the surface area of an ant": 4.87e-5, // https://physics.stackexchange.com/a/153552
        "U.S. pennies": 2.9e-4,
        "credit cards": 4.6e-3,
        "Index cards": 1e-2,
        "American letter papers": 6e-2,
        "A4 paper": 6.24e-2,
        "basketballs": 1.8e-1,
        "A1 papers": 5e-1,
        "times the skin on the human body": 1.73,
        "volleyball courts": 162,
        "NBA basketball courts": 437,
        "acres": 4047,
        "American football fields": 5400,
        "football(soccer) fields": 7140,
        "Manhattan city blocks": 22100,
        "Vatican Cities": 4.9e+5,
        "Pentagons": 6e+5,
        "Monaco's": 2e+6,
        "Walt Disney Worlds": 1.1e+8,
        "Hong Kongs": 1.1e+9,
        "Lake Victorias": 6.89e+10,
        "Spains": 5.1e+11,
        "Roman Empires(at it's largest)": 5e+12,
        "times the arable land on Earth": 1.4e+13,
        "Plutos": 1.66e+13,
        "Africas": 3e+13,
        "Moons": 3.8e+13,
        "times the water area on Earth": 3.6e+14,
        "Earths": 5.1e+14,
        "Jupiters": 6.1e+16,
        "Suns": 6.1e+18,
    },
    /* acceleration: {
        "times the acceleration due to gravity on the moon": 1.62, // https://en.wikipedia.org/wiki/Orders_of_magnitude_(acceleration)
        "g": 9.80665,
        "times that of the Saturn V Moon rocket just after launch": 11.2,
        "times that of the fastest rollercoaster in the world - Stealth": 19.87, // https://coasterpedia.net/wiki/Fastest_launch_accelerations
    }, */
}

function populateDropdown(element, values) {
    element.innerHTML = '';
    var options = [];
    values.forEach((e) => {
        options.push(e)
        element.innerHTML += `<option value="${e.replaceAll(' ', '_')}">${e}</option>`
    })
}

populateDropdown(document.getElementById('measurement'), measurements)

function measurementChanged(){
    populateDropdown(document.getElementById('unit'), units[document.getElementById('measurement').value.toLowerCase()])
    updateComparison()
}

measurementChanged()

function updateComparison(){
    // document.getElementById('imperial').innerHTML = (document.getElementById('magnitude').value * normalisations[document.getElementById('measurement').value.toLowerCase()][document.getElementById('unit').value.toLowerCase()])
    var measurement = document.getElementById('measurement').value.toLowerCase()
    var unit = document.getElementById('unit').value.toLowerCase()
    var normal = document.getElementById('magnitude').value * normalisations[measurement][unit]
    var comparisonList = []
    Object.keys(comparisons[measurement]).forEach((e) => {
        var val = toPlaces((normal / comparisons[measurement][e]), 2)
        var hide;
        if (val == 0 || val > 1e+200) {
            hide = true
        }
        if(val > 1000000 || ((val.toExponential(2).split('-')[1]) > 5)){
            val = val.toExponential(2)
        }
        if(!hide)comparisonList.push(`${val.toLocaleString().replace('e', 'x10^').replace('+', '')} ${e}`)
    })
    if(comparisonList.length > 0){
        document.getElementById('imperial').innerHTML = `<div class="comparison">${comparisonList.join('</div><div class="comparison">')}</div>`
    } else {
        var nothing = ['A whole lotta nothing', 'Nothin\' here but us chickens', 'Nada']
        document.getElementById('imperial').innerHTML = `<div class="comparison">${nothing[Math.floor(Math.random() * nothing.length)]}</div>`
    }
}

updateComparison()