import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/Modulos/Patrimonio/Instrumento/Inicio/Home'
import HomeIrmaos from '@/pages/Modulos/Patrimonio/Irmaos/Inicio/Home'
import Igreja from '@/pages/Modulos/Patrimonio/Setorizacao/Inicio/Home'
import SolicitacoesEmprestimo from '@/pages/Modulos/Patrimonio/SolicitacoesEmprestimo/Inicio/Home'
import PesquisaAvancadaEstoque from '@/pages/Modulos/Patrimonio/Instrumento/Inicio/PesquisaAvancadaEstoque'



Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/inicio-patrimonio-pesquisa-avancada',
            name: 'PesquisaAvancadaEstoque',
            component: PesquisaAvancadaEstoque
        },
        {
            path: '/inicio-patrimonio',
            name: 'Home',
            component: Home
        },
        {
            path: '/patrimonio-irmaos-atendidos',
            name: 'HomeIrmaos',
            component: HomeIrmaos
        },
        {
            path: '/patrimonio-igrejas',
            name: 'Igreja',
            component: Igreja
        },
        {
            path: '/patrimonio-solicitacoes-emprestimos',
            name: 'SolicitacoesEmprestimo',
            component: SolicitacoesEmprestimo
        }
    ]
})