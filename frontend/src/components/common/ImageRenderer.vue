<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row justify="center" v-if="!isLoading">
      <div class="control">
      </div>
    </v-row>
  </div>
</template>

<script>
import ApiService from '@/common/apiService';
import {Routes} from '@/utils/constants';
import alertMixin from '@/mixins/alertMixin';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer, {
  debug: true,
  defaultOptions: {
    zIndex: 9999
  }
});

export default {
  name: 'ImageRenderer',
  mixins: [alertMixin],
  data() {
    return {
      src: undefined,
      isLoading: false,
      documentID: ''
    };
  },
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    requestId: {
      type: String,
      required: true
    },
    requestType: {
      type: String,
      required: true
    },
    imageId: {
      type: String,
      required: true
    }
  },
  methods: {
    previewImgObject () {
      let image = [{'src': this.src,'data-source': this.src}];
      this.$viewerApi({
        options: {
          toolbar: true,
          url: 'data-source',
          navbar: false,
          title: false,
          scalable: false,
          hide: this.closeDialog(),
          initialViewIndex: 0
        },
        images: image
      });
    },
    closeDialog(){
      this.$emit('closeDialog');
    }
  },
  watch: {
    dialog(newValue) {
      this.ImageRenderDialog = newValue;
    },
    imageId(newValue) {
      this.documentID = newValue;
      this.isLoading = true;
      this.src = undefined;
      if (this.documentID?.length > 0) {
        ApiService.apiAxios.get(`${Routes[this.requestType].ROOT_ENDPOINT}/${this.requestId}/documents/${this.documentID}`).then((response) => {
          this.src = 'data:image/jpeg;base64,' + response.data;
          this.previewImgObject();
        }).catch(e => {
          console.error(e);
          this.setFailureAlert('Could not load image. Please try again later.');
        }).finally(() => {
          this.isLoading = false;
        });
      }
    }
  },
};
</script>
