<template>
  <div id="contact-view">
    <loading v-if="$apollo.loading" :loading="$apollo.loading" :text="'Chargement en cours...'" />

    <div v-else class="contact-container container">
      <div class="row">
        <div class="col">
          <h3>Horaires</h3>

          <p v-html="contact.schedule" />
        </div>

        <div class="col">
          <h3>Contact</h3>

          <p class="contact-paragraph container">
            <i class="ion ion-md-call"></i>
            <a :href="'tel:' + contact.phoneNumber">{{ contact.phoneNumber }}</a>
            <br />
            <i class="ion ion-md-mail-open"></i>
            <a :href="'mailto:' + contact.mail">{{ contact.mail }}</a>
            <br />
            <i class="ion ion-md-map"></i>
            {{ contact.address }}
          </p>
        </div>
      </div>

      <div class="google-maps-container">
        <iframe
          id="gmap_canvas"
          :src="contact.googleMapsLink"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Contact } from '../queries';
import Loading from '../components/Loading.vue';

export default {
  name: 'contact',

  components: {
    Loading,
  },

  apollo: {
    contact: Contact,
  },
};
</script>

<style lang="scss" scoped>
.contact-container {
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;

  .google-maps-container {
    iframe {
      width: 100%;
      min-height: 300px;
    }
  }

  .contact-paragraph {
    i {
      font-size: 1.25rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
