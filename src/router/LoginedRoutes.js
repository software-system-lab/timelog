import Header from '../components/_Header.vue'
import Board from '../components/Board.vue'
import History from '../components/History.vue'
import Team from '../components/Team.vue'
import Sprint from '../components/Team/Sprint.vue'
import Teammate from '../components/Team/Teammate.vue'
import Setting from '../components/Setting.vue'
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
            default: Team
        },
        redirect: { name: "Team - Teammate" },
        children:[
            {
                name: "Team - Teammate",
                path: "Teammate",
                component: Teammate,
                meta: {
                    tabIndex: '0'
                }
            },
            {
                name: "Team - Sprint",
                path: "Sprint",
                component: Sprint,
                meta: {
                    tabIndex: '1'
                }
            }
        ]
    },
    {
        name: 'Setting',
        path: "Setting",
        components: {
            header: Header,
            default: Setting
        }
    },
];

export default LoginedRoutes;