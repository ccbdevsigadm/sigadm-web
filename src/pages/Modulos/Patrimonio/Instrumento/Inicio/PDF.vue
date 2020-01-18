<template>
  <pdf :src="pdfArquivo"></pdf>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  props:['pdfArquivo'],
  components: {
    pdf
  },
  data() {
    return {

    }
  }

}
</script>