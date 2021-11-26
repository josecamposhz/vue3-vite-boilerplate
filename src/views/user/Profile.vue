<template>
  <div class="container-fluid mt-3 px-5">
    <h1>Hola {{ currentUser.firstName }} {{ currentUser.lastName }}</h1>
    <div class="row mt-3 justify-content-center">
      <div class="col-md-7">
        <edit-profile-card />
      </div>
      <div class="col-md-5">
        <AvatarProfile />
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileCard from "@/components/profile/EditCard.vue";
import AvatarProfile from "@/components/profile/Avatar.vue";
import { mapState } from "vuex";
export default {
  components: { EditProfileCard, AvatarProfile },
  computed: {
    ...mapState({ currentUser: (state) => state.user }),
  },
};
</script>
