const days = [
    require('./2022/1.js'),
    require('./2022/2.js'),
    require('./2022/3.js'),
    require('./2022/4.js'),
    require('./2022/5.js'),
    require('./2022/6.js'),
    require('./2022/7.js'),
    require('./2022/8.js'),
    require('./2022/9.js')
]

// days.slice(0, days.length - 1).forEach((day) => day.run())
days[days.length - 1].run()
