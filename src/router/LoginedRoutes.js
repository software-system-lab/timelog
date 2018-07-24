import Board from '../components/Board.vue'
import HelloWorld from '../components/HelloWorld'
import Header from '../components/_Header.vue'

const LoginedRoutes = [
    {
        name: 'Board',
        path: "Board",
        components: {
            header: Header,
            default: HelloWorld
        }
    },
    {
        name: 'Statistics',
        path: "Statistics",
        components: {
            header: Header,
        }
    },
];

export default LoginedRoutes;