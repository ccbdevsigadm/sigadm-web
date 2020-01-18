// tests/unit/HomeIrmao.spec.js
// http://iobio.io/user_guides/2019/05/20/vue-js-unit-testing-with-jest/
// Este erro abaixo é quando é usado uma variavel que não existe no data do componente 
// [Vue warn]: Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.

import { shallowMount } from '@vue/test-utils';
import Home from '@/pages/Modulos/Patrimonio/Irmaos/Inicio/Home.vue';
import Vuetify from "vuetify";
import Vue from 'vue';




describe('Home', () => {
  let wrapper;  
  beforeEach(() => {
    Vue.use(Vuetify);
    wrapper = shallowMount(Home);
    
  });
  test('Rendenrizando os componentes visuais do home irmao', () => {
    expect(shallowMount(Home).isVueInstance()).toBe(true);
    //expect(wrapper.element).toMatchSnapshot()
  });
  test("Testando o método que ativa o modal da edição do irmão",()=>{   
    //console.log(wrapper.vm.AtivarEdicao({nome:"Joel"}))
   // console.log(wrapper.vm.irmao_edicao.nome)
    //console.log(wrapper.vm.ativar_edicao)
  });
});