
// class EventElement {
//     constructor(element) {
//         this.element = element;
//     }

    
//     on(event, callback) {
//         this.element.addEventListener(event, callback);
//     }

   
//     emit(eventName, detail = {}) {
//         const event = new CustomEvent(eventName, { detail });
//         this.element.dispatchEvent(event);
//     }
// }


// const button = new EventElement(document.getElementById('magicButton'));


// button.on('magic', () => {
//     const picoRound = document.getElementById('picoRound');
//     const firecrackerImage = document.getElementById('firecrackerImage');
//     picoRound.classList.add('show');
//     firecrackerImage.style.display = 'block';

   
// });


// button.on('click', () => {
//     button.emit('magic');
// });




// document.addEventListener('mousemove', (e) => {
//     const rocket = document.getElementById('rocket');
//     const x = e.clientX;
//     const y = e.clientY;

//     rocket.style.left = `${x}px`;
//     rocket.style.top = `${y}px`;
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const magicButton = document.getElementById('magicButton');
//     const firecrackerImage = document.getElementById('firecrackerImage');

//     magicButton.addEventListener('click', () => {
//         document.body.style.backgroundImage = `url(${"./f529a6c31cf6ab4db56f49e7a322692d.gif"})`; 
//         magicButton.style.display = 'none';
//     });
// });




class EventElement {
    constructor(element) {
        const events = new Map();

        this.element = element;

        this.on = function(event, callback) {
            if (!events.has(event)) {
                events.set(event, []);
            }
            events.get(event).push(callback);
            this.element.addEventListener(event, callback);
        };

        this.off = function(event, callback) {
            if (!events.has(event)) return;
            const callbacks = events.get(event);
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
                this.element.removeEventListener(event, callback);
                if (callbacks.length === 0) {
                    events.delete(event);
                }
            }
        };

        this.emit = function(eventName, detail = {}) {
            const event = new CustomEvent(eventName, { detail });
            this.element.dispatchEvent(event);
        };

        this.once = function(event, callback) {
            const wrapper = (...args) => {
                callback(...args);
                this.off(event, wrapper);
            };
            this.on(event, wrapper);
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = new EventElement(document.getElementById('magicButton'));

    button.once('magic', () => {
        const picoRound = document.getElementById('picoRound');
        const firecrackerImage = document.getElementById('firecrackerImage');
        picoRound.classList.add('show');
        firecrackerImage.style.display = 'block';
    });

    button.on('click', () => {
        button.emit('magic');
    });

    document.addEventListener('mousemove', (e) => {
        const rocket = document.getElementById('rocket');
        const x = e.clientX;
        const y = e.clientY;

        rocket.style.left = `${x}px`;
        rocket.style.top = `${y}px`;
    });

    const magicButton = document.getElementById('magicButton');
    magicButton.addEventListener('click', () => {
        document.body.style.backgroundImage = `url('./assets/images/background2.gif')`;
        magicButton.style.display = 'none';
    });
});

