
const awilix = require('awilix');

const container = awilix.createContainer()


container.register(
    'accountRepository', 
    awilix.asFunction(require('./data-access-layer/account-repository.js'))
)

container.register(
    'bookingRepository', 
    awilix.asFunction(require('./data-access-layer/booking-repository.js'))
)

container.register(
    'specialityRepository',
    awilix.asFunction(require('./data-access-layer/speciality-repository.js'))
)

container.register(
    'accountManager', 
    awilix.asFunction(require('./business-logic-layer/account-manager.js'))

)

container.register(
    'accountValidator', 
    awilix.asFunction(require('./business-logic-layer/account-validator.js'))
)

container.register(
    'bookingManager', 
    awilix.asFunction(require('./business-logic-layer/booking-manager.js'))
)
container.register(
    'bookingValidator', 
    awilix.asFunction(require('./business-logic-layer/booking-validator.js'))
)
container.register(
    'sessionValidator',
    awilix.asFunction(require('./business-logic-layer/session-validator.js'))
)

container.register(
    'specialityManager', 
    awilix.asFunction(require('./business-logic-layer/speciality-manager.js'))
)
container.register(
    'specialityValidator',
    awilix.asFunction(require('./business-logic-layer/speciality-validator.js'))
)


container.register(
    'accountRouter', 
    awilix.asFunction(require('./presentation-layer/routers/account-router.js'))
)
container.register(
    'bookingRouter', 
    awilix.asFunction(require('./presentation-layer/routers/booking-router.js'))
)
container.register(
    'specialityRouter', 
    awilix.asFunction(require('./presentation-layer/routers/speciality-router'))
)
container.register(
    'variousRouter', 
    awilix.asFunction(require('./presentation-layer/routers/various-routers'))
)

container.register(
    'app', 
    awilix.asFunction(require('./presentation-layer/app.js'))
)


const app = container.resolve('app')
console.log("starting app")
app.start()