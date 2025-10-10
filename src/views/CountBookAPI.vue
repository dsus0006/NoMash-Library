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
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://australia-southeast1-week7-dsusanto.cloudfunctions.net/countBooks');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
      console.error('Error fetching book count:', error);
      this.error = error;
      this.count = null;
      }
    },
  },
};
</script>
