<template>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  mounted() {
    this.getAllBookAPI();
  },
  methods: {
    async getAllBookAPI() {
      try {
        const response = await axios.get('https://australia-southeast1-week7-dsusanto.cloudfunctions.net/getAllBooks');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
      console.error('Error fetching all books:', error);
      this.error = error;
      this.count = null;
      }
    },
  },
};
</script>
