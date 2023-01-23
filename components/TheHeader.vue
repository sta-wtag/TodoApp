<template>
  <div class="header">
    <div>
      <img :src="navLogo" />
      <span class="headerText">Todos</span>
    </div>

    <div class="flexBox">
      <div id="searchIcon">
        <img :src="seachIcon" />
      </div>
      <select class="" @change="switchLanguage">
        <option 
          v-for="locale in $i18n.locales" 
          :key="locale.code" 
          :value="locale.code"
        >
           {{ locale.code }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import navLogo from '../assets/svg/navLogo.svg';
import seachIcon from '../assets/svg/searchIcon.svg';
export default {
  name: 'TheHeader',
  data() {
    return {
      searchTask: '',
      navLogo,
      seachIcon,
    };
  },
  mounted(){
    console.log(window.$nuxt.$cookies)
  },
  methods: {
    switchLanguage(event) {
      this.$i18n.setLocale(event.target.value)
    }
    // localePathAbout(event) {
    //   if (event.target.value === 'en') {
    //     return this.$router.replace(this.switchLocalePath('en'));
    //   }

    //   if (event.target.value === 'fr') {
    //     return this.$router.replace(this.switchLocalePath('fr'));
    //   }

    //   if (event.target.value === 'es') {
    //     return this.$router.replace(this.switchLocalePath('es'));
    //   }
    // },
  },
};
</script>
<style lang="scss">
.header {
  /* width: 100%; */
  text-align: center;
  display: flex;
  padding: 15px 150px;
  background-color: white;
  justify-content: space-between;
}
.headerText {
  font-family: Roboto;
  font-size: 36px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  color: $primaryText;
  margin-left: 14px;
}
@keyframes example {
  0% {
    right: 0px;
  }
  25% {
    right: 100px;
  }
  50% {
    right: 200px;
  }
  100% {
    right: 500px;
  }
}
.searchIcon {
  position: relative;
  animation-name: example;
  animation-duration: 1s;
}
.inputField {
  @include inputField;
}
</style>
