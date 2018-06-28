<template>
  <q-page padding>
    <q-list>
      <q-item>
        <a :href="links.gost" download="GOST-25347-82.pdf" target="_blank">ГОСТ 25347-82.pdf</a>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageDownload',
  data () {
    return {
      links: {
        gost: process.env.DEVELOPER_URL + '/downloads/GOST-25347-82.pdf'
      }
    }
  }
}
</script>

<style>
</style>
