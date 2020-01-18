<template>
  <v-layout row>
    <v-dialog v-model="dialog" max-width="820px">
      <v-btn
        slot="activator"
        flat
        color="green darken-2"
        dark
        class="align-left"
        @click="BuscarIrmao(), BuscarComumCongregacao(irmao)"
      >
        <v-icon small left dark>fas fa-check</v-icon>
        <small>Escolher</small>
      </v-btn>
      <v-card>
        <v-flex xs12 sm12>
          <div class="pt-3">
            <v-btn
              right
              class="white--text"
              small
              fab
              round
              color="red darken-1"
              absolute
              v-on:click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-text>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span class="font-weight-bold headline blue--text text--darken-4"
              >Informações sobre o empréstimo</span
            >
          </v-flex>

          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex sm6 lg6 md6>
                <v-text-field
                  :readonly="true"
                  v-model="usuario.nome"
                  label="Nome do irmão"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 lg6 md6>
                <v-text-field
                  :readonly="true"
                  v-model="nome_instrumento"
                  label="Instrumento"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 md6 lg6>
                <v-text-field
                  v-model="computedDateFormatted"
                  label="Data do empréstimo "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 lg6 md6>
                <v-text-field
                  :readonly="true"
                  v-model="congregacao"
                  label="Comum congregação"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 lg6 md6>
                <v-text-field
                  :readonly="true"
                  v-model="local"
                  label="Encarregado local"
                ></v-text-field>
              </v-flex>
              <v-flex sm6 lg6 md6>
                <v-text-field
                  :readonly="true"
                  v-model="regional"
                  label="Encarregado regional"
                ></v-text-field>
              </v-flex>

              <!--           
              <v-flex align-center>
                <termos
                  v-bind:numero_tombamento="numero_do_tombamento"
                  v-on:cadastrarEmprestimo="
                    CadastrarEmprestimo(), (dialog = false)
                  "
                ></termos>
              </v-flex>
              -->
              <v-flex align-center>
                <v-btn
                  color="success"
                  @click="
                    GerarTermoResponsabilidade(),
                      CadastrarEmprestimo(),
                      SalvarStatusAnexarSolicitacaoEmprestimo()
                  "
                >
                  <v-icon small left>fas fa-file-signature</v-icon>
                  Gerar Termos</v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from 'sweetalert2';
import Termos from '@/pages/Modulos/Patrimonio/Instrumento/Emprestimo/Termos';
export default {
  name: 'emprestimo',
  components: {
    Termos
  },
  data: () => ({
    dialog_emprestimo: false,
    dialog: false,
    nome: null,
    emprestimo: false,
    data_emprestimo: new Date().toISOString().substr(0, 10),
    encarregado: '',
    congregacao: '',
    modal: false,
    tombamento_instrumento: '',
    igreja: '',
    regional: '',
    local: '',
    irmao_solicitacao: '',
    irmaoEndereco: '',
    irmaoCidade: '',
    irmaoTelefone: '',
    irmaoCongregacao: '',
    irmaoRegional: '',
    irmaoLocal: '',
    irmaoNome: '',
    usuario: ''
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_emprestimo);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_emprestimo);
    }
  },
  props: [
    'numero_do_tombamento',
    'numero_do_instrumento',
    'irmao',
    'nome_instrumento',
    'solicitacao',
    'instrumento'
  ],
  methods: {
    SalvarEmprestimo() {
      console.log(this.numero_do_tombamento);
      console.log(this.numero_do_instrumento);
      console.log(this.usuario.nome);
      console.log(this.congregacao);
      console.log(this.local);
      console.log(this.regional);
      console.log(this.data_emprestimo);
    },
  
    GerarTermoResponsabilidade() {
      let usuarioAux = sessionStorage.getItem("usuario");
      let usuario_autorizado = JSON.parse(usuarioAux);

      let data_da_impressao = new Date().toISOString().substr(0, 19);
      

      
      var doc = new jsPDF();
      doc.setFont('times');
      doc.setFontSize(14);
      doc.setFontType('bold');
      doc.text('Congregação Cristã no Brasil', 105, 10, null, null, 'center');
      doc.setFontSize(13);
      doc.setFontType('bold');
      doc.text('Estado do Rio Grande do Norte', 105, 20, null, null, 'center');
      doc.setFontType('normal');
      doc.setFontSize(14);
      doc.text('TERMO DE RESPONSABILIDADE ', 105, 30, null, null, 'center');
      doc.setFontType('normal');
      doc.setFontSize(13);
      doc.text(
        '      Declaro encontrar em minhas mãos para louvar a DEUS, um instrumento musical ' +
          this.instrumento.nome +
          ' de tonalidade/característica ' +
          this.instrumento.caracteristica +
          ' pertencente ao patrimônio da Congregação Cristã no Brasil do Estado do Rio Grande do Norte, com número de identificação ' +
          this.instrumento.tombamento +
          '.',
        10,
        40,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '        Comprometo-me a desfrutar deste instrumento obedecendo as seguintes condições:',
        10,
        55,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text('                 - Enquanto morar neste Estado;', 10, 65, {
        maxWidth: 185,
        align: 'justify'
      });
      doc.text(
        '                 - Enquanto não conseguir comprar meu instrumento;',
        10,
        70,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Se eu permanecer com vida e saúde física;',
        10,
        75,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Se permanecer fiel à doutrina da Congregação;',
        10,
        80,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Ser frequente nos cultos e ensaios musicais;',
        10,
        85,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - A manutenção do instrumento ficará por minha conta;',
        10,
        90,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Em caso de morte, o instrumento deverá ser devolvido à Congregação.',
        10,
        95,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '        Fico ciente que se não obedecer aos itens acima, sofrerei a pena de perder o direito de usufruir do instrumento, obrigando-me a devolvê-lo imediatamente quando solicitado pelo Ministério local.',
        10,
        110,
        { maxWidth: 185, align: 'justify' }
      );
      doc.line(5, 120, 205, 120);
      doc.text('Nome: ' + this.usuario.nome, 10, 125, {
        maxWidth: 185,
        align: 'justify'
      });
      doc.text(
        'Data de Nascimento: ' +
          this.formatDate(this.usuario.nascimento.substring(0, 10)) +
          '   CPF: ' +
          this.usuario.cpf +
          '   Telefone: ' +
          this.usuario.telefone,
        10,
        130,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        'Endereço: ' +
          this.usuario.rua +
          ', ' +
          this.usuario.numero +
          '  ' +
          this.usuario.bairro +
          ' - ' +
          this.usuario.cidade,
        10,
        135,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        'Congregação/Código: ' +
          this.igreja.nomeRelatorio +
          ' - ' +
          this.igreja.codigo,
        10,
        140,
        { maxWidth: 185, align: 'justify' }
      );
      doc.line(5, 145, 205, 145);
      doc.text(
        '       Por ser verdade e por aceitar as condições mencionadas assino a presente declaração.',
        10,
        155,
        { maxWidth: 185, align: 'justify' }
      );
      doc.line(20, 170, 92, 170);
      doc.setFontSize(10);
      doc.text('Cidade', 55, 175, 'center');
      doc.setFontSize(13);
      doc.text(' , ', 94, 170, 'center');
      doc.line(97, 170, 109, 170);
      doc.setFontSize(10);
      doc.text('Dia', 103, 175, 'center');
      doc.setFontSize(13);
      doc.text(' de', 113, 170, 'center');
      doc.line(118, 170, 150, 170);
      doc.setFontSize(10);
      doc.text('Mês', 136, 175, 'center');
      doc.setFontSize(13);
      doc.text(' de', 154, 170, 'center');
      doc.line(160, 170, 180, 170);
      doc.setFontSize(10);
      doc.text('Ano', 172, 175, 'center');
      doc.setFontSize(13);
      doc.text('.', 181, 170, 'center');
      doc.line(40, 190, 170, 190);
      doc.setFontSize(10);
      doc.text('Assinatura do músico', 103, 193, 'center');
      doc.setFontSize(13);
      doc.text(
        ' --------------- Via da secretaria ---------------',
        102,
        210,
        'center'
      );
      doc.setFontSize(10);
      doc.text("Pág 1",105,280,'center');
      doc.text("Emitido digitalmente por "+ usuario_autorizado.email+" Data: "+this.formatDate(data_da_impressao.substring(0, 10)),105,285,'center');

      doc.addPage();

      doc.setFont('times');
      doc.setFontSize(14);
      doc.setFontType('bold');
      doc.text('Congregação Cristã no Brasil', 105, 10, null, null, 'center');
      doc.setFontSize(13);
      doc.setFontType('bold');
      doc.text('Estado do Rio Grande do Norte', 105, 20, null, null, 'center');
      doc.setFontType('normal');
      doc.setFontSize(14);
      doc.text('TERMO DE RESPONSABILIDADE ', 105, 30, null, null, 'center');
      doc.setFontType('normal');
      doc.setFontSize(13);

      doc.text(
        '      Declaro encontrar em minhas mãos para louvar a DEUS, um instrumento musical ' +
          this.instrumento.nome +
          ' de tonalidade/característica ' +
          this.instrumento.caracteristica +
          ' pertencente ao patrimônio da Congregação Cristã no Brasil do Estado do Rio Grande do Norte, com número de identificação ' +
          this.instrumento.tombamento +
          '.',
        10,
        40,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '        Comprometo-me a desfrutar deste instrumento obedecendo as seguintes condições:',
        10,
        55,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text('                 - Enquanto morar neste Estado;', 10, 65, {
        maxWidth: 185,
        align: 'justify'
      });
      doc.text(
        '                 - Enquanto não conseguir comprar meu instrumento;',
        10,
        70,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Se eu permanecer com vida e saúde física;',
        10,
        75,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Se permanecer fiel à doutrina da Congregação;',
        10,
        80,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Ser frequente nos cultos e ensaios musicais;',
        10,
        85,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - A manutenção do instrumento ficará por minha conta;',
        10,
        90,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '                 - Em caso de morte, o instrumento deverá ser devolvido à Congregação.',
        10,
        95,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '        Fico ciente que se não obedecer aos itens acima, sofrerei a pena de perder o direito de usufruir do instrumento, obrigando-me a devolvê-lo imediatamente quando solicitado pelo Ministério local.',
        10,
        110,
        { maxWidth: 185, align: 'justify' }
      );
      doc.line(5, 120, 205, 120);
      doc.text('Nome: ' + this.usuario.nome, 10, 125, {
        maxWidth: 185,
        align: 'justify'
      });
      doc.text(
        'Data de Nascimento: ' +
          this.formatDate(this.usuario.nascimento.substring(0, 10)) +
          '   CPF: ' +
          this.usuario.cpf +
          '   Telefone: ' +
          this.usuario.telefone,
        10,
        130,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        'Endereço: ' +
          this.usuario.rua +
          ', ' +
          this.usuario.numero +
          '  ' +
          this.usuario.bairro +
          ' - ' +
          this.usuario.cidade,
        10,
        135,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        'Congregação/Código: ' +
          this.igreja.nomeRelatorio +
          ' - ' +
          this.igreja.codigo,
        10,
        140,
        { maxWidth: 185, align: 'justify' }
      );
      doc.line(5, 145, 205, 145);
      doc.text(
        '       Por ser verdade e por aceitar as condições mencionadas assino a presente declaração.',
        10,
        155,
        { maxWidth: 185, align: 'justify' }
      );
      doc.line(20, 170, 92, 170);
      doc.setFontSize(10);
      doc.text('Cidade', 55, 175, 'center');
      doc.setFontSize(13);
      doc.text(' , ', 94, 170, 'center');
      doc.line(97, 170, 109, 170);
      doc.setFontSize(10);
      doc.text('Dia', 103, 175, 'center');
      doc.setFontSize(13);
      doc.text(' de', 113, 170, 'center');
      doc.line(118, 170, 150, 170);
      doc.setFontSize(10);
      doc.text('Mês', 136, 175, 'center');
      doc.setFontSize(13);
      doc.text(' de', 154, 170, 'center');
      doc.line(160, 170, 180, 170);
      doc.setFontSize(10);
      doc.text('Ano', 172, 175, 'center');
      doc.setFontSize(13);
      doc.text('.', 181, 170, 'center');
      doc.line(40, 190, 170, 190);
      doc.setFontSize(10);
      doc.text('Assinatura do músico', 103, 193, 'center');
      doc.setFontSize(13);
      doc.text(
        ' --------------- Via do músico ---------------',
        102,
        210,
        'center'
      );
      doc.setFontSize(10);
      doc.text("Pág 2",105,280,'center');
      doc.text("Emitido digitalmente por "+ usuario_autorizado.email+" Data: "+this.formatDate(data_da_impressao.substring(0, 10)),105,285,'center');
      doc.addPage();

      doc.setFont('times');
      doc.setFontSize(14);
      doc.setFontType('bold');
      doc.text('Congregação Cristã no Brasil', 105, 10, null, null, 'center');
      doc.setFontSize(13);
      doc.setFontType('bold');
      doc.text('Estado do Rio Grande do Norte', 105, 20, null, null, 'center');
      doc.setFontType('normal');
      doc.setFontSize(14);
      doc.text(
        'TERMO DE CIENCIA DE EMPRÉSTIMO DE INSTRUMENTO ',
        105,
        30,
        null,
        null,
        'center'
      );
      doc.text('PARA O MINISTÉRIO LOCAL ', 105, 35, null, null, 'center');
      doc.setFontType('normal');
      doc.setFontSize(13);
      doc.text('A paz de Deus, ', 10, 60, { maxWidth: 185, align: 'justify' });
      doc.text(
        '      Informamos que está sendo realizado empréstimo do instrumento musical ' +
          this.instrumento.nome +
          ' de tonalidade/característica ' +
          this.instrumento.caracteristica +
          ' de número de tombamento ' +
          this.instrumento.tombamento +
          ' na data de ' +
          this.formatDate(this.data_emprestimo.substring(0, 10)) +
          ', para o irmão ' +
          this.usuario.nome +
          ' que faz comum nesta congregação. ',
        10,
        90,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text(
        '      O atendimento foi atendido com consentimento dos irmãos responsáveis pelo fundo musical. ',
        10,
        120,
        { maxWidth: 185, align: 'justify' }
      );
      doc.text('Deus vos abençoe! ', 10, 130, {
        maxWidth: 185,
        align: 'justify'
      });
      doc.line(20, 170, 92, 170);
      doc.setFontSize(10);
      doc.text('Cidade', 55, 175, 'center');
      doc.setFontSize(13);
      doc.text(' , ', 94, 170, 'center');
      doc.line(97, 170, 109, 170);
      doc.setFontSize(10);
      doc.text('Dia', 103, 175, 'center');
      doc.setFontSize(13);
      doc.text(' de', 113, 170, 'center');
      doc.line(118, 170, 150, 170);
      doc.setFontSize(10);
      doc.text('Mês', 136, 175, 'center');
      doc.setFontSize(13);
      doc.text(' de', 154, 170, 'center');
      doc.line(160, 170, 180, 170);
      doc.setFontSize(10);
      doc.text('Ano', 172, 175, 'center');
      doc.setFontSize(13);
      doc.text('.', 181, 170, 'center');
      doc.line(40, 205, 170, 205);
      doc.setFontSize(10);
      doc.text('Assinatura do ministério local', 103, 208, 'center');
      doc.line(40, 220, 170, 220);
      doc.setFontSize(10);
      doc.text('Assinatura do Encarregado Regional/Local', 105, 223, 'center');
      doc.text("Pág 3",105,280,'center');
      doc.text("Emitido digitalmente por "+ usuario_autorizado.email+" Data: "+this.formatDate(data_da_impressao.substring(0, 10)),105,285,'center');
      doc.save('export.pdf');
    },
    CadastrarEmprestimo() {
      ////console.log(this.numero_do_instrumento);

      //console.log("Nome: ", this.irmaoNome);
      if (this.irmaoNome == null) {
        swal.fire('Não é possivel salvar!', 'Dados incompletos.', 'warning');
      } else {
        let autorizacaoAux = sessionStorage.getItem('usuario');
        if (autorizacaoAux) {
          this.Loading(
            'Realizando empréstimo e gerando Termos...',
            'hourglass-half'
          );
          this.autorizacao = JSON.parse(autorizacaoAux);
          ////console.log("entrou no cadastro de emprestimo");
          this.$http
            .post(
              this.$url + 'EmprestimoInstrumento/v1',
              {
                id: 0,
                idInstrumento: this.numero_do_instrumento,
                nome: this.usuario.nome,
                congregacao: this.congregacao,
                tombamento: this.numero_do_tombamento,
                status: '2',
                encarregado: this.local,
                encarregadoRegional: this.regional,
                devolucaoDate: new Date().toISOString().substr(0, 19),
                emprestimoDate: this.data_emprestimo,
                launchDate: new Date().toISOString().substr(0, 19)
              },
              {
                headers: {
                  authorization: 'Bearer ' + this.autorizacao.accessToken
                }
              }
            )
            .then(response => {
              if (response.status == 200) {
              }
            })
            .catch(e => {});
        }
      }
    },
    BuscarIrmao() {
      this.usuario = '';
      let usuarioAutorize = sessionStorage.getItem('usuario');
      if (!usuarioAutorize) {
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + 'Usuario/v1/id?id=' + this.irmao, {
            headers: { authorization: 'Bearer ' + this.autorizacao.accessToken }
          })
          .then(response => {
            if (response.status == 200) {
              console.log(response.data);
              this.usuario = response.data;
            }
          })
          .catch(e => {});
      }
      console.log(this.usuario);
    },
    BuscarComumCongregacao(id) {
      this.irmao_solicitacao = [];
      let usuarioAutorize = sessionStorage.getItem('usuario');
      if (!usuarioAutorize) {
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(this.$url + 'UsuarioIgreja/v1/usuario-por-id?id=' + id, {
            headers: {
              authorization: 'Bearer ' + this.autorizacao.accessToken
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.$http
                .get(this.$url + 'Igreja/v1/' + response.data.idIgreja, {
                  headers: {
                    authorization: 'Bearer ' + this.autorizacao.accessToken
                  }
                })
                .then(response => {
                  if (response.status == 200) {
                    this.igreja = response.data;
                    (this.congregacao = response.data.cidade),
                      (this.regional = response.data.encRegional),
                      (this.local = response.data.encLocal);
                  }
                })
                .catch(e => {});
            }
          })
          .catch(e => {});
      }
    },
    Loading(title, icon) {
      swal.fire({
        title: title,
        html:
          'Por favor só um momento... ' + '<i class="fas fa-' + icon + '></i>',
        timer: 3000,
        onOpen: () => {
          swal.enableLoading();
        }
      });
    },
    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    SalvarStatusAnexarSolicitacaoEmprestimo() {
      console.log(this.solicitacao);
      let usuarioAutorize = sessionStorage.getItem('usuario');
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .put(
          this.$url + 'SolicitacaoEmprestimo/v1',
          {
            id: this.solicitacao.id,
            nome: this.solicitacao.nome,
            comumCongregacao: this.solicitacao.comumCongregacao,
            primeiroInstrumento: this.solicitacao.primeiroInstrumento,
            primeiraCategoria: this.solicitacao.primeiraCategoria,
            segundoInstrumento: this.solicitacao.segundoInstrumento,
            segundaCategoria: this.solicitacao.segundaCategoria,
            dataCadastro: this.solicitacao.dataCadastro,
            status: 'Anexar',
            launchDate: this.solicitacao.launchDate
          },
          {
            headers: {
              authorization: 'Bearer ' + this.autorizacao.accessToken
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            //console.log("Solicitação de empréstimo salva com sucesso");
            //let irmao = response.data;
            //this.$emit('solicitacaoSalva');
            this.dialog = false;
            this.$emit('emprestimo_sucesso');
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    }
  }
};
</script>
<style>
.mesmo-tamanho {
  width: 100%;
  white-space: normal;
}
</style>
