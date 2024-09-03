# TASK
This project consists of two main components:

* Order Service: Manages orders.
* Gateway: Serves as a single entry point to interact with the Order Service and potentially other services.

### Functionalities:
* User can place order and delete order
* List automatically get updates on Admin portal using Server sent Events(SSE).

### Tools and Frameworks used:
* NestJS
* NEXTJS (build on top of react JS)
* MongoDB


## How to Run
* Install the node modules using `npm install` 
* provide db url in config.ts file in order-system-micro-service/src
* First run the Order service using command `npm run start:dev` after changing directory 
* Run the gateway service using command `npm run start:dev` after changing the directory 
* Run the Next Application using `npm run dev` command

## Challenges Faced:
* Interprocess Communication 
* Real Time Updates

