import Header from '../components/_Header.vue'
import Board from '../components/Board.vue'
import History from '../components/History.vue'
import HelloWorld from '../components/HelloWorld'

const LoginedRoutes = [
    {
        name: 'Board',
        path: "Board",
        components: {
            header: Header,
            default: Board
        }
    },
    {
        name: 'History',
        path: "History",
        components: {
            header: Header,
            default: History
        }
    },
    {
        name: 'Team',
        path: "Team",
        components: {
            header: Header,
            default: HelloWorld
        }
    },
];

export default LoginedRoutes;