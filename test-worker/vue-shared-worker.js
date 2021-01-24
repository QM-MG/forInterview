import Worker from '../my2.worker'
const worker =  new Worker()
console.log(worker)
worker.port.onmessage = ({ data }) => {
  console.log('收到消息: ', data)
}
worker.port.start()
worker.port.postMessage('open')
export default {
    data() {
        return {};
    },
    mounted() {
    },
    methods: {}
};


var clients = [];
onconnect = function (e) {
    var port = e.ports[0];
    clients.push(port);
    port.onmessage = function (e) {
        console.log(e, port, clients)
        for (var i = 0; i < clients.length; i++) {
            var eElement = clients[i];
            console.log(eElement)
            eElement.postMessage(e.data)
        }
    }
}


chainWebpack: (config) => {
    config.module
        .rule('worker')
        .test(/\.worker\.js$/)
        .use('worker-loader')
        .loader('worker-loader')
        .tap(options => ({ worker: 'SharedWorker' }))
        .end()
},