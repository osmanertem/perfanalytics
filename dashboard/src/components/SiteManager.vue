<template>
  <b-row class="site-manager">
    <b-col>
      <b-row style="margin-top:10px">
        <b-col class="page-title">Performance Analytics Dashboard 1</b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col cols="2">Select Site:</b-col>
        <b-col cols="7">
          <b-form-select v-model="selected" size="sm" :options="getSiteOptionsData"></b-form-select>
        </b-col>
        <b-col cols="1"></b-col>
        <b-col cols="2">
          <b-button
            v-b-toggle="'collapse-2'"
            size="sm"
            style="width: 100%"
            variant="primary"
          >Add New Site</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b>SiteId:</b>
          {{ selected }}
        </b-col>
      </b-row>
      <b-row style="margin-top:10px; margin-bottom:10px">
        <b-col>
          <b-collapse id="collapse-2">
            <b-card>
              <b-container>
                <b-row>
                  <b-col>Add New Web Site</b-col>
                </b-row>
                <b-row align-v="center">
                  <b-col cols="2">SiteUrl</b-col>
                  <b-col cols="8">
                    <b-form-input
                      v-model="newSiteUrl"
                      type="text"
                      size="sm"
                      placeholder="Enter site url like https://www.trendyol.com"
                    ></b-form-input>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                      size="sm"
                      style="width: 100%"
                      variant="success"
                      @click="onCreateSite"
                    >Save</b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SiteManager',
  props: ['siteId'],
  data() {
    return {
      newSiteUrl: '',
      selected: null,
    };
  },
  mounted() {
    this.selected = this.siteId;
  },
  computed: {
    ...mapState(['webSites']),
    getSiteOptionsData() {
      console.log('this.webSites', this.webSites);
      return this.webSites?.map((element) => ({
        value: element.siteId,
        text: element.siteUrl.replace('https://', ''),
      }));
    },
  },
  methods: {
    ...mapActions(['createWebSite']),
    onCreateSite() {
      this.createWebSite(this.newSiteUrl)
        .then((createdSiteData) => {
          this.selected = createdSiteData.siteId;
          console.log('response', createdSiteData);
          this.$root.$emit('bv::toggle::collapse', 'collapse-2');
        })
        .catch((err) => {
          console.log(err);
          alert('Coult not create new site'); // eslint-disable-line
        });
    },
  },
  watch: {
    selected() {
      this.$emit('siteIdChanged', this.selected);
    },
  },
};
</script>

<style scoped lang="scss">
.page-title {
  font-size: 36px;
  margin: 10px;
}
.site-manager {
  border: 1px solid gray;
}
</style>
