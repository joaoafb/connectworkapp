const navItems = document.querySelectorAll('.side-nav__item');
const removeClasses = () => {
    navItems.forEach(eachItem => {
        eachItem.classList.remove('side-nav__item-active');
    });
}

navItems.forEach(eachItem => {
    eachItem.addEventListener('click', function() {
        removeClasses();
        eachItem.classList.add('side-nav__item-active');
    });
});

const ctx = document.getElementById('myChart');

const ctx2 = document.getElementById('myChart2');

new Chart(ctx2, {

    type: 'polarArea',
    data: {
        datasets: [{
            label: 'Tarefas',
            data: [localStorage.getItem("realizada"), localStorage.getItem("pendente")],
            borderRadius: 5,
            cutout: 80,
            backgroundColor: [
                'rgb(235, 124, 166)',

                'rgb(204, 111, 248)',


            ],
            hoverOffset: 4,
            spacing: 8
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});