
const IO = require('socket.io')
const debug = require('debug')('back:socket')

class SocketS{
    constructor(server) {
        this.users = {}
        this.io = IO(server, {
            cors: {
              origin: '*',
            }
          });
        this.init(this.io)
	}
    init(io){
        io.on("connection", (socket) => {
            console.log(socket.id)
            socket.on('join-room', (roomId, userId)=>{
                socket.join(roomId)
                socket.to(roomId).broadcast.emit('user-connected', userId)
                socket.on('disconnect', () =>{
                    socket.to(roomId).broadcast.emit('user-disconnected', userId)
                })
            })
            
            // io.on('close', () => {
            //     console.log('deleting....')
            //     debug('closing connection with===>', socket.clientID)
            //     delete this.users[socket.clientID]

            // });
        });
    }
}

module.exports = SocketS

